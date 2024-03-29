import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Order, Item } from '../orders.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  categories = ['CPU', 'Motherboard', 'Video Card', 'Memory'];

  cpuList: Item[] = [
    { category: 'CPU', name: 'AMD Ryzen 5 2600', price: 117 },
    { category: 'CPU', name: 'Intel Core i5-9600K', price: 229 },
    { category: 'CPU', name: 'AMD RYZEN 5 3600', price: 194 },
  ];

  motherBoardList: Item[] = [
    { category: 'Motherboard', name: 'MSI PRO Z390-A', price: 129 },
    { category: 'Motherboard', name: 'ASUS PRIME B360M-A', price: 84 },
    { category: 'Motherboard', name: 'ASRock B450M PRO4 AM4', price: 79 },
  ];

  videoCardList: Item[] = [
    { category: 'Video Card', name: 'ZOTAC GeForce GTX 1060', price: 209 },
    { category: 'Video Card', name: 'MSI Radeon RX 580', price: 189 },
    { category: 'Video Card', name: 'GIGABYTE GeForce RTX 2070', price: 499 },
  ];

  memoryList: Item[] = [
    { category: 'Memory', name: 'CORSAIR Vengeance RGB Pro 16GB', price: 97 },
    { category: 'Memory', name: 'G.SKILL TridentZ RGB Series 16GB', price: 86 },
    { category: 'Memory', name: 'G.SKILL Ripjaws Series 8GB', price: 42 },
  ];

  orderData: Order;
  orderForm: FormGroup;
  // array that has value of array cpuList, motherboardList, etc.
  itemList: Item[][] = [];

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {operation: string, orderData: Order, position: number},
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initiateForm();

    if (this.data.operation === 'edit') {
      this.data.orderData.items.forEach((item, index) => {
        this.itemList.push(this.getItemList(item.category));
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
      email: ['', [Validators.required, Validators.email]],
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
    this.itemList.splice(index, 1);
  }

  categoryChanged(index: number) {
    const selectedItem = this.items.get(index.toString());

    const category = selectedItem.get('category').value;
    this.itemList[index] = this.getItemList(category);

    selectedItem.get('name').setValue('');
    selectedItem.get('price').setValue(0);
  }

  setItemPrice(index: string, itemName: MatSelectChange) {
    this.itemList[+index].forEach(item => {
      if (itemName.value === item.name) {
        this.items.get(index).get('price').setValue(item.price);
      }
    });
  }

  getItemList(category: string) {
    switch (category) {
      case 'CPU':
        return this.cpuList;
      case 'Motherboard':
        return this.motherBoardList;
      case 'Video Card':
        return this.videoCardList;
      case 'Memory':
        return this.memoryList;
    }
  }

  onSubmit() {
    this.orderData = this.orderForm.getRawValue();

    let totalPrice = 0;
    this.orderData.items.forEach(item => totalPrice += item.price);
    this.orderData.totalPrice = totalPrice;

    this.dialogRef.close({
      data: this.orderData,
      index: this.data.position
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
