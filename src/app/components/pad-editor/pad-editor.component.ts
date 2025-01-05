import { Component ,AfterViewInit} from '@angular/core';
import { faMinus, faTimes, faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons';
import Editor from '@toast-ui/editor';

@Component({
  selector: 'app-pad-editor',
  standalone: false,
  templateUrl: './pad-editor.component.html',
  styleUrl: './pad-editor.component.css'
})
export class PadEditorComponent {
  editor!: Editor;
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

  ngAfterViewInit() {
    this.editor = new Editor({
      el: document.querySelector('#editor')!,
      theme:'dark',
      initialEditType: 'wysiwyg', // Start in Markdown mode
      previewStyle: 'vertical',  
      hideModeSwitch: true,
      toolbarItems: [
        // Only include certain toolbar options
        ['bold', 'italic', 'strike'], 
        ['quote', 'code'], 
        [ 'image'],  
      ] 
    });

    this.adjustEditorHeight(); // Set initial height
    window.addEventListener('resize', this.adjustEditorHeight);
  }

  /**
   * @description This method to adjust editor height dynamically
   */
  adjustEditorHeight = () => {
    const editorContainer = document.querySelector('#editor') as HTMLElement;
    const windowHeight = window.innerHeight;
    // Subtract toolbar space or other UI elements
    editorContainer.style.height = `${windowHeight - 100}px`;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.adjustEditorHeight);
  }

  savePad() {
    console.log('Saving pad:', this.pad);
  }



}

