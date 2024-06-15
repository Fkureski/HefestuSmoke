import { Injectable } from '@angular/core';
import { Database, ref, push, onValue, query } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth: any
  constructor(private db: Database, private firestore: AngularFirestore) { }

  getProdutos(): Observable<any[]> {
    return this.firestore.collection('produtos').valueChanges({ idField: 'key' });
  }

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

 
}
