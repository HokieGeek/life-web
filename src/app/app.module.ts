import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { PetridishComponent } from './petridish/petridish.component';
import { BoardComponent } from './petridish/board/board.component';
import { DishrackComponent } from './dishrack/dishrack.component';

import { Lab } from './lab.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    PetridishComponent,
    BoardComponent,
    DishrackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  providers: [Lab],
  bootstrap: [AppComponent]
})
export class AppModule { }
