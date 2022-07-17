import { Component, Input, OnInit } from '@angular/core';
import { FriendRequestInfo } from 'src/app/Models/friendRequest.model';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { FriendsService } from 'src/app/Service/friends.service';
import { LoginService } from 'src/app/Service/Login.service';
import { RequestService } from 'src/app/Service/request.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  @Input() loginInfoForFriendList : LoginInfo | undefined;

  loginInfo : LoginInfo[] = [];
  friendInfo : FriendsInfo[] = [];
  friendRequestInfo : FriendRequestInfo[] = [];
  findFriendInfo : LoginInfo[] = [];
  friendListOfThisPerson : LoginInfo[] = []; // this will store all the friend list of this person
  friendRequestThisPerson : LoginInfo[] = []; // this will store the current person login information

  constructor(private loginService: LoginService , private friendsService: FriendsService , private requestService: RequestService) { }

  ngOnInit(): void {
    this.getAllLoginInfo();
  }

  getAllLoginInfo() {
    this.loginService.getAllLoginInfo().subscribe(response => {
      this.loginInfo = response;
      this.getAllFriendsInfo();
     });
  }

  getAllFriendsInfo() {
    this.friendsService.getAllFriendsInfo().subscribe(response => { 
      this.friendInfo = response;
      this.getAllRequestInfo();
    });
  }

  getAllRequestInfo() {
    this.requestService.getAllRequestInfo().subscribe(response => { 
      this.friendRequestInfo = response;
      this.getAllFindFriendInfo();
      this.getAllRequestOfThisPerson();
      this.getAllTheFriendsOfThisUser();
    });
  }

  getAllFindFriendInfo() {

    this.findFriendInfo = [];

    for (var i=0; i < this.loginInfo.length; i++){
      var flag = true;
      for (var j=0; j<this.friendInfo.length; j++) {
        if (this.friendInfo[j].friendPersonId==this.loginInfoForFriendList?.id){
          if (this.friendInfo[j].friendId == this.loginInfo[i].id) flag = false;
        }
      }

      for (var j=0; j<this.friendRequestInfo.length; j++) {
        if (this.friendRequestInfo[j].requestPersonId==this.loginInfoForFriendList?.id){
          if (this.friendRequestInfo[j].requestSenderId == this.loginInfo[i].id) flag = false;
        }
      }
      for (var j=0; j<this.friendRequestInfo.length; j++) {
        if (this.friendRequestInfo[j].requestSenderId==this.loginInfoForFriendList?.id){
          if (this.friendRequestInfo[j].requestPersonId == this.loginInfo[i].id) flag = false;
        }
      }
      if (this.loginInfoForFriendList?.id==this.loginInfo[i].id) flag = false;
      if (flag) {
        this.findFriendInfo.push(this.loginInfo[i]);
      }
      
    }
  }

  friendReqestDemo : FriendRequestInfo = {
    id: '',
    requestPersonId: '',
    requestSenderId: ''
  }

  // add friend 
  addFriendButton(friend : LoginInfo){
    this.friendReqestDemo.requestPersonId = friend.id;
    this.friendReqestDemo.requestSenderId = this.loginInfoForFriendList?.id as string;

    this.requestService.addRequest(this.friendReqestDemo).subscribe(response=>
      {
        this.getAllFriendsInfo();
      })
  }

  // get the request of this person
  getAllRequestOfThisPerson (){
    this.friendRequestThisPerson = [];
    for (var i=0;i<this.friendRequestInfo.length;i++){
    
      if (this.friendRequestInfo[i].requestPersonId == this.loginInfoForFriendList?.id){
        // now get this person loginInfo from the list
        for (var j=0;j<this.loginInfo.length;j++){
          if (this.loginInfo[j].id == this.friendRequestInfo[i].requestSenderId){
            this.friendRequestThisPerson.push(this.loginInfo[j]);
            break;
          }
        }
      }
    }
  }

  // remove request of this person 
  removeRequest(requestPerson : LoginInfo){
    for (var i=0;i<this.friendRequestInfo.length;i++){
      if (this.friendRequestInfo[i].requestPersonId == this.loginInfoForFriendList?.id){
        if (this.friendRequestInfo[i].requestSenderId==requestPerson.id){
          this.requestService.removeRequest(this.friendRequestInfo[i]).subscribe(response =>
            {
              this.getAllFriendsInfo();
            });
        }
      }
    }
  }

  friendDemo : FriendsInfo = {
    id: '',
    friendId: '',
    friendPersonId: ''
  }

  // accet request 
  acceptRequest(requestPerson : LoginInfo){
    this.friendDemo.friendPersonId = requestPerson.id;
    this.friendDemo.friendId = this.loginInfoForFriendList?.id as string;

    this.friendsService.addFriends(this.friendDemo).subscribe(response =>{
    })
    
    this.friendDemo.friendPersonId = this.loginInfoForFriendList?.id as string;
    this.friendDemo.friendId = requestPerson.id;

    this.friendsService.addFriends(this.friendDemo).subscribe(response =>{
    })
    this.removeRequest(requestPerson);
    
  }

  // get all the friends of the user
  getAllTheFriendsOfThisUser (){

    this.friendListOfThisPerson = [];

    for (var i=0;i<this.friendInfo.length;i++) {
      if (this.friendInfo[i].friendPersonId == this.loginInfoForFriendList?.id){

        for (var j=0;j<this.loginInfo.length; j++){
          if (this.loginInfo[j].id == this.friendInfo[i].friendId){
            this.friendListOfThisPerson.push(this.loginInfo[j]);
            break;
          }
        }
      }
    }
  }

  // remove friend
  removeFriend(friendPerson : LoginInfo){
    for (var i=0; i<this.friendInfo.length; i++){
      if (this.friendInfo[i].friendId == friendPerson.id && this.friendInfo[i].friendPersonId == this.loginInfoForFriendList?.id){
        this.friendsService.removeFriend(this.friendInfo[i]).subscribe (response=>{
          this.getAllFriendsInfo();
        })
      }
      if (this.friendInfo[i].friendId == this.loginInfoForFriendList?.id && this.friendInfo[i].friendPersonId == friendPerson.id){
        this.friendsService.removeFriend(this.friendInfo[i]).subscribe (response=>{
          this.getAllFriendsInfo();
        })
      }
    }
  }

}
