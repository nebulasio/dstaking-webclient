import { css } from 'styled-components'
const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 376
}

export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
    return acc
}, {})