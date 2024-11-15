import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  constructor(private readonly authService:AuthService, private readonly tokenService:TokenService) {}
  ngOnInit(): void {
      if(this.tokenService.getToken()!==''){
      this.authService.getUser().subscribe({
        error: (response) => {
          if(response.status===401){
          this.tokenService.removeToken();
          }
        },
      });
    }
  }
}
