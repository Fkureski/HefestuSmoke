import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Database, ref, push, onValue, update, remove } from '@angular/fire/database';

interface NovidadesResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NovidadesService {
  private endpointUrl = '';
  
  constructor(private http: HttpClient, private db: Database) { }

  sendData(name: string, email: string): Observable<NovidadesResponse> {
    const data = { name, email };

    return this.http.post<NovidadesResponse>(this.endpointUrl, data);
  }

  sendNovidade(novidade: any): Observable<void> {
    const novidadesRef = ref(this.db, 'novidades');
    return new Observable((observer) => {
      push(novidadesRef, novidade).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  updateNovidade(key: string, novidade: any): Observable<void> {
    const novidadeRef = ref(this.db, `novidades/${key}`);
    return new Observable((observer) => {
      update(novidadeRef, novidade).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  deleteNovidade(key: string): Observable<void> {
    const novidadeRef = ref(this.db, `novidades/${key}`);
    return new Observable((observer) => {
      remove(novidadeRef).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}
