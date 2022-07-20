import { Component, Input, OnInit } from '@angular/core';
import { data, post } from 'jquery';
import { DemoStory } from 'src/app/Models/demoStory.model';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { StoryInfo } from 'src/app/Models/story.model';
import { FriendsService } from 'src/app/Service/friends.service';
import { LoginService } from 'src/app/Service/Login.service';
import { StoryService } from 'src/app/Service/story.service';

@Component({
  selector: 'app-story-reel',
  templateUrl: './story-reel.component.html',
  styleUrls: ['./story-reel.component.css']
})
export class StoryReelComponent implements OnInit {

  @Input() loginInfoForStoryReel : LoginInfo | undefined;

  // this will store all the login info 
  loginInfo : LoginInfo[] = [];

  // this will store all the friends info 
  friendInfo : FriendsInfo[] = [];

  // this will store all the login info of the user friends
  friendLoginInfo : LoginInfo[] = [];

  // store all the story reel
  storyInfo : StoryInfo[] = [];

  // store all the story of his friends
  StoryInfoFriend : StoryInfo[] = [];

  // this is for checking the story of this user
  demoLoginInfo : LoginInfo[] = [];

  constructor(private loginService : LoginService, private friendService : FriendsService, private storyService : StoryService) { }

  ngOnInit(): void {
    this.demoLoginInfo = JSON.parse(sessionStorage.getItem('loginInfo')|| '{}') as LoginInfo[];
    if (!this.demoLoginInfo[0]){
      this.getAllLoginInfo();
    }
    else {
      this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo')|| '{}') as LoginInfo[];
      this.friendInfo = JSON.parse(sessionStorage.getItem('friendInfo')|| '{}') as FriendsInfo[];
      this.friendLoginInfo = JSON.parse(sessionStorage.getItem('friendLoginInfo')|| '{}') as LoginInfo[];
      this.storyInfo = JSON.parse(sessionStorage.getItem('storyInfo')|| '{}') as StoryInfo[];
      this.StoryInfoFriend = JSON.parse(sessionStorage.getItem('storyInfoFriend') || '{}') as StoryInfo[];
    }
  }

  getAllLoginInfo(){
    this.loginService.getAllLoginInfo().subscribe(data =>{
      this.loginInfo = data;
      sessionStorage.setItem('loginInfo', JSON.stringify(this.loginInfo));
      this.getAllFriendInfo();
      
    })
  }
  getAllFriendInfo(){
    this.friendService.getAllFriendsInfo().subscribe(data =>{
      this.friendInfo = data;
      sessionStorage.setItem('friendInfo', JSON.stringify(this.friendInfo));
      this.getFriendUserInfoOfUser();
    });
  }

  getFriendUserInfoOfUser(){
    this.friendLoginInfo = [];
    for (var i=0;i<this.friendInfo.length;i++){
      if (this.friendInfo[i].friendPersonId == this.loginInfoForStoryReel?.id){
        for (var j=0;j<this.loginInfo.length; j++){
          if (this.loginInfo[j].id == this.friendInfo[i].friendId){
            this.friendLoginInfo.push(this.loginInfo[j]);
            break;
          }
        }
      }
    }
    this.friendLoginInfo.push(this.loginInfoForStoryReel as LoginInfo);
    sessionStorage.setItem('friendLoginInfo', JSON.stringify(this.friendLoginInfo));
    this.getAllStory();
  }

  // get all the story
  getAllStory(){
    this.storyService.getAllStoryInfo().subscribe(data =>{
      this.storyInfo = data;
      sessionStorage.setItem('storyInfo', JSON.stringify(this.storyInfo));
      this.getStoryOfTheStoryPerson();
    });
  }


  getStoryOfTheStoryPerson(){
    this.StoryInfoFriend = [];

    for (var i=0; i<this.storyInfo.length; i++) {

      for (var j=0;j<this.friendLoginInfo.length; j++){

        if (this.storyInfo[i].senderId == this.friendLoginInfo[j].id){
          //console.log(this.demoStoryDemo);
          this.StoryInfoFriend.push(this.storyInfo[i]);
        }
      }
    }
    sessionStorage.setItem('storyInfoFriend', JSON.stringify(this.StoryInfoFriend));
    
  }

  demoStory : StoryInfo = {
    storyId: '',
    senderName: '',
    senderId: '',
    storyPicture: ''
  }
  
  // add new story 
  handlerFileInput(event : any){
    this.demoStory.senderId = this.loginInfoForStoryReel?.id as string;
    this.demoStory.senderName = this.loginInfoForStoryReel?.name as string;
    
    var fileToUploadStory = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) =>{
      this.demoStory.storyPicture = event.target.result;
      this.storyService.addStory(this.demoStory).subscribe(result =>{
        this.getAllLoginInfo();
        alert('Story uploaded successfully');
      })
    }
    reader.readAsDataURL(fileToUploadStory);
  }

}
