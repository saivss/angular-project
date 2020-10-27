import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { enrollees } from './mocks/enrolless';
import { EnrolleesService } from './services/enrollees.service';
import { EnrolleesServiceStub } from './services/enrollees.service.stub';

describe('AppComponent', () => {
  let fixture;
  let component;
  let getUsersSpy;

  let dialogRef;
  let dialogMock;

  beforeEach(async () => {
    dialogMock = {
      open: () => dialogRef,
    };
    dialogRef = {
      afterClosed: () => of(enrollees[0]),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: EnrolleesService,
          useClass: EnrolleesServiceStub
        },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    getUsersSpy = spyOn(component, 'getUsers').and.callThrough();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers onInit', () => {
    expect(getUsersSpy).toHaveBeenCalled();
  });

  describe('getUsers', () => {
    it('should call enrolleeService.getAll', () => {
      const spy = spyOn(component.enrolleeService, 'getAll').and.resolveTo(enrollees);
      component.getUsers();
      expect(spy).toHaveBeenCalled();
    });

    it('should handle error', fakeAsync(() => {
      spyOn(component.enrolleeService, 'getAll').and.rejectWith({ statusText: 'internal Server Error' });
      const spy = spyOn(component, 'openSnackBar').and.callFake(() => { });
      component.getUsers();
      tick();
      expect(spy).toHaveBeenCalled();
    }));

    it('should call initPagination onInit', fakeAsync(() => {
      spyOn(component.enrolleeService, 'getAll').and.resolveTo(enrollees);
      const spy = spyOn(component, 'initPagination').and.callFake(() => { });
      component.getUsers();
      tick();
      expect(spy).toHaveBeenCalled();
    }));

  });

  describe('openSnackBar', () => {
    it('should call SnackBar open method ', () => {
      const spy = spyOn(component._snackBar, 'open').and.callFake(() => { });
      component.openSnackBar();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    it('should call on button click', () => {
      component.dataSource = new MatTableDataSource(enrollees);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const spy = spyOn(component, 'openDialog').and.callFake(() => { });
      compiled.querySelector('button.mat-icon-button').click()
      expect(spy).toHaveBeenCalledWith(enrollees[0]);
    });

    it('should call dialog.open', () => {
      const spy = spyOn(component.dialog, 'open').and.callFake(() => dialogRef);
      component.openDialog(enrollees[0]);
      expect(spy).toHaveBeenCalled();
    });

    it('should call enrolleeService.put', () => {
      const spy = spyOn(component.enrolleeService, 'put').and.callThrough();
      component.openDialog(enrollees[0]);
      expect(spy).toHaveBeenCalled();
    });

    it('should call handle error for update enrollee', fakeAsync(() => {
      spyOn(component.enrolleeService, 'put').and.rejectWith({ statusText: 'Internal server Error' });
      const spy = spyOn(component, 'openSnackBar').and.callFake(() => { });
      component.openDialog(enrollees[0]);
      tick();
      expect(spy).toHaveBeenCalled();
    }));

    it('should call not enrolleeService.put', () => {
      spyOn(component.dialog, 'open').and.callFake(() => ({ afterClosed: () => of(null) }));
      const spy = spyOn(component.enrolleeService, 'put').and.callThrough();
      component.openDialog(enrollees[0]);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
