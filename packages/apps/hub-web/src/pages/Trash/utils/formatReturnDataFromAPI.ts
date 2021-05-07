export const formatReturnDataFromAPI = (data: any): any => {
  return data.map((solucao: any) => {
    return {
      solution: solucao.nome,
      description: solucao.descricao,
      openOn:
        solucao.tipoRenderizacao === 'targetblank'
          ? 'Outra janela'
          : 'Mesma janela',
      category: 'Categoria',
      ...solucao
    }
  })
}
