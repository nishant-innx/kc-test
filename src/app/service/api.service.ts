import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
export interface responseData {
  id: number;
  name: string;
  location: string;
  type: string;
}

export interface MenuItem {
  id: number;
  menuId: number;
  name: string;
  description: string;
  type: string;
  group: string;
  price: number;
}

export interface MenuResponse {
  id: number;
  restaurantId: number;
  active: boolean;
  menuItems: MenuItem[];  // An array of MenuItem objects
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private oauthService:OAuthService) {}
  http = inject(HttpClient);
  private url1 = 'http://localhost:8080/restaurant/public/list';
  private url2='http://localhost:8080/restaurant/menu'
  getRestaurants(): Observable<responseData[]> {
    return this.http.get<responseData[]>(this.url1,{
      headers:{
        'Authorization':`Bearer ${this.oauthService.getAccessToken()}`
      }
    });
  }
  createRestaurantMenu(menuData: MenuResponse): Observable<MenuResponse> {
    return this.http.post<MenuResponse>(this.url2, menuData,{
      headers:{
        'Authorization':`Bearer ${this.oauthService.getAccessToken()}`
      }
    });
  }
}
