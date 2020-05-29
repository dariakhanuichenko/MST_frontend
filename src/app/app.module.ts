import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileDropDirective, FileSelectDirective} from 'ng2-file-upload';
import {HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from './file-upload/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RandomComponent} from './random/random.component';

const routes: Routes = [
   { path: 'file', component: FileUploadComponent },
  { path: 'random', component: RandomComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    RandomComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
