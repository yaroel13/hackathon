import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KEY_STORAGE_LANGUAGE, DEFAULT_LANGUAGE } from '../../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private translate: TranslateService
  ) { }

  public initLocale(){
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    if(localStorage.getItem(KEY_STORAGE_LANGUAGE)){
      this.translate.use(localStorage.getItem(KEY_STORAGE_LANGUAGE));
    } else {
      this.translate.use(DEFAULT_LANGUAGE);
      localStorage.setItem(KEY_STORAGE_LANGUAGE, DEFAULT_LANGUAGE);
    }
  }

  public updateLocale(locale){
    this.translate.use(locale);
    localStorage.setItem(KEY_STORAGE_LANGUAGE, locale);
  }
}
