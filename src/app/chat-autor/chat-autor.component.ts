import { Component } from '@angular/core';
import {FooterComponent} from "../public/components/footer/footer.component";

@Component({
  selector: 'app-chat-autor',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './chat-autor.component.html',
  styleUrl: './chat-autor.component.css'
})
export class ChatAutorComponent {

}
