import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInvoiceFormComponent } from './project-invoice-form.component';

describe('ProjectInvoiceFormComponent', () => {
  let component: ProjectInvoiceFormComponent;
  let fixture: ComponentFixture<ProjectInvoiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInvoiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
