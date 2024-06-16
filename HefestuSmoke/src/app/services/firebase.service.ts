import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue, update } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { query, get, child, getDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: Database) { }

  createUser(user: any) {
    const usersRef = ref(this.db, 'users');
    return push(usersRef, user);
  }

  createProduto(produto: any) {
    const produtosRef = ref(this.db, 'produtos');
    return push(produtosRef, produto);
  }

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

  atualizarProduto(key: string, produto: any) {
    const produtoRef = ref(this.db, `produtos/${key}`);
    return update(produtoRef, produto);
  }

  // Adicione mais métodos conforme necessário
}
