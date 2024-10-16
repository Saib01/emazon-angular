import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  lastSegment: string = '';
  constructor(private readonly router: Router) {}
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
    segments.length>3?segments.pop():"";
    const lastSegment = segments.pop()?.split('?')[0]; 
    return lastSegment!;
  }
}
