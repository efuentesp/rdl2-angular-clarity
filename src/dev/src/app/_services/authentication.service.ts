import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Permission } from '../_models/permission';
import { User } from '../_models';

@Injectable()
export class AuthenticationService {
  // private username: string;
  // private firstname: string;
  // private lastname: string;
  // private display_name: string;
  public user: User;
  public permissions: Permission[] = [];

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return (
      this.http
        .post<any>(`${environment.apiUrl}/auth/v1/login`, { email: email, password: password }, { headers: headers })
        //return this.http.post<any>(`${environment.apiUrl}/auth`, { username: username, password: password })
        .pipe(
          map(response => {
            if (response) {
              localStorage.setItem('currentUser', JSON.stringify(response));
            }

            return response;
          })
        )
    );
  }

  getMenu(token) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token + '');
    return this.http.get<any>(`${environment.apiUrl}/user`, { headers: headers }).pipe(
      map(response => {
        // Get user info
        //this.authorities = response.json() && response.json().authorities;

        //   this.privileges = response.json() && response.json().privileges;

        // localStorage.setItem(
        //   'currentUser',
        //   JSON.stringify({ username: this.username, token: token, firstname: this.firstname, lastname: this.lastname })
        // );
        //console.log('Response User Service values:', " Token: "+token+" Username: "+this.username);
        return true;
      })
    );
  }

  getUser(token) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token + '');
    return this.http.get<any>(`${environment.apiUrl}/auth/v1/user`, { headers: headers }).pipe(
      map(response => {
        console.log('La respuesta es: ', response);
        console.log('La respuesta es: ', response.permissions);

        this.permissions = response.permissions;
        this.user = response.user;
        // this.username = response['username'];
        // this.display_name = response['display_name'];
        //this.lastname = response['lastname'];
        //   this.privileges = response.json() && response.json().privileges;

        localStorage.setItem(
          'currentUser',
          JSON.stringify({ user: this.user, token: token, permissions: this.permissions })
        );

        return true;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

// import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// import { environment } from '../../environments/environment';
// //import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import { User } from '../_models';
// import { HttpHeaders } from '@angular/common/http';

// @Injectable()
// export class AuthenticationService {
//     constructor(private http: Http) { }

//     private username: string;
//     private firstname: string;
//     private lastname: string;
//     private user:User;

//     login(username: string, password: string) {

//         let headers = new Headers;
//         headers.append('Content-Type','application/json');
//         let options = new RequestOptions({ headers: headers });
//         return this.http.post(`${environment.apiUrl}/auth`, { username: username, password: password },options)
//             .pipe(map(response => {
//                 console.log('Response: ', response);
//                 if (response) {
//                     let token = response.json() && response.json().token;
//                     localStorage.setItem('currentUser', JSON.stringify({token: token}));
//                 }

//                 return response;
//             }));
//     }

//     getMenu(token){
//         let httpHeaders = new HttpHeaders({
//             'Content-Type' : 'application/json'
//        });
//     //     let httpHeaders = new HttpHeaders()
//     //  .set('Content-Type', 'application/json')
//     //  .set('Authorization','Bearer ' + token+'');
// //      let options = {
// //         headers: httpHeaders
// //    };

//     //     var headers = new HttpHeaders();
//     //     headers.append('Content-Type','application/json');
//     //     headers.append('Authorization','Bearer ' + token+'');
//     //     //let options = new RequestOptions({ headers: headers });
//     //     let options = {
//     //         headers: headers
//     //    };
//         //let options = new RequestOptions({});

//         return this.http.get(`${environment.apiUrl}/user`, {headers: httpHeaders}).pipe(map(response => {

//         console.log('Response User Service', response);

//           // Get user info
//           //this.authorities = response.json() && response.json().authorities;
//           //this.username = response.json() && response.json().username;
//           //this.firstname = response.json() && response.json().firstname;
//           //this.lastname = response.json() && response.json().lastname;
//         //   this.privileges = response.json() && response.json().privileges;

//           localStorage.setItem('currentUser', JSON.stringify({ username: this.username, token: token, firstname: this.firstname, lastname:this.lastname}));
//           console.log('Response User Service values:', " Token: "+token+" Username: "+this.username);
//           return true;

//         }));
//       }

//     logout() {
//         // remove user from local storage to log user out
//         localStorage.removeItem('currentUser');
//     }
// }
