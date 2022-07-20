import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { LoginInfo } from 'src/app/Models/login.model';
import { RequestService } from 'src/app/Service/request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() loginInfoForHeader : LoginInfo | undefined;
  @Input() requestCount: number = 0;
  @Output() currentPageEmitter : EventEmitter<number> = new EventEmitter();
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();
  @Output() searchContentEmitter : EventEmitter<LoginInfo[]> = new EventEmitter();

  // this for calling a function multiple times
  numbers = interval(1000);

  currentPage : number;
  constructor(private requestService: RequestService) {
    this.currentPage = 1;
    this.requestService.getAllRequestInfo().subscribe((info) =>{
      for (var i=0; i<info.length;i++){
        if (info[i].requestPersonId == this.loginInfoForHeader?.id){
          this.requestCount++;
        }
      }
    });
    
  }

  ngOnInit(): void {
    
  }

  homePageActive(){
    this.currentPage = 1;
    this.currentPageEmitter.emit(1);
  }

  friendPageActive(){
    this.currentPage = 2;
    this.currentPageEmitter.emit(2);
  }

  messagePageActive(){
    this.currentPage = 3;
    this.currentPageEmitter.emit(3);
  }

  uesrProfile(){
    sessionStorage.setItem('userCheck',"yes");
    this.currentPage = 4;
    this.currentPageEmitter.emit(4);
  }

  logOutbuttonClicked(){
    this.logoutStatusEmitter.emit(true);
  }

  // this is for searching
  loginInfo : LoginInfo[] = [];
  findFriendInfo: LoginInfo [] = [];
  search : string = "";
  clickOnSearch(){
    this.search.trim();
    this.search = this.search.substring(0, this.search.length).toLowerCase();
    if (this.search.length==0) return;
    this.findFriendInfo = [];

    this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo') || '{}') as LoginInfo[];
    
    for (var i = 0; i < this.loginInfo.length; i++){
      var name = this.loginInfo[i].name;
      name = name.substring(0, name.length).toLowerCase();
      if (name.includes(this.search)){
        this.findFriendInfo.push(this.loginInfo[i]);
      }
    }

    this.searchContentEmitter.emit(this.findFriendInfo);
    this.currentPageEmitter.emit(5);
  }

}
