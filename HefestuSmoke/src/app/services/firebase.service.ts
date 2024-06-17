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
  createUser(user: any) {
    const usersRef = ref(this.db, 'users');
    return push(usersRef, user);
  }

    // Método para verificar se um usuário já existe pelo email
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
  createProduto(produto: any) {
    const produtosRef = ref(this.db, 'produtos');
    return push(produtosRef, produto);
  }

  // Método para listar produtos
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
  atualizarUsuario(key: string, usuario: any) {
    const usuarioRef = ref(this.db, `users/${key}`);
    return update(usuarioRef, usuario);
  }

  // Método para excluir usuário
  excluirUsuario(key: string) {
    const usuarioRef = ref(this.db, `users/${key}`);
    return remove(usuarioRef);
  }

  // Método para atualizar produto
  atualizarProduto(key: string, produto: any) {
    const produtoRef = ref(this.db, `produtos/${key}`);
    return update(produtoRef, produto);
  }

  // Novo método para validar usuário pelo email e senha
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
