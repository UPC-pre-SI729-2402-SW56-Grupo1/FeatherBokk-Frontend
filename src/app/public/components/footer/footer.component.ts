import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIcon,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    const userLang = localStorage.getItem('lang') || 'en';
    this.translate.use(userLang);
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
