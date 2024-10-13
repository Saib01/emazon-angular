import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  menu=['home','orders','products','customers','calendar','reporte','settings'];
  closeSideBar:boolean = true;
  toggleSidebar() {
    this.closeSideBar=!this.closeSideBar;
  }
 }
