import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginInfo } from './Models/login.model';
import { LoginService } from './Service/Login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // this.loginInfoPerson = JSON.parse(sessionStorage.getItem('userDetails')|| '{}') as LoginInfo;
    // if (this.loginInfoPerson.id) this.loginCode = 0;

    //console.log(this.cookieSerive.get('userId'));

    this.loginInfoPerson.id = this.cookieSerive.get('id');
    //this.loginInfoPerson.id = "";

    if (this.loginInfoPerson.id) {
      this.loginCode = 0;
      this.loginService.getSingleLoginInfo(this.loginInfoPerson.id).subscribe(result => {
        this.loginInfoPerson = result;
        sessionStorage.setItem('loginInfoPerson', JSON.stringify(this.loginInfoPerson));
      })
    }
    else {
      this.logOutStatusMain(true);
    }
  }

  constructor(private cookieSerive : CookieService , private loginService : LoginService){}

  // login check first 

  loginInfoPerson: LoginInfo = {
    emailAddress: '',
    password: '',
    id: '',
    name: '',
    profilePicture: ""
  };

  loginCode : number = 1;
  title = 'Social_Media';

  LoginUser(loginInfo: LoginInfo){
    this.loginCode = 0;
    this.loginInfoPerson = loginInfo;
    
    // this is for session storage
    //sessionStorage.setItem('userDetails',JSON.stringify(this.loginInfoPerson));
    //this.cookieSerive.set('userId',this.loginInfoPerson.id);

    // add User CookieService
    this.addUserCookieInfo(loginInfo);
  }

  addUserCookieInfo(loginInfo: LoginInfo){
    // expire the cookie after 1 day
    const dateNow = new Date();
    //dateNow.setHours(dateNow.getHours()+24);
    dateNow.setMinutes(dateNow.getMinutes()+1);
    this.cookieSerive.set('id',loginInfo.id,dateNow);
  }

  logOutStatusMain(demo : boolean){
    if (demo){
      this.loginCode = 1;
      sessionStorage.clear();
      this.cookieSerive.deleteAll();
    }
  }
}
