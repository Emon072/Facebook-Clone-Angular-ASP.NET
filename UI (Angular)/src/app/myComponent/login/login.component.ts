import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';
import { LoginService } from 'src/app/Service/Login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginInfo will store all the users information
  loginInfo : LoginInfo[] = [];
  // this variable is for Email Address
  email : any;
  password: any;

  @Output() loginSuccess : EventEmitter<LoginInfo>= new EventEmitter();

  constructor( private loginService: LoginService) { }

  ngOnInit(): void {
    this.getAllLoginInfo();
  }

  getAllLoginInfo() {
    this.loginService.getAllLoginInfo().subscribe(response => {
      this.loginInfo = response; });
  }

  loginButtonMain(){

    var flag = 1;
    var index = -1;

    for (var i=0; i < this.loginInfo.length; i++) {
      if (this.loginInfo[i].emailAddress == this.email && this.loginInfo[i].password == this.password) {
        flag = 0;
        index = i;
        break;
      }
    }
    if (flag){
      alert("Please enter your email address and password correctly!");
    }
    else {
      this.loginSuccess.emit(this.loginInfo[index]);
    }

    this.email='';
    this.password='';
  }

  // for registertion 
  registerCheck : number = 1;

  registerButton(){
    this.registerCheck = 0;
  }
  loginButton(){
    this.registerCheck = 1;
  }

  // for register button click
  loginInfoPerson : LoginInfo = {
    id : "",
    emailAddress : "",
    name : "",
    password : "",
    profilePicture : "../../../assets/images/Avater_profile_picture.png"
  }
  registerButtonMain(){

    var flag = 0;

    if (this.loginInfoPerson.emailAddress == ""){
      alert('Please enter your email address');
      return;
    }
    else if (this.loginInfoPerson.name == ""){
      alert('Please enter your name');
      return;
    }
    else if (this.loginInfoPerson.password == "" || this.loginInfoPerson.password.length <8){
      alert('Please enter minimum 8 length password');
      return;
    }

    for (var i=0;i<this.loginInfoPerson.emailAddress.length;i++) {
      if (this.loginInfoPerson.emailAddress[i] == '@'){
        var email = "";
        for (var j=i+1;j<this.loginInfoPerson.emailAddress.length;j++) {
          email+= this.loginInfoPerson.emailAddress[j];
        }
        if (email == "gmail.com"){}
        else {
          alert("Please enter a valid email address");
          return;
        }
        break;
      }
    }
    
    for (var i  = 0; i < this.loginInfo.length; i++) {
      if (this.loginInfo[i].emailAddress === this.loginInfoPerson.emailAddress){
        flag = 1;
      }
    }
    if (flag){
      alert("This Email Address is already in use");
    }
    else {
      this.loginService.addUser(this.loginInfoPerson).subscribe(response => {
        this.loginSuccess.emit(response);
      });
    }
  }

  fileToUpload : File | undefined ;

  handlerFileInput(event: any){
    this.fileToUpload = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) =>{
      this.loginInfoPerson.profilePicture = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}

