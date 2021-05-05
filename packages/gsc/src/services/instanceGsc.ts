import { generate } from 'randomstring'

function instanceGsc(): void {
  const script = document.createElement('script')

  script.async = true

  script.type = 'text/javascript'

  script.src = `${process.env.REACT_APP_GSC}?hash=${generate(10)}`

  document.head.appendChild(script)

  script.addEventListener('load', () => {
    require('../scripts/gsc')
  })
}

export default instanceGsc
