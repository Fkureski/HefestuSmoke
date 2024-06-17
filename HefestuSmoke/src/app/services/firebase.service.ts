import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue, update, orderByChild, equalTo, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { query, get, child, getDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: Database) { }

  // Método para criar usuário
  // Recebe um objeto usuário como parâmetro
  // Usa a função push para adicionar o usuário à localização 'users' no banco de dados
  createUser(user: any) {
    const usersRef = ref(this.db, 'users');
    return push(usersRef, user);
  }

  // Método para verificar se um usuário já existe pelo email
  // Recebe uma string de email como parâmetro
  // Retorna um Observable booleano que indica se o email existe ou não
  verificarEmailExistente(email: string): Observable<boolean> {
    const usersRef = ref(this.db, 'users');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));

    return new Observable((observer) => {
      onValue(emailQuery, (snapshot) => {
        observer.next(snapshot.exists());
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Método para verificar se um usuário já existe pelo CPF
  // Recebe uma string de CPF como parâmetro
  // Retorna um Observable booleano que indica se o CPF existe ou não
  verificarCpfExistente(cpf: string): Observable<boolean> {
    const usersRef = ref(this.db, 'users');
    const cpfQuery = query(usersRef, orderByChild('cpf'), equalTo(cpf));

    return new Observable((observer) => {
      onValue(cpfQuery, (snapshot) => {
        observer.next(snapshot.exists());
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Método para verificar se um usuário já existe pelo telefone
  // Recebe uma string de telefone como parâmetro
  // Retorna um Observable booleano que indica se o telefone existe ou não
  verificarTelefoneExistente(telefone: string): Observable<boolean> {
    const usersRef = ref(this.db, 'users');
    const telefoneQuery = query(usersRef, orderByChild('telefone'), equalTo(telefone));

    return new Observable((observer) => {
      onValue(telefoneQuery, (snapshot) => {
        observer.next(snapshot.exists());
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Método para criar produto
  // Recebe um objeto produto como parâmetro
  // Usa a função push para adicionar o produto à localização 'produtos' no banco de dados
  createProduto(produto: any) {
    const produtosRef = ref(this.db, 'produtos');
    return push(produtosRef, produto);
  }

  // Método para listar produtos
  // Retorna um Observable de array de produtos
  listar(): Observable<any[]> {
    const produtosRef = ref(this.db, 'produtos');
    const produtosQuery = query(produtosRef);

    return new Observable((observer) => {
      onValue(produtosQuery, (snapshot) => {
        const produtos: any[] = [];
        snapshot.forEach((childSnapshot) => {
          produtos.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        observer.next(produtos);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Método para listar usuários
 // Retorna um Observable de array de usuários
  listarUsuarios(): Observable<any[]> {
    const usersRef = ref(this.db, 'users');
    return new Observable((observer) => {
      onValue(usersRef, (snapshot) => {
        const usuarios: any[] = [];
        snapshot.forEach((childSnapshot) => {
          usuarios.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        observer.next(usuarios);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  // Método para atualizar usuário
  // Recebe uma chave (key) como parâmetro que identifica o usuário a ser atualizado
  // Recebe um objeto usuário como parâmetro com as informações atualizadas
  // Usa a função update para atualizar o usuário na localização específica no banco de dados
  atualizarUsuario(key: string, usuario: any) {
    const usuarioRef = ref(this.db, `users/${key}`);
    return update(usuarioRef, usuario);
  }

  // Método para excluir usuário
  // Recebe uma chave (key) como parâmetro que identifica o usuário a ser excluído
  // Usa a função remove para excluir o usuário na localização específica no banco de dados
  excluirUsuario(key: string) {
    const usuarioRef = ref(this.db, `users/${key}`);
    return remove(usuarioRef);
  }

  // Método para atualizar produto
  atualizarProduto(key: string, produto: any) {
    const produtoRef = ref(this.db, `produtos/${key}`);
    return update(produtoRef, produto);
  }

  // Método para validar usuário por email e senha
  // Recebe uma string de email e uma string de senha como parâmetros
  // Retorna um Observable que emite o objeto de usuário validado se o email e senha coincidirem, ou nulo caso contrário
  validarUsuario(email: string, senha: string): Observable<any> {
    const usersRef = ref(this.db, 'users');
    const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));

    return new Observable((observer) => {
      onValue(emailQuery, (snapshot) => {
        let usuarioValido = null;
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.senha === senha) {
            usuarioValido = {
              key: childSnapshot.key,
              ...childSnapshot.val()
            };
          }
        });
        observer.next(usuarioValido);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }
  
}
