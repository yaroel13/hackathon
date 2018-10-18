import { Component } from '@angular/core';
import { LanguageService } from './services';
import { Language } from 'aws-sdk/clients/support';

@Component({
  selector: 'esc-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(language : LanguageService) {
    language.initLocale();
  }
}
