import { Component, Input, OnInit } from '@angular/core';
import { data } from 'jquery';
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

  constructor(private loginService : LoginService, private friendService : FriendsService, private storyService : StoryService) { }

  ngOnInit(): void {
    this.getAllLoginInfo();
    
  }

  getAllLoginInfo(){
    this.loginService.getAllLoginInfo().subscribe(data =>{
      this.loginInfo = data;
      this.getAllFriendInfo();
      
    })
  }
  getAllFriendInfo(){
    this.friendService.getAllFriendsInfo().subscribe(data =>{
      this.friendInfo = data;
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
    this.getAllStory();
  }

  // get all the story
  getAllStory(){
    this.storyService.getAllStoryInfo().subscribe(data =>{
      this.storyInfo = data;
      console.log(this.storyInfo);
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
    
  }

  demoStory : StoryInfo = {
    storyId: '',
    senderName: '',
    senderId: '',
    storyPicture: ''
  }
  
  fileToUpload : File | undefined ;
  // add new story 
  handlerFileInput(event : any){
    this.demoStory.senderId = this.loginInfoForStoryReel?.id as string;
    this.demoStory.senderName = this.loginInfoForStoryReel?.name as string;
    
    this.fileToUpload = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) =>{
      this.demoStory.storyPicture = event.target.result;
      this.storyService.addStory(this.demoStory).subscribe(result =>{
        this.getAllStory();
        console.log(result);
      })
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}
