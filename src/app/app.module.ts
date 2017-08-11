import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { PetridishComponent } from './petridish/petridish.component';
import { DishrackComponent } from './dishrack/dishrack.component';

import { Lab } from './lab.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    PetridishComponent,
    DishrackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Lab],
  bootstrap: [AppComponent]
})
export class AppModule { }
