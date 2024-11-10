import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '@models/user-info.model';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user!: UserInfo | null;
  isVisibleUserInfo:boolean=false;
  @ViewChild('userButton') userButton!: ElementRef;
  @ViewChild('userInfoContainer') userInfoContainer!: ElementRef;

  constructor(private readonly router: Router, private readonly tokenService: TokenService, private readonly authService: AuthService) { }
  ngOnInit(): void {
    this.authService.getUserStatus().subscribe(userStatus => {
      this.user = userStatus;
    });
  }

  logout() {
    this.tokenService.removeToken();
    this.authService.removerUser();
    this.isVisibleUserInfo=false;
    const url=this.router.routerState.snapshot.url;
    if(url.includes('create')||url.includes('add-supply')||url.includes('warehouse')){
      this.router.navigate(['/panel/home']);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  getSimpleRole(){
    if(this.user==null||this.user.role.includes('CLIENT')){
      return 'client'
    }
    return this.user.role.includes('AUX')?'Warehouse':'Admin';
  }

  toggleUserInfo(){
    this.isVisibleUserInfo=!this.isVisibleUserInfo;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.isVisibleUserInfo &&
      !this.userButton.nativeElement.contains(target) &&
      !this.userInfoContainer.nativeElement.contains(target)
    ) {
      this.isVisibleUserInfo = false;
    }
  }
}
