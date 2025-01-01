import { Component } from '@angular/core';
import { faDownLeftAndUpRightToCenter, faTimes,faGear } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = '';

  ngOnInit() {
    // Get the window title from Electron's main process
    this.title = (window as any).electronAPI.getTitle();
  }
   
}
