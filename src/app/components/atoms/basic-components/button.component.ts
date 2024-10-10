import {  Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [type]="typeBtn" [disabled]="isDisabled">
      <ng-content ></ng-content>
    </button> 
  `,
  styles:[`button{
    width: 100%;
    background-color: #15112694;
    border: none;
    padding: 0.75rem;
    color:white;
    font-size: 1.6rem;
    margin-top:1rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
    transition: all 0.3s ease-in-out;
    &:hover{
      box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.3);
      background-color: #151126;
    }
    &:active{
      transform: scale(0.95);
    }
    &:disabled{
      color: #666;
      transform: scale(1);
      cursor: not-allowed;
    }
  }`]
})
export class ButtonComponent{ 
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() isDisabled:boolean=false;
}
