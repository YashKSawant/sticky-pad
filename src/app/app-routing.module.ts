import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PadEditorComponent } from './components/pad-editor/pad-editor.component';
import { MainWindowComponent } from './components/main-window/main-window.component';

const routes: Routes = [
  { path: '', component: MainWindowComponent, title: 'Sticky Pad' }, // Route for main window
  { path: 'pad', component: PadEditorComponent, title: 'New Pad' }, // Route for pad editor
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
