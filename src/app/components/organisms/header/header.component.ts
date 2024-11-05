import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserInfo } from '@models/user-info.model';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  lastSegmentUrl: string = '';
  user!: UserInfo | null;
  isVisibleUserInfo:boolean=false;
  constructor(private readonly router: Router) { }
  ngOnInit(): void {
    this.router.events
    .pipe(
      startWith(this.router.routerState.snapshot.url),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd || typeof event === 'string'),
      map((event: NavigationEnd) => this.getLastSegment(typeof event === 'string' ? event : event.url))
    )
    .subscribe((lastSegment: string) => this.lastSegmentUrl = lastSegment);
  }
  private getLastSegment(url: string): string {
    const segments = url.split('/');
    if (segments.length > 3) {
      segments.pop();
    }
    const lastSegment = segments.pop()?.split('?')[0];
    return lastSegment?.replace('-', ' ')!;
  }
}
