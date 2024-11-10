import { Component } from '@angular/core';
import { UserRegister } from '@models/user.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-create-warehouse-assistant',
  templateUrl: './create-warehouse-assistant.component.html',
  styleUrls: ['./create-warehouse-assistant.component.scss'],
})
export class CreateWarehouseAssistantComponent {
  statusCode:number|null=null;
  constructor(
    private readonly userService: UserService
  ) {}

  validateWarehouse(warehouse: UserRegister) {
      this.userService.createWarehouse(warehouse).subscribe({
        next: (response) => this.updateStatusCode(response.status),
        error: (error) => this.updateStatusCode(error.status),
      });
  }
  updateStatusCode(status: number) {
    this.statusCode = status;
  }
}
