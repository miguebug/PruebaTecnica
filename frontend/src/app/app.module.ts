import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Webservices } from 'src/providers/webservices';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	 FormsModule ,
	 HttpClientModule,
    AppRoutingModule
  ],
  providers: [Webservices],
  bootstrap: [AppComponent]
})
export class AppModule { }
