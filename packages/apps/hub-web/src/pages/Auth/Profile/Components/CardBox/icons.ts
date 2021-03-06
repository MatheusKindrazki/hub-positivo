import {
  Briefcase,
  ClipboardText,
  BookBookmark,
  Users,
  Pencil,
  Archive,
  Pedestrian,
  Browsers
} from 'phosphor-react'

const types = {
  default: Archive,
  gestor: Briefcase,
  administrador: Briefcase,
  coordenador: ClipboardText,
  colaborador: Pedestrian,
  professor: Pencil,
  aluno: BookBookmark,
  editor: Browsers,
  família: Users
}

export default types
