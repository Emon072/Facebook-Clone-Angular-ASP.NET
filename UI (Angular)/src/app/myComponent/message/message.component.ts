import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { MessageInfo } from 'src/app/Models/message.model';
import { FriendsService } from 'src/app/Service/friends.service';
import { LoginService } from 'src/app/Service/Login.service';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() loginInfoForMessage : LoginInfo | undefined;

  // this will store all the friends list
  friendsInfo : FriendsInfo[] = [];

  // friends list of this users
  friendInfoOfUser : LoginInfo[] = [];

  // login info of user
  loginInfo : LoginInfo[] = []; 

  // store all the message
  messageInfo : MessageInfo[] = [];

  //store message of current friend;
  messageInfoOfCurrentFriend : MessageInfo[] = [];
  
  constructor(private loginService: LoginService, private friendsService: FriendsService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.getAllTheLoginInfo();
  }

  getAllTheLoginInfo(){
    this.loginService.getAllLoginInfo().subscribe (data => {
      this.loginInfo = data;
      this.getAllFriendInfo();
    })
  }

  getAllFriendInfo(){
    this.friendsService.getAllFriendsInfo().subscribe (data => {
      this.friendsInfo = data;
      this.getAllMessageInfo();
      this.getAllCurrentUserFriend();
    });
  }

  getAllCurrentUserFriend(){
    this.friendInfoOfUser = [];
    for (var i=0;i<this.friendsInfo.length;i++) {
      if (this.friendsInfo[i].friendId == this.loginInfoForMessage?.id){

        for (var j=0;j<this.loginInfo.length; j++){
          if (this.friendsInfo[i].friendPersonId == this.loginInfo[j].id){
            this.friendInfoOfUser.push(this.loginInfo[j]);
            break;
          }
        }
      }

    }
  }

  demoPerson : LoginInfo = {
    id: '',
    emailAddress: '',
    name: '',
    password: '',
    profilePicture: ''
  }

  demoMessageSorting : MessageInfo = {
    messageId: '',
    messageSenderId: '',
    messageReceiverId: '',
    message: '',
    sorting_number: 0
  }

  // change the current chat user
  changeCurrentChatUser(friend : LoginInfo){
    this.demoPerson = friend;
    this.messageInfoOfCurrentFriend = [];

    for (var i=0;i<this.messageInfo.length;i++){
      if (this.messageInfo[i].messageReceiverId == this.loginInfoForMessage?.id){
        if (this.messageInfo[i].messageSenderId == friend.id){
          this.messageInfoOfCurrentFriend.push(this.messageInfo[i]);
        }
      }
      else if (this.messageInfo[i].messageSenderId == this.loginInfoForMessage?.id){
        if (this.messageInfo[i].messageReceiverId == friend.id){
          this.messageInfoOfCurrentFriend.push(this.messageInfo[i]);
        }
      }
    }
    for (var i=0;i<this.messageInfoOfCurrentFriend.length;i++) {
      for (var j=i+1; j<this.messageInfoOfCurrentFriend.length;j++) {
        if (this.messageInfoOfCurrentFriend[j].sorting_number<this.messageInfoOfCurrentFriend[i].sorting_number){
          this.demoMessageSorting = this.messageInfoOfCurrentFriend[j];
          this.messageInfoOfCurrentFriend[j] = this.messageInfoOfCurrentFriend[i];
          this.messageInfoOfCurrentFriend[i] = this.demoMessageSorting; 
        }
      }
    }
    this.scrollToBottom();
  }

  

  getAllMessageInfo(){
    this.messageService.getAllMessageInfo().subscribe(message => {
      this.messageInfo = message;
    })
  }

  demoMessage : MessageInfo = {
    messageId: '',
    messageSenderId: '',
    messageReceiverId: '',
    message: '',
    sorting_number: 0
  }

  addMessage(){
    this.demoMessage.messageSenderId = this.loginInfoForMessage?.id as string;
    this.demoMessage.messageReceiverId = this.demoPerson.id;
    this.demoMessage.sorting_number = this.messageInfoOfCurrentFriend.length + 1;
    this.messageService.addMessage(this.demoMessage).subscribe(result => {
      this.getAllMessageInfo();
      this.messageInfoOfCurrentFriend.push(result);
      this.demoMessage.message = '';
    })
  }

  // try for auto scrolling
  

  @ViewChild('scrollMe')
  private myScrollCointer!: ElementRef;
  scrollToBottom():void{
    try{
      this.myScrollCointer.nativeElement.scrollTop = this.myScrollCointer?.nativeElement.scrollHeight;
    }catch(err){
    }
  }

}
