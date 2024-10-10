import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-emazon',
  template: `
    <svg
      [ngClass]="svgClass"
      width="3.5rem"
      height="3.5rem"
      viewBox="0 0 24 24"
      [attr.fill]="svgFill"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1 4H3.9C3.66131 4 3.43239 4.09916 3.2636 4.27566C3.09482 4.45217 3 4.69156 3 4.94118V18.1176C3 18.6169 3.18964 19.0957 3.52721 19.4487C3.86477 19.8017 4.32261 20 4.8 20H19.2C19.6774 20 20.1352 19.8017 20.4728 19.4487C20.8104 19.0957 21 18.6169 21 18.1176V4.94118C21 4.69156 20.9052 4.45217 20.7364 4.27566C20.5676 4.09916 20.3387 4 20.1 4ZM12 12.4706C9.0219 12.4706 6.6 9.93788 6.6 6.82353H8.4C8.4 8.89977 10.0146 10.5882 12 10.5882C13.9854 10.5882 15.6 8.89977 15.6 6.82353H17.4C17.4 9.93788 14.9781 12.4706 12 12.4706Z"
      />
    </svg>
  `,
})
export class LogoEmazonComponent {
  @Input() svgFill: string = 'black';
  @Input() svgClass: string[] = [];
}
