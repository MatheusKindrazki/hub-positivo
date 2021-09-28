function instanceNR(): void {
  if (process.env.REACT_APP_NEW_RELIC_INSTANCE === 'production') {
    require('../scripts/prodInstance')
  } else {
    require('../scripts/devInstance')
  }
}

export default instanceNR
