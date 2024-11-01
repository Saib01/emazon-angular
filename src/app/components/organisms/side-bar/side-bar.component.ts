import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@models/user-info.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{
  closeSideBar:boolean = true;
  user!:UserInfo|null;
  toggleSidebar() {
    this.closeSideBar=!this.closeSideBar;
  }
  constructor(private readonly userService:UserService) { }
  ngOnInit(): void {
   this.user=this.userService.getUserValue();
  }
 }
