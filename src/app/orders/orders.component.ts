import { Component, OnInit } from '@angular/core';
import { Order } from './orders.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [
    {
      totalPrice: 246,
      customerName: 'PewDiePie',
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
      customerName: 'Filthy Frank',
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

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addOrder() {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '900px',
      data: {
        operation: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.orders.push(result.data);
      }
    });
  }

  editOrder(order: Order, index: number) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '900px',
      data: {
        operation: 'edit',
        orderData: order,
        position: index
      }
    });

    dialogRef.afterClosed().subscribe((result: {data: Order, index: number}) => {
      if (result.data) {
        this.orders[result.index] = result.data;
      }
    });
  }

  deleteOrder(i: number) {
    this.orders.splice(i, 1);
  }

}
