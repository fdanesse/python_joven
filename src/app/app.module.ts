import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PictureviewComponent } from './views/pictureview/pictureview.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { FilesService } from './services/files.service';
import { PicturesService } from './services/pictures.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PictureviewComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseconf),
    AngularFireStorageModule,
    AngularFirestoreModule, // https://angularfirebase.com/lessons/firestore-with-angularfire-basics/
  ],
  providers: [FilesService, PicturesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
