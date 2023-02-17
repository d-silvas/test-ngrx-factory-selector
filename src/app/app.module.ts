import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { featureReducer } from './store/reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forFeature('feature', featureReducer)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
