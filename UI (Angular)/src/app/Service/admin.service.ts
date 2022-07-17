import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminInfo } from '../Models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://localhost:7001/api/Admin';

  constructor(private http: HttpClient) { }

  getAllAdmin() : Observable<AdminInfo[]>{
    return this.http.get<AdminInfo[]>(this.baseUrl)
  }

  addAdmin(adminInfo : AdminInfo): Observable<AdminInfo> {
    return this.http.post<AdminInfo>(this.baseUrl, adminInfo);
  }
}
