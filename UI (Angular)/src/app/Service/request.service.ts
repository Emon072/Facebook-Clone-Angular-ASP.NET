import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequestInfo } from '../Models/friendRequest.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl = 'https://localhost:7001/api/Request';

  constructor(private http: HttpClient) { }

  getAllRequestInfo() : Observable<FriendRequestInfo[]>{
    return this.http.get<FriendRequestInfo[]>(this.baseUrl);
  }

  addRequest(friendRequestInfo : FriendRequestInfo) : Observable<FriendRequestInfo>{
    friendRequestInfo.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<FriendRequestInfo>(this.baseUrl, friendRequestInfo);
  }

  removeRequest(friendRequestInfo: FriendRequestInfo): Observable<FriendRequestInfo>{
    return this.http.delete<FriendRequestInfo>(this.baseUrl+ '/'+friendRequestInfo.id);
  }

}
