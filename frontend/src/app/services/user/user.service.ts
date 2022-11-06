import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AUTH_SERVER_ADDRESS } from 'src/app/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  private getOptions(){
    const token = localStorage.getItem('token');
    if(!token) {
      return {};
    }

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getUsers(token) {
    let myOptions = this.getOptions();
    console.log(myOptions)
    return this.httpClient.get(`${AUTH_SERVER_ADDRESS}/api/users`, myOptions);


    // return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions).pipe(
    //   tap(function (res) {
    //       console.log(res);
    //     })
    // );
  }

  existsUser(username: string) {
    return this.httpClient.get(`${AUTH_SERVER_ADDRESS}/api/users/user/${username}`);
  }
}
