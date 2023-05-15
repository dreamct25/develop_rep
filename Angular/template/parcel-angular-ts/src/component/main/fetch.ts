import { HttpClient } from '@angular/common/http'
import { Injectable,Inject } from '@angular/core';
@Injectable()
  export class HttpService {
    
    constructor(@Inject(HttpClient) private http: HttpClient) { }
    
    getPosts() {
      return this.http.get<any>('https://jsonplaceholder.typicode.com/todos/1');
    }
  }