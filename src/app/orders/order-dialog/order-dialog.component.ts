import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Order } from '../orders.model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  orderData: Order;
  orderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {operation: string, orderData: Order, position: number},
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initiateForm();

    if (this.data.operation === 'edit') {
      this.data.orderData.items.forEach((item, index) => {
        if (index > 0) {
          this.addItem();
        }
      });
      this.orderForm.patchValue(this.data.orderData);
    }
  }

  initiateForm() {
    this.orderForm = this.fb.group({
      totalPrice: [0],
      customerName: ['', Validators.required],
      email: ['', Validators.required],
      items: this.fb.array([this.initItemFormArray()])
    });
  }

  initItemFormArray() {
    return this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      price: [0]
    });
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.initItemFormArray());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    this.orderData = this.orderForm.getRawValue();

    const totalPrice = 0;

    this.dialogRef.close({
      data: this.orderData,
      index: this.data.position
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
