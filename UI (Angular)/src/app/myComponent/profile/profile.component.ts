import { Component, ElementRef, OnInit } from '@angular/core';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { PostInfo } from 'src/app/Models/post.model';
import { RequestService } from 'src/app/Service/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private requestService: RequestService, private elementRef: ElementRef) {
    
  }

  loginInfoPerson : LoginInfo | undefined ;
  postInfo : PostInfo[] = [];
  postInfoOfUser : PostInfo[] = [];
  message : string = "What's on your mind?";
  friendListOfThisPerson : LoginInfo[] = [];

  demoCode : number = 0;
  button : number = 1;

  ngOnInit(): void {

    var string = sessionStorage.getItem('userCheck');
    if (string == "no"){
      this.demoCode = 1;
      this.loginInfoPerson = JSON.parse(sessionStorage.getItem('currentProfile') || '{}') as LoginInfo;
    }else 
      this.loginInfoPerson = JSON.parse(sessionStorage.getItem('loginInfoPerson') || '{}') as LoginInfo;
    this.postInfo = JSON.parse(sessionStorage.getItem('postInfo') || '{}') as PostInfo[];

    for (var i=0;i<this.postInfo.length;i++) {
      if (this.postInfo[i].postPersionId== this.loginInfoPerson.id){
        this.postInfoOfUser.push(this.postInfo[i]);
      }
    }
    this.friendListOfThisPerson = JSON.parse(sessionStorage.getItem('friendListOfThisPerson') || '{}') as LoginInfo[];
    
    
    
  }

  ngOndestroy() {
    console.log('i am called');
    this.elementRef.nativeElement.remove();
  }

  showFriendList(){
    this.button = 2;
  }

  showTimeline(){
    this.button = 1;
  }


}
