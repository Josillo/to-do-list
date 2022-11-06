import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from  'rxjs/operators';
import { AuthResponse } from './auth-response';
import { User } from './user';
import { Storage } from '@ionic/storage';
import { AUTH_SERVER_ADDRESS } from './auth-service.endpoint';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  httpClient:  HttpClient, private  storage:  Storage, private router: Router) { }

  private getOptions(user: User){
    let base64UserAndPassword = window.btoa(user.username + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization' : basicAccess,
        'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  private getUnauthorizedOptions(){

    let options = {
      headers: {
        'Content-Type' : 'application/json',
      }
    };

    return options;
  }


  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${AUTH_SERVER_ADDRESS}/api/users/`, user, this.getUnauthorizedOptions()).pipe(
      tap((res:  AuthResponse ) => {

        if (res.user) {
          // await this.storage.set("token", res.access_token);
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['task-list']);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${AUTH_SERVER_ADDRESS}/api/users/signin`, null, this.getOptions(user)).pipe(
      tap( (res: AuthResponse) => {

        if (res.user) {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['task-list']);
          // await this.storage.set("token", res.access_token);
          // await this.storage.set("idUser", res.user.id);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("token");
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get("token");
    if (token){ //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  }
}
