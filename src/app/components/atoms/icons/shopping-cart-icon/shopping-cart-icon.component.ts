import { Component, Input, OnInit} from '@angular/core';
import { ShoppingCartService } from '@services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-icon',
  templateUrl: './shopping-cart-icon.component.html',
  styleUrls: ['./shopping-cart-icon.component.scss']
})
export class ShoppingCartIconComponent implements OnInit{
  @Input() svgFill: string = 'currentColor';
  @Input() svgClass: string[] = [];
  total:number=0;
  constructor(private readonly shoppingCartService:ShoppingCartService){}
  ngOnInit(): void {
    this.shoppingCartService.getTotalProductsInShoppingCart().subscribe({
      next: (response) => {this.total=response}
    });
  }

}
