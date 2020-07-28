import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// inject things into service. services are not injectable by default so must add @Injectable decorator
@Injectable({
  providedIn: 'root' // module providing service
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  // make use of HttpClient module and service
  constructor(private http: HttpClient) { }

  // takes model from navbar
  login(model: any) {
    // replicate post used in postman here
    // use rxjs operator (map) in our request using pipe
    return this.http.post(this.baseUrl + 'login', model)

      .pipe(// take response, transform it and do something
        map((response: any) => {
          // returns body as an object containing token
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      );

  }

}