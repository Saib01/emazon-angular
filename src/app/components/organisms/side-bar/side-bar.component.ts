import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@models/user-info.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{
  closeSideBar:boolean = true;
  user!:UserInfo|null;
  constructor(private readonly authService:AuthService) { }
  ngOnInit(): void {
    this.authService.getUserStatus().subscribe(userStatus => {
       this.user=userStatus;
    });
  }
  
  toggleSidebar() {
    this.closeSideBar=!this.closeSideBar;
  }
 }
