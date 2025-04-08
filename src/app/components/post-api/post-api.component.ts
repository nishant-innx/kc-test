import { Component } from '@angular/core';
import { ApiService, MenuResponse } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-api',
  imports: [FormsModule,CommonModule],
  templateUrl: './post-api.component.html',
  styleUrl: './post-api.component.scss'
})
export class PostApiComponent {
  constructor(private apiService:ApiService){}
  newMenu: MenuResponse = {
      id: 0,
      restaurantId: 1,  // Example restaurantId
      active: true,
      menuItems: [],
    };

    onsubmit() {
      console.log('Form submitted with data:', this.newMenu);
      
      this.apiService.createRestaurantMenu(this.newMenu).subscribe(
        (createdMenu) => {
          console.log('Menu created successfully:', createdMenu);
          this.resetForm();
        },
        (error) => {
          console.error('Error creating menu:', error);
        }
      );
    }
    resetForm() {
      this.newMenu = {
        id: 0,
        restaurantId: 1,
        active: true,
        menuItems: [],
      };
    }
  addMenuItem() {
    this.newMenu.menuItems.push({
      id: 0,  
      menuId: this.newMenu.id,  
      name: '',
      description: '',
      type: '',
      group: '',
      price: 0,
    });
  }
  
  
  removeMenuItem(index: number) {
    this.newMenu.menuItems.splice(index, 1);
  }

}
