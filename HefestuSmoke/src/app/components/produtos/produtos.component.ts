import { Injectable } from '@angular/core';
import { Database, ref, push, onValue, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';

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
    return new Observable((observer) => {
      onValue(produtosRef, (snapshot) => {
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

  excluirProduto(key: string) {
    const produtoRef = ref(this.db, `produtos/${key}`);
    return remove(produtoRef);
  }
}
