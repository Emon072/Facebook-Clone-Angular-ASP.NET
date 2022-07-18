import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminInfo } from 'src/app/Models/admin.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() loginInfoForSidebar : LoginInfo | undefined;
  @Output() mainBodyOpacity : EventEmitter<boolean> = new EventEmitter();
  AdminCode : number = 0;
  adminPassword : string = "";

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  addAdmin(){
    this.AdminCode = 1;
    this.mainBodyOpacity.emit(true);
  }

  make_cancel(){
    this.AdminCode = 0;
    this.mainBodyOpacity.emit(false);
  }

  demoAdmin : AdminInfo = {
    adminId: ''
  }

  addAdminCheck(){
    if (this.adminPassword=="admin"){
      this.make_cancel();
      this.demoAdmin.adminId = this.loginInfoForSidebar?.id as string;
      this.adminService.addAdmin(this.demoAdmin).subscribe(result =>{
        console.log(result);
      });
    }
    else {
      alert("Please Enter The Right Admin Password")
      this.adminPassword="";
    }
  }
}
