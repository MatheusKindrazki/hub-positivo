const transpileProfile = {
  ALUNO: {
    value: 'ALUNO',
    label: 'Aluno',
  },
  PAIS_E_RESPONSAVEIS: {
    value: 'PAIS_E_RESPONSAVEIS',
    label: 'Família',
  },
  PROFESSOR: {
    value: 'PROFESSOR',
    label: 'Professor',
  },
  COLABORADOR: {
    value: 'COLABORADOR',
    label: 'Colaborador',
  },
  COORDENADOR: {
    value: 'COORDENADOR',
    label: 'Coordenador',
  },
  ADMINISTRADOR: {
    value: 'ADMINISTRADOR',
    label: 'Administrador',
  },
  PERFIL_DE_SISTEMA: {
    value: 'PERFIL_DE_SISTEMA',
    label: 'Editor',
  },
};

export type Transpile =
  | 'ALUNO'
  | 'PAIS_E_RESPONSAVEIS'
  | 'PROFESSOR'
  | 'COORDENADOR'
  | 'ADMINISTRADOR'
  | 'PERFIL_DE_SISTEMA';

type Return = {
  value: string;
  label: string;
};

export default (profile: Transpile): Return => {
  return transpileProfile[profile];
};
