import { Component, Input, OnInit } from '@angular/core';
import { AdminInfo } from 'src/app/Models/admin.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-main-body-part',
  templateUrl: './main-body-part.component.html',
  styleUrls: ['./main-body-part.component.css']
})
export class MainBodyPartComponent implements OnInit {

  @Input() loginInfoForMainBody: LoginInfo | undefined

  adminInfo : AdminInfo[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllAdminInfo();
  }

  getAllAdminInfo(){
    this.adminService.getAllAdmin().subscribe(response => {
      this.adminInfo = response;
    });
  }

  adminPerson : AdminInfo = {
    adminId: '3fa85f64-5717-4562-b3fc-2c963f66af82'
  }

  // add new admin
  addNewAdmin(){
    this.adminService.addAdmin(this.adminPerson).subscribe( result => {
      this.getAllAdminInfo();
    });
  }

  opacity_controller : number = 0;
  changeManinBodyOpacity(event: boolean){
    if (event){
      this.opacity_controller = 1;
    }
    else {
      this.opacity_controller = 0;
    }
  }

}
