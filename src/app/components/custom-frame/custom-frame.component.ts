import { Component, NgZone } from '@angular/core';
import { faWindowMinimize, faClose } from '@fortawesome/free-solid-svg-icons';
import { faExpand, faThumbTack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-frame',
  standalone: false,
  templateUrl: './custom-frame.component.html',
  styleUrl: './custom-frame.component.css'
})
export class CustomFrameComponent {
  title: string = '';
  faWindowMinimize = faWindowMinimize;
  faWindowMaximize = faExpand;
  faWindowClose = faClose
  faPin = faThumbTack
  isPinned = false;
  winType: string = 'main'; // Default to main

  constructor(private ngZone: NgZone) { }
  ngOnInit() {
    this.title = (window as any).electronAPI.getTitle();

    // Listen for pin status updates from Electron
    (window as any).electronAPI.onPinStatusChange((status: boolean) => {
      this.ngZone.run(() => {
        this.isPinned = status;
      });
    });

    // Get window type from Electron
    (window as any).electronAPI.getWinType((type: string) => {
      this.ngZone.run(() => {
        this.winType = type;
      });
    });
  }

  /**
   * @description This method is used to toggle pin using electron API
   */
  togglePin() {
    (window as any).electronAPI.togglePin();
  }
}
