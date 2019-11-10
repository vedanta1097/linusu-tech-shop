import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [OrdersComponent, OrderDialogComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ],
  entryComponents: [
    OrderDialogComponent
  ]
})
export class OrdersModule { }
