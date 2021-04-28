import mixpanel from 'mixpanel-browser'

type MixAliasProps = {
  guid: string
}

export default (data: MixAliasProps): void => {
  try {
    mixpanel.alias(data.guid)
  } catch (e) {
    console.error('Erro ao gerar alias para usuário anônimo')
  }
}
