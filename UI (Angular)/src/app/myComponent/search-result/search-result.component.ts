import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Output() thisPersonProfileInfoSearch : EventEmitter<LoginInfo> = new EventEmitter();
  @Input() searchResultInfoForSearch : LoginInfo[] | undefined;

  loginInfo : LoginInfo[] = [];
  findFriendInfo : LoginInfo [] = [];
  is_admin : boolean = false;

  constructor() {
    
   }

  ngOnInit(): void {
    var string = sessionStorage.getItem('is_admin');
    if (string=='true') this.is_admin = true;
    else this.is_admin = false;

    var search = sessionStorage.getItem('search') as string;

  }

  thisPersonProfile(user : LoginInfo){
    sessionStorage.setItem('userCheck',"no");
    sessionStorage.setItem('currentProfile',JSON.stringify(user));
    this.thisPersonProfileInfoSearch.emit(user);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
