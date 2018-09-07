import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { MODULES } from './global-modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClickableClickModule } from 'angular-clickable-click';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChangePasswordChallengeComponent } from './auth/change-password-challenge/change-password-challenge.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ChangePasswordChallengeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClickableClickModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ...MODULES
  ],
  entryComponents: [
    ChangePasswordChallengeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
