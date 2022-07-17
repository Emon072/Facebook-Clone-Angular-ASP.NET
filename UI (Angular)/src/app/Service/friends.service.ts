import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FriendsInfo } from '../Models/friends.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  baseUrl = 'https://localhost:7001/api/Friends';

  constructor(private http: HttpClient) { }

  getAllFriendsInfo() : Observable<FriendsInfo[]>{
    return this.http.get<FriendsInfo[]>(this.baseUrl);
  }

  addFriends(friendInfo : FriendsInfo) : Observable<FriendsInfo>{
    friendInfo.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<FriendsInfo>(this.baseUrl, friendInfo);
  }

  removeFriend(friendInfo: FriendsInfo): Observable<FriendsInfo>{
    return this.http.delete<FriendsInfo>(this.baseUrl+ '/'+friendInfo.id);
  }
  
}
