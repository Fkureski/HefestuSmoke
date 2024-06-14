import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) { }

  createUser(user: any) {
    return this.db.list('/users').push(user);
  }

  // Adicione mais métodos conforme necessário
}
