import { Component, Input, OnInit } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() loginInfoForSidebar : LoginInfo | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
