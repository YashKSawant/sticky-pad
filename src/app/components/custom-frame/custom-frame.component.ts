import { Component } from '@angular/core';
import { faWindowMinimize,faClose } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

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
  ngOnInit(){
    this.title = (window as any).electronAPI.getTitle();
  }
}
