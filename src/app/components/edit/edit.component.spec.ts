import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';

import { enrollees } from 'src/app/mocks/enrolless';
import { User } from 'src/app/services/enrollees.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let mockDialogData: {
    user: User
  };
  let matDialogRefMock;

  beforeEach(async () => {

    mockDialogData = {
      user: enrollees[0]
    };
    matDialogRefMock = {
      close: () => { },
    };
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MaterialModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: matDialogRefMock }
      ],
      declarations: [EditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogref.close on close method call', () => {
    const spy = spyOn(matDialogRefMock, 'close');
    component.close();
    expect(spy).toHaveBeenCalled();
  })
});
