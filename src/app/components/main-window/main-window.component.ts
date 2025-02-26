import { Component } from '@angular/core';
import { faMinus, faTimes,faEllipsisH ,faPlus} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-window',
  standalone: false,
  
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css'
})
export class MainWindowComponent {
 title: string = '';
  faMinimize = faMinus;
  faMore = faEllipsisH;
  faClose = faTimes;
  faAdd = faPlus;

  ngOnInit() {
    // Get the window title from Electron's main process
    this.title = (window as any).electronAPI.getTitle();
  }
   

   openNewPad() {
    (window as any).electronAPI.openNewPad();
  }
}
