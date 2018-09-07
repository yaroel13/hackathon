import { Component } from '@angular/core';
import { HelperService } from './services';

@Component({
  selector: 'esc-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(helper: HelperService) {
    helper.initLocale();
  }
}
