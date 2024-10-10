import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-template',
  template: 
  `
    <div class="screen">
      <app-side-bar></app-side-bar>
      <div class="screen__main">
      <app-header></app-header>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .screen {
        display: flex;
        height: 100vh;
        overflow: hidden;
        &__main{
        flex-grow: 1;
      }
      }
    `
  ]
})
export class AdminTemplateComponent {}
