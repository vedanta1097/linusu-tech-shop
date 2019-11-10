import { Component, OnInit } from '@angular/core';
import { Order } from './orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [
    {
      totalPrice: 246,
      buyer: 'PewDiePie',
      email: 'PewDiePie@gmail.com',
      items: [
        {
          category: 'CPU',
          name: 'AMD Ryzen 5 2600',
          price: 117
        },
        {
          category: 'Motherboard',
          name: 'MSI PRO Z390-A',
          price: 129
        },
      ]
    },
    {
      totalPrice: 306,
      buyer: 'Filthy Frank',
      email: 'georgemiller@gmail.com',
      items: [
        {
          category: 'Video Card',
          name: 'ZOTAC GeForce GTX 1060',
          price: 209
        },
        {
          category: 'Memory',
          name: 'CORSAIR Vengeance RGB Pro 16GB',
          price: 97
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
