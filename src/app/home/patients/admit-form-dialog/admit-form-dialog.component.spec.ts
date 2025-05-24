import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitFormDialogComponent } from './admit-form-dialog.component';

describe('AdmitFormDialogComponent', () => {
  let component: AdmitFormDialogComponent;
  let fixture: ComponentFixture<AdmitFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmitFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmitFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
