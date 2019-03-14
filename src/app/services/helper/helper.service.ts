import { Injectable } from '@angular/core';
import {LanguageService} from '../language/language.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private languageService : LanguageService
  ) { }

  // public initLocale(){
  //   let langs = _.map(LANGUAGES, 'value');
  //   this.translate.addLangs(langs);
    
  //   this.translate.setDefaultLang(DEFAULT_LANGUAGE);

  //   let lang;
    
  //   if(localStorage.getItem(KEY_STORAGE_LANGUAGE)){
  //     lang = localStorage.getItem(KEY_STORAGE_LANGUAGE);
  //   } else {
  //     if(_.indexOf(langs, this.translate.getBrowserLang()) >= 0){
  //       lang = this.translate.getBrowserLang();
  //     } else {
  //       lang = DEFAULT_LANGUAGE;
  //     }
  //     localStorage.setItem(KEY_STORAGE_LANGUAGE, DEFAULT_LANGUAGE);
  //   }

  //   this.translate.use(lang);
  // }

  // public getLocale(){
  //   return localStorage.getItem(KEY_STORAGE_LANGUAGE);
  // }

  // public updateLocale(locale){
  //   this.translate.use(locale);
  //   localStorage.setItem(KEY_STORAGE_LANGUAGE, locale);
  // }

  public randomString(n: number = 6){
   return Math.random().toString(36).substring(n);
  }

  public convertToLocalDatetime(objArr) {
    objArr.forEach(obj => {
      Object.keys(obj).forEach(function(key) {
        if(_.isString(obj[key]) && _.isNaN(_.toNumber(obj[key])) && moment(obj[key]).isValid()) {
          obj[key] = moment.utc(obj[key]).local();
        }
      });
    });
    return objArr;
  }
}
