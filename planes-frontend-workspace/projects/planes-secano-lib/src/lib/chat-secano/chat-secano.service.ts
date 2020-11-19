import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatSecanoQueryResults } from './chat-secano.model';

@Injectable({
  providedIn: 'root'
})
export class ChatSecanoService {
  url: string;
  token: string;

  constructor(private http: HttpClient) {}

  getChatSecano(): Observable<{
    queryResults: ChatSecanoQueryResults;
  }> {
    return this.http.post<{
      queryResults: ChatSecanoQueryResults;
    }>(`${this.url}/queryMensajes`, {
      token: this.token
    });
  }
}
