import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() loginInfoForHome: LoginInfo | undefined;
  @Output() logoutStatusEmitter : EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  currentPage: number = 1;

  ngOnInit(): void {
    // this is initilization function 
  }

  currentPageChange(demo : number){
    this.currentPage = demo;
  }

  logoutStatusHomePage(demo : boolean){
    this.logoutStatusEmitter.emit(demo);
  }

}
