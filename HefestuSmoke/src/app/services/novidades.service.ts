import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


interface NovidadesResponse {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class NovidadesService {
  private endpointUrl = 'https://faed47pcwb7biktidlecuafuty0aegep.lambda-url.us-east-1.on.aws/';
  constructor(private http: HttpClient) { }

  sendData(name: string, email: string): Observable<NovidadesResponse>{
    const data = {name, email};

    return this.http.post<NovidadesResponse>(this.endpointUrl, data);
  }
}
