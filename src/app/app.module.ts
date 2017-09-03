import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SupportComponent } from './support/support.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SupportComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
