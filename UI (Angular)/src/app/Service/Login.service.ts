import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo } from '../Models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'https://localhost:7001/api/Login';
  
  constructor(private http: HttpClient) { }

  getAllLoginInfo() : Observable<LoginInfo[]>{
    return this.http.get<LoginInfo[]>(this.baseUrl);
  }

  addUser(loginInfo: LoginInfo) : Observable<LoginInfo>{
    loginInfo.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<LoginInfo>(this.baseUrl, loginInfo);
  }

  getSingleLoginInfo(id: string):Observable<LoginInfo>{
    return this.http.get<LoginInfo>(this.baseUrl +'/'+ id);
  }

  deleteUser (id:string) : Observable<LoginInfo>{
    return this.http.delete<LoginInfo>(this.baseUrl +'/'+ id);
  }

}
