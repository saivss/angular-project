import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { enrollees as mockEnrollees } from '../mocks/enrolless';
import { EnrolleesService, User } from './enrollees.service';

describe('EnrolleesService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
		httpMock.verify();
	});

	it('should be created', inject([EnrolleesService], (service: EnrolleesService) => {
		expect(service).toBeTruthy();
	}));

  describe('getAll', () => {
    it('should return all enrollees', inject([EnrolleesService], async (service: EnrolleesService) => {
  
      const expectedResponse: User[] = mockEnrollees;
  
      let actualResponse: User[];

      // Arrange
      const call = service.getAll();
      const req = httpMock.expectOne(`${environment.apiBaseUrl}/enrollees`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedResponse);

      // Act
      actualResponse = await call;

      // Assert
      httpMock.verify();
      expect(actualResponse).toBeTruthy();
      expect(actualResponse).toBe(expectedResponse);
    }));
  });

  describe('put', () => {
    it('should return enrollee', inject([EnrolleesService], async (service: EnrolleesService) => {
  
      const expectedResponse: User = mockEnrollees[0];
  
      let actualResponse: User;

      // Arrange
      const call = service.put(mockEnrollees[0]);
      const req = httpMock.expectOne(`${environment.apiBaseUrl}/enrollees/${mockEnrollees[0].id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(expectedResponse);

      // Act
      actualResponse = await call;

      // Assert
      httpMock.verify();
      expect(actualResponse).toBeTruthy();
      expect(actualResponse).toBe(expectedResponse);
    }));
  });

});
