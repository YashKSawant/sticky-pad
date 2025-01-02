import { Component } from '@angular/core';
import { faMinus, faTimes, faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-pad-editor',
  standalone: false,

  templateUrl: './pad-editor.component.html',
  styleUrl: './pad-editor.component.css'
})
export class PadEditorComponent {
  pad = { title: '', content: '' };
  title = "New Pad";
  faMinimize = faMinus;
  faMore = faEllipsisH;
  faClose = faTimes;
  faAdd = faPlus;

  ngOnInit() {
    (window as any).electronAPI.onInitPad((padData: any) => {
      this.pad = padData; 
      this.title = padData.title;
    });
  }

  savePad() {
    console.log('Saving pad:', this.pad);
  }



}

