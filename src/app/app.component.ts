import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, throwError } from 'rxjs';
import { ApiService, MenuResponse, responseData } from './service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  restaurants:responseData[]=[];
  helloText=""
  title = 'kc-test';
  constructor(private oauthService:OAuthService,private httpClient:HttpClient,private apiService:ApiService){

  }
  logout(){
    this.oauthService.logOut();

  }
  getHelloText(){
    this.httpClient.get<{message:string}>('http://localhost:8080/hello',{
      headers:{
        'Authorization':`Bearer ${this.oauthService.getAccessToken()}`
      }
    }).pipe(catchError((error:HttpErrorResponse)=>{
      if(error.status===401){
        console.error('Unauthorized broo,no token no access or refresh it ',error);
        this.helloText='Unauthorized broo,no token no access or refresh it ';
        
      }else if(error.status===403){
        console.error('youre not a admin bro',error);
        this.helloText='you are not an admin bro';

        
      }else{
        console.error('unknown error');
        
      }
      return throwError (error);
    })).subscribe(result=>{
      this.helloText=result.message;
    })
  }
  getRestaurants(){
    this.apiService.getRestaurants().subscribe(
      (data)=>{
        this.restaurants=data;
        console.log(this.restaurants);
        
      },(error)=>{
        console.error('error fetching restuarants',error);
        

      }
    )
  }
 

}
