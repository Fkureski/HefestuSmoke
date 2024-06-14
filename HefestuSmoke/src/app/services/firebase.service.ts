import { Injectable } from '@angular/core';
import { Database, ref, set, push } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: Database) { }

  createUser(user: any) {
    const usersRef = ref(this.db, 'users');
    return push(usersRef, user);
  }

  // Adicione mais métodos conforme necessário
}
