import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeDialogComponent } from './serve-dialog.component';

describe('ServeDialogComponent', () => {
  let component: ServeDialogComponent;
  let fixture: ComponentFixture<ServeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
