import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PictureviewComponent } from './views/pictureview/pictureview.component';
import { PicturesService } from './services/pictures.service';
import { NotfoundComponent } from './views/notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PictureviewComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PicturesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
