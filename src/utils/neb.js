import nebulas from 'nebulas';

class Neb {
    constructor() {
        this.neb = new nebulas.Neb();
        this.neb.setRequest(new nebulas.HttpRequest(process.env.REACT_APP_NEBNET));
    }

    _toNas(wei) {
        return Number(nebulas.Utils.toBigNumber(wei).mul(nebulas.Utils.toBigNumber(10).pow(-18))).toFixed(4);
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

}




export { Neb }

