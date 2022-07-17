import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() loginInfoForHeader : LoginInfo | undefined;
  @Output() currentPageEmitter : EventEmitter<number> = new EventEmitter();
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();

  currentPage : number;
  constructor() {
    this.currentPage = 1;
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

  logOutbuttonClicked(){
    this.logoutStatusEmitter.emit(true);
  }

}
