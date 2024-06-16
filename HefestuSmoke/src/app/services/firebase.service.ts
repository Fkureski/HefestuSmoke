import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue, update, orderByChild, equalTo } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
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