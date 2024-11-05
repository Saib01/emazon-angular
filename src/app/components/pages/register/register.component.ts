import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  statusCode:number|null=null;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  validateClient(client: UserRegister) {
      this.userService.createClient(client).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => this.updateStatusCode(error.status),
      });
  }
  updateStatusCode(status: number) {
    this.statusCode = status;
  }
}
