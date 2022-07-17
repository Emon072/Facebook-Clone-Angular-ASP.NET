import { Component, Input, OnInit } from '@angular/core';
import { post } from 'jquery';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { PostInfo } from 'src/app/Models/post.model';
import { FriendsService } from 'src/app/Service/friends.service';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()loginInfoForPost:LoginInfo | undefined;

  imageUrlFor : string = '';

  // this will store all the post of the user
  postInfo : PostInfo[] = [];
  // this willl store all the friend
  friendInfo : FriendsInfo[] = []; 
  // this will store all te friend of this user
  friendInfoOfUser : FriendsInfo[] = [];
  // this will store all the post of the current user friends
  postInfoOfUser : PostInfo[] = []; 

  postInfoDemo : PostInfo = {
    id: '',
    postPersionId: '',
    postPersionProfilePicture:'',
    name: '',
    createdDate: new Date(),
    postMessage: '',
    postImage: 'string',
    like: 0
  }

  constructor(private postService: PostService , private friendsService : FriendsService) { }

  ngOnInit(): void {
    this.getAllPost();
    this.imageUrlFor = this.loginInfoForPost?.profilePicture as string;
  }

  getAllPost(){
    this.postService.getAllPost().subscribe(posts => {
      this.postInfo = posts;
      this.getAllFriends();
    });
  }
  getAllFriends(){
    this.friendsService.getAllFriendsInfo().subscribe(friends => {
      this.friendInfo = friends;
      this.getFriendOfThisCurrentUser();
    });
  }

  getFriendOfThisCurrentUser(){
    this.postInfoOfUser = [];
    for (var i=0;i<this.friendInfo.length;i++) {
      if (this.friendInfo[i].friendId == this.loginInfoForPost?.id){

        for (var j=0;j<this.postInfo.length;j++) {
          if (this.postInfo[j].postPersionId == this.friendInfo[i].friendPersonId){
            this.postInfoOfUser.push(this.postInfo[j]);
          }
        }
      }
    }

    for (var i=0;i<this.postInfo.length;i++){
      if (this.postInfo[i].postPersionId==this.loginInfoForPost?.id){
        this.postInfoOfUser.push(this.postInfo[i]);
      }
    }

  }

  fileToUpload : File | undefined ;

  // for image
  handlerFileInput(event:any){
    this.fileToUpload = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) =>{
      this.postInfoDemo.postImage = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  createPost(){
    var name = this.loginInfoForPost?.name;
    var postPersionId = this.loginInfoForPost?.id;
    var postPersionProfilePicture = this.loginInfoForPost?.profilePicture;

    this.postInfoDemo.name = name as string;
    this.postInfoDemo.postPersionId= postPersionId as string;
    this.postInfoDemo.postPersionProfilePicture = postPersionProfilePicture as string;

    this.postInfoDemo.like = 0;
    this.postInfoDemo.createdDate = new Date();
    
    this.postService.addPost(this.postInfoDemo).subscribe(response => { 
     this.getAllPost();
    });
    this.getAllPost();
    this.postInfoDemo.postMessage = '';
    this.postInfoDemo.postImage = 'string';
  }
  likeUpdate(post:PostInfo){
    this.postService.likeUpdatePost(post).subscribe(response => {
      console.log(response);
    })
  }
}
