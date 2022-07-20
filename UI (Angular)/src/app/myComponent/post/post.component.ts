import { Component, Input, OnInit } from '@angular/core';
import { post } from 'jquery';
import { FriendsInfo } from 'src/app/Models/friends.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { PostInfo } from 'src/app/Models/post.model';
import { FriendsService } from 'src/app/Service/friends.service';
import { PostService } from 'src/app/Service/post.service';
import { AdminService } from 'src/app/Service/admin.service';
import { AdminInfo } from 'src/app/Models/admin.model';

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
  // this is for checking that the session has post of this user or not...
  demoPostInfoForSession : PostInfo[] = [];
  // this willl store all the friend
  friendInfo : FriendsInfo[] = []; 
  // this will store all te friend of this user
  friendInfoOfUser : FriendsInfo[] = [];
  // this will store all the post of the current user friends
  postInfoOfUser : PostInfo[] = []; 

  // store all the admin 
  adminInfo : AdminInfo[] = [];

  //admin check variable
  is_admin : boolean = false;

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

  constructor(private postService: PostService , private friendsService : FriendsService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.demoPostInfoForSession = JSON.parse(sessionStorage.getItem('postInfo') || '{}') as PostInfo[];
    sessionStorage.setItem('loginInfoPerson', JSON.stringify(this.loginInfoForPost));

    if (!this.demoPostInfoForSession[0]){
      sessionStorage.setItem('loginInfoPerson', JSON.stringify(this.loginInfoForPost));
      this.getAllAdminInfo();
      this.getAllPost();
    }
    else {
      sessionStorage.setItem('loginInfoPerson', JSON.stringify(this.loginInfoForPost));
      this.postInfo = JSON.parse(sessionStorage.getItem('postInfo') || '{}') as PostInfo[]; 
      this.friendInfo = JSON.parse(sessionStorage.getItem('friendInfo') || '{}') as FriendsInfo[];
      this.postInfoOfUser = JSON.parse(sessionStorage.getItem('postInfoOfUser') || '{}') as PostInfo[];
      this.adminInfo = JSON.parse(sessionStorage.getItem('adminInfo') || '{}') as AdminInfo[];
      this.cheakThisIsAdmin();
    }
    this.imageUrlFor = this.loginInfoForPost?.profilePicture as string;
  }

  getAllAdminInfo(){
    this.adminService.getAllAdmin().subscribe(admin =>{
      this.adminInfo = admin;
      sessionStorage.setItem('adminInfo', JSON.stringify(this.adminInfo));
      this.cheakThisIsAdmin();
    });
  }

  cheakThisIsAdmin(){
    var flag = false;
    for (var i=0;i<this.adminInfo.length; i++){
      if (this.adminInfo[i].adminId == this.loginInfoForPost?.id){
        flag = true;
        break;
      }
    }

    if (flag){
      sessionStorage.setItem('is_admin','true');
      this.is_admin = true;
    }
  }

  getAllPost(){
    this.postService.getAllPost().subscribe(posts => {
      this.postInfo = posts;
      if (this.is_admin){
        this.postInfoOfUser = this.postInfo;
        sessionStorage.setItem('loginInfoPerson', JSON.stringify(this.loginInfoForPost));
        sessionStorage.setItem('postInfoOfUser', JSON.stringify(this.postInfoOfUser));
      }
      else {
        this.getAllFriends();
      }
      sessionStorage.setItem('postInfo', JSON.stringify(this.postInfo));
    });
  }
  getAllFriends(){
    this.friendsService.getAllFriendsInfo().subscribe(friends => {
      this.friendInfo = friends;
      sessionStorage.setItem('friendInfo', JSON.stringify(this.friendInfo));
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

    sessionStorage.setItem('postInfoOfUser', JSON.stringify(this.postInfoOfUser));

  }

  fileToUploadPost : File | undefined ;

  // for image
  handlerFileInputPost(event:any){
    this.fileToUploadPost = event.target.files[0];
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
      sessionStorage.clear();
      this.getAllAdminInfo();
      this.getAllPost();
    });
    this.postInfoDemo.postMessage = '';
    this.postInfoDemo.postImage = 'string';
  }
  likeUpdate(post:PostInfo){
    this.postService.likeUpdatePost(post).subscribe(response => {
      sessionStorage.clear();
      this.getAllAdminInfo();
      this.getAllPost();
    })
  }

  // delete post
  deleteThisPost(post:PostInfo){
    this.postService.removePost(post).subscribe(response => {
      sessionStorage.clear();
      this.getAllPost();
      this.getAllAdminInfo();
    });
  }


  // store all the post info in the sessionStorage
  storeAllTheUserPost(){
    sessionStorage.setItem('postInfo', JSON.stringify(this.postInfo));
    sessionStorage.setItem('postInfoOfUser', JSON.stringify(this.postInfoOfUser));
    sessionStorage.setItem('friendInfo', JSON.stringify(this.friendInfo));
    sessionStorage.setItem('adminInfo', JSON.stringify(this.adminInfo));
  }
}
