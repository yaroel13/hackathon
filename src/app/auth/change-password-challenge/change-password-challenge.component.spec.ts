import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordChallengeComponent } from './change-password-challenge.component';

describe('ChangePasswordChallengeComponent', () => {
  let component: ChangePasswordChallengeComponent;
  let fixture: ComponentFixture<ChangePasswordChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
