import { Component } from '@angular/core';
import { UserRegister } from '@models/user.model';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent {
  //Hacer una peticion de verificacion al usuario y recibir un 403 para validar cliente y auxiliar
  //401 para el usuario es invalido
  constructor(private readonly userService:UserService, private readonly tokenService:TokenService) {}
  ngOnInit(): void {
      const warehouse: UserRegister = {
        name: '',
        lastName:  '',
        idDocument:  '',
        phoneNumber:  '',
        dateOfBirth:  '',
        email:  '',
        password: '',
      };
      this.userService.createWarehouse(warehouse).subscribe({
        error: (error) => {
          if(error.status=='401'){
            this.tokenService.removeToken();
          }
        },
      });
    this.userService.getUser();
  }
}
