import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TokenService } from '@services/token.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  lastSegment: string = '';
  constructor(private readonly router: Router,private readonly tokenService:TokenService) {}
  ngOnInit(): void {
    this.lastSegment = this.getLastSegment(this.router.routerState.snapshot.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) 
      )
      .subscribe((event: NavigationEnd) => {
        this.lastSegment = this.getLastSegment(event.urlAfterRedirects);
      });
  }
  private getLastSegment(url: string): string {
    const segments = url.split('/'); 
    if(segments.length>3){
      segments.pop();
    }
    const lastSegment = segments.pop()?.split('?')[0]; 
    return lastSegment?.replace('-',' ')!;
  }
  logout(){
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
