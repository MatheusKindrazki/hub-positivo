import { Product } from '../products/types'

interface UpdateSolutionData extends Product {
  idCategoria: string
}

interface SolutionUpdateResponse {
  sucesso: boolean
  mensagem: string
}
export type { UpdateSolutionData, SolutionUpdateResponse }
