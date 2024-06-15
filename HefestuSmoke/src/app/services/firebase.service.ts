import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { query, get, child, getDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth: any;
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
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  // Adicione mais métodos conforme necessário
}
