const GSC_KEY = 'gscw'

function closeModalGsc(): void {
  const gscItens = localStorage.getItem(GSC_KEY)

  if (!gscItens) return

  try {
    const getModals = JSON.parse(gscItens) || {}

    Object.keys(getModals).forEach(key => {
      if (window?.gsc) {
        window?.gsc('close', key)
      }
    })
  } catch (error) {
    console.error('Erro ao fechar modais do GSC')
  }
}

export default closeModalGsc
