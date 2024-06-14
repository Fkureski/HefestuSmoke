export interface UserModel {
  key?: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  senha: string;
  tipoUser: 'common';
}
