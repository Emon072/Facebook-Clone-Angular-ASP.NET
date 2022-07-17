import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageInfo } from '../Models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = 'https://localhost:7001/api/Message';

  constructor(private http: HttpClient) { }

  getAllMessageInfo() : Observable<MessageInfo[]>{
    return this.http.get<MessageInfo[]>(this.baseUrl);
  }
  addMessage(messageInfo: MessageInfo) : Observable<MessageInfo>{
    messageInfo.messageId = "00000000-0000-0000-0000-000000000000";
    return this.http.post<MessageInfo>(this.baseUrl, messageInfo);
  }
}
