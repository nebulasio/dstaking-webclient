import nebulas from 'nebulas';

class Neb {
    constructor() {
        this.neb = new nebulas.Neb();
        this.neb.setRequest(new nebulas.HttpRequest(process.env.REACT_APP_NEBNET));
    }

    _toNas(wei) {
        return Number(nebulas.Utils.toBigNumber(wei).mul(nebulas.Utils.toBigNumber(10).pow(-18)));
    }

    // call contract common function
    _callContract(to_contract, func, address) {
        return new Promise((resolve, reject) => {
            this.neb.api.call({
                from: address,
                to: to_contract,
                value: 0,
                nonce: 0,
                gasPrice: 1000000,
                gasLimit: 200000,
                contract: {
                    "source": "",
                    "sourceType": "js",
                    "function": func,
                    "args": "[\"" + address + "\"]",
                    "binary": "",
                    "type": "call"
                }
            }).then(r => {
                if (r.execute_err) {
                    reject(r.execute_err)
                } else {
                    resolve(JSON.parse(r.result))
                }
            }).catch(e => {
                reject(e);
            });
        })
    }

    getAccountState(address) {
        return new Promise((resolve, reject) => {
            this.neb.api.getAccountState(address).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        })
    }

    getCurrentStakings(address) {
        const to_contract = process.env.REACT_APP_NAX_DATA_CONTRACT;
        return this._callContract(to_contract, "getCurrentStakings", address);
    }

    async getStakingStatus(address) {
        try {
            const [accountState, currentStaking] = await Promise.all([
                this.getAccountState(address),
                this.getCurrentStakings(address)
            ]);

            console.log(currentStaking);

            // caculate nas staking sum
            let stakingSum = Number(0);
            currentStaking.map(item => {
                stakingSum += this._toNas(item.v);
            });

            return {
                nonce: accountState.nonce,
                nasBalance: this._toNas(accountState.balance).toLocaleString(),
                nasStaking: Number(stakingSum).toLocaleString(),
                currentStaking,
            };

        } catch (err) {
            throw err;
        }
    }

    // account
    static isValidAddress(address) {
        return nebulas.Account.isValidAddress(address);
    }

    static account(keystore, pwd) {
        try {
            const account = nebulas.Account.fromAddress(keystore.address);
            let res = account.fromKey(keystore, pwd);
            // console.log(res);
            return account;
        } catch (err) {
            throw err;
        }
    }

    static _generateRawTransaction(account, to_contract, value, nonce, gasPrice, gasLimit, contract) {
        const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
        const tx = new nebulas.Transaction(chainId, account, to_contract, value, parseInt(nonce), gasPrice, gasLimit, contract);
        tx.signTransaction();
        return tx.toProtoString();
    }

    static generateStakingRawTransaction(account, stakingSelect, stakingAmount, nonce) {
        // staking contract address
        const to_contract = process.env.REACT_APP_STAKING_PROXY_CONTRACT;

        const actions = ["cancel", "staking"];


        let value;
        if (stakingSelect === "1") { // staking
            value = nebulas.Unit.nasToBasic(stakingAmount);
        } else { // cancel staking
            value = "0"
        }

        // contract param
        const contract = {
            "source": "",
            "sourceType": "js",
            "function": actions[parseInt(stakingSelect)],
            "args": `[${value}]`,
            "binary": "",
            "type": "call"
        };

        // set default gas price, limit
        const gasPrice = 2 * Math.pow(10, 10);
        const gasLimit = 200000;

        return Neb._generateRawTransaction(account, to_contract, "0", nonce, gasPrice, gasLimit, contract);

    }

    sendRawTransaction(rawTransaction) {
        return new Promise((resolve, reject) => {
            this.neb.api.sendRawTransaction(rawTransaction).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err);
            });
        })

    }

    static generateQrcode = (stakingSelect, stakingAmount, stakingFrom = "nas-nano") => {

        const staking_proxy_contract = process.env.REACT_APP_STAKING_PROXY_CONTRACT;

        const actions = ["cancel", "staking"];
        let value;
        if (stakingSelect === "1") { // staking
            value = nebulas.Unit.nasToBasic(stakingAmount);
        } else { // cancel staking
            value = ""
        }

        // default transfer 0 nas, staking all remain nas
        const qrcodeData = {
            pageParams: {
                pay: {
                    currency: "NAS",
                    value: 0,
                    to: staking_proxy_contract,
                }
            },
            des: "confirmTransfer",
            category: "jump"
        };

        if (stakingFrom === "nas-nano") {
            qrcodeData.pageParams.pay.payload = {
                "function": actions[parseInt(stakingSelect)],
                "args": `[${value}]`,
                type: "call"
            };
        }


        const qrcodeText = JSON.stringify(qrcodeData);

        console.log(qrcodeText);
        return qrcodeText;
    }

}




export { Neb }

