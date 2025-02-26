import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PadTileComponent } from './components/pad-tile/pad-tile.component';
import { PadEditorComponent } from './components/pad-editor/pad-editor.component';
import { MainWindowComponent } from './components/main-window/main-window.component';
import { CustomFrameComponent } from './components/custom-frame/custom-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    PadTileComponent,
    PadEditorComponent,
    MainWindowComponent,
    CustomFrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }