import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
@Injectable()
  export class HttpService {
    
    constructor(private http: HttpClient) { }
    
    getPosts() {
      return this.http.get<any>('https://jsonplaceholder.typicode.com/todos/1');
    }
  }