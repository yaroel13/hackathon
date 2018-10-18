import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES, KEY_STORAGE_LANGUAGE, DEFAULT_LANGUAGE } from '../../utils/constant';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate : TranslateService) { 
    
  }

  public initLocale()
  {
    let langs = _.map(LANGUAGES,'value');
    this.translate.addLangs(langs);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    
    let lang;
    if(localStorage.getItem(KEY_STORAGE_LANGUAGE))
    {
      lang = localStorage.getItem(KEY_STORAGE_LANGUAGE);
    }
    else
    {
      if(_.indexOf(langs,this.translate.getBrowserLang()))
      {
        lang = this.translate.getBrowserLang();
      }
      else
      {
        lang = this.translate.getDefaultLang();
      }
      localStorage.setItem(KEY_STORAGE_LANGUAGE,this.translate.getDefaultLang());
    }
    this.translate.use(lang);
  }

  public getLocale()
  {
    return localStorage.getItem(KEY_STORAGE_LANGUAGE);
  }

  
  public updateLocale(locale){
    this.translate.use(locale);
    localStorage.setItem(KEY_STORAGE_LANGUAGE, locale);
  }


}
