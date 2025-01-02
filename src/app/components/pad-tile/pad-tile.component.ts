import { Component } from '@angular/core';
import { faThumbTack, faTimes,faEllipsisH ,faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pad-tile',
  standalone: false,
  templateUrl: './pad-tile.component.html',
  styleUrl: './pad-tile.component.css'
})
export class PadTileComponent {
  faPin = faThumbTack
  faMore = faEllipsisH
}
