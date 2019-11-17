import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkInvoiceComponent } from './add-bulk-invoice.component';

describe('AddBulkInvoiceComponent', () => {
  let component: AddBulkInvoiceComponent;
  let fixture: ComponentFixture<AddBulkInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
