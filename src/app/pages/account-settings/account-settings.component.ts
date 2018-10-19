import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LANGUAGES } from '../../utils/constant';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from '../../services';

@Component({
  selector: 'esc-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  public settingsForm : FormGroup;
  public isSubmitting: boolean;
  public languages = LANGUAGES;

  constructor(
    private helper: HelperService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      language: [this.translate.currentLang, Validators.required],
      setting1: [true],
      setting2: [true],
      setting3: [true],
      setting4: ['option1'],
      checkbox1: [true],
      checkbox2: [true],
      checkbox3: [true],
      slider: [50],
      datePicker: [new Date()],
      buttonGroup: ['left'],
      buttonGroupMultiple: ['left']
    });
  }

  onSubmit(value){
    this.isSubmitting = true;
    setTimeout(() => {
      this.helper.updateLocale(value.language);
      this.isSubmitting = false;
    } , 1000);
  }

}
