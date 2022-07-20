import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminInfo } from 'src/app/Models/admin.model';
import { FriendRequestInfo } from 'src/app/Models/friendRequest.model';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { AdminService } from 'src/app/Service/admin.service';
import { FriendsService } from 'src/app/Service/friends.service';
import { LoginService } from 'src/app/Service/Login.service';
import { RequestService } from 'src/app/Service/request.service';
import { PostService } from 'src/app/Service/post.service';
import { StoryService } from 'src/app/Service/story.service';
import { PostInfo } from 'src/app/Models/post.model';
import { StoryInfo } from 'src/app/Models/story.model';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  @Input() loginInfoForFriendList : LoginInfo | undefined;
  @Output() requestCountNumber : EventEmitter<number> = new EventEmitter();
  @Output() thisPersonProfileInfo : EventEmitter<LoginInfo> = new EventEmitter();

  loginInfo : LoginInfo[] = [];
  friendInfo : FriendsInfo[] = [];
  friendRequestInfo : FriendRequestInfo[] = [];
  findFriendInfo : LoginInfo[] = [];
  friendListOfThisPerson : LoginInfo[] = []; // this will store all the friend list of this person
  friendRequestThisPerson : LoginInfo[] = []; // this will store the current person login information
  is_admin : boolean = false; // this is for checkin this is admin or not

  // store all the admin 
  adminInfo : AdminInfo[] = [];

  // store all the current request count
  requestCount : number = 0;

  constructor(private loginService: LoginService , private friendsService: FriendsService , private requestService: RequestService, private adminService: AdminService, private postService : PostService, private storyService: StoryService) { }

  ngOnInit(): void {
    this.getAllLoginInfo();
    this.getAllAdmin();
  }

  getAllAdmin(){
    this.adminService.getAllAdmin().subscribe(admin =>{
      this.adminInfo = admin;
      this.cheakThisIsAdmin();
    });
  }

  cheakThisIsAdmin(){
    var flag = false;
    for (var i=0;i<this.adminInfo.length; i++){
      if (this.adminInfo[i].adminId == this.loginInfoForFriendList?.id){
        flag = true;
        break;
      }
    }

    if (flag){
      this.is_admin = true;
    }
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
      this.getAllRequestOfThisPerson();
      this.getAllFindFriendInfo();
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
        sessionStorage.clear();
        this.getAllFriendsInfo();
      })
  }

  // get the request of this person
  getAllRequestOfThisPerson (){
    this.requestCount = 0;
    this.friendRequestThisPerson = [];
    for (var i=0;i<this.friendRequestInfo.length;i++){
    
      if (this.friendRequestInfo[i].requestPersonId == this.loginInfoForFriendList?.id){
        // now get this person loginInfo from the list
        this.requestCount++;
        for (var j=0;j<this.loginInfo.length;j++){
          if (this.loginInfo[j].id == this.friendRequestInfo[i].requestSenderId){
            this.friendRequestThisPerson.push(this.loginInfo[j]);
            break;
          }
        }
      }
    }
    this.requestCountNumber.emit(this.requestCount);
  }

  // remove request of this person 
  removeRequest(requestPerson : LoginInfo){
    for (var i=0;i<this.friendRequestInfo.length;i++){
      if (this.friendRequestInfo[i].requestPersonId == this.loginInfoForFriendList?.id){
        if (this.friendRequestInfo[i].requestSenderId==requestPerson.id){
          this.requestService.removeRequest(this.friendRequestInfo[i]).subscribe(response =>
            {
              this.requestCount--;
              sessionStorage.clear();
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
      sessionStorage.clear();
    })
    
    this.friendDemo.friendPersonId = this.loginInfoForFriendList?.id as string;
    this.friendDemo.friendId = requestPerson.id;

    this.friendsService.addFriends(this.friendDemo).subscribe(response =>{
      sessionStorage.clear();
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
    sessionStorage.setItem('friendListOfThisPerson', JSON.stringify(this.friendListOfThisPerson));
  }

  // remove friend
  removeFriend(friendPerson : LoginInfo){
    for (var i=0; i<this.friendInfo.length; i++){
      if (this.friendInfo[i].friendId == friendPerson.id && this.friendInfo[i].friendPersonId == this.loginInfoForFriendList?.id){
        this.friendsService.removeFriend(this.friendInfo[i]).subscribe (response=>{
          sessionStorage.clear();
          this.getAllFriendsInfo();
        })
      }
      if (this.friendInfo[i].friendId == this.loginInfoForFriendList?.id && this.friendInfo[i].friendPersonId == friendPerson.id){
        this.friendsService.removeFriend(this.friendInfo[i]).subscribe (response=>{
          sessionStorage.clear();
          this.getAllFriendsInfo();
        })
      }
    }
  }

  // remove the user 
  removeThisUser(user:LoginInfo){
    this.removeAllThePostOfThisUser(user);
    this.removeAllTheStoryOfThisUser(user);

    this.loginService.deleteUser(user.id).subscribe(response => {
      sessionStorage.clear();
      this.getAllLoginInfo();
    });
  }

  // store all the post
  postInfo : PostInfo[] = [];
  removeAllThePostOfThisUser(user:LoginInfo){
    this.postService.getAllPost().subscribe(data =>{
      this.postInfo = data;

      for (var i=0; i<this.postInfo.length; i++){
        if (this.postInfo[i].postPersionId == user.id){
          sessionStorage.clear();
          this.postService.removePost(this.postInfo[i]);
        }
      }
    });
  }

  // store all the story
  storyInfo : StoryInfo[] = [];
  removeAllTheStoryOfThisUser(user : LoginInfo){
    this.storyService.getAllStoryInfo().subscribe(data => {
      this.storyInfo = data;
      for (var i=0; i<this.storyInfo.length; i++){
        if (this.storyInfo[i].senderId == user.id){
          this.storyService.deleteStory(this.storyInfo[i]).subscribe (response=>{
            sessionStorage.clear();
            console.log('yes story has been deleted');
          });
        }
      }
    });
  }

  // this person profile show 
  thisPersonProfile(user : LoginInfo){
    
    sessionStorage.setItem('userCheck',"no");
    sessionStorage.setItem('currentProfile',JSON.stringify(user));
    this.thisPersonProfileInfo.emit(user);
  }

}
