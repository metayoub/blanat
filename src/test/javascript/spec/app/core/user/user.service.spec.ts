import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JhiDateUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserService } from 'app/core/user/user.service';
import { IUser, User } from 'app/core/user/user.model';
import { SERVER_API_URL } from 'app/app.constants';

describe('Service Tests', () => {
  describe('User Service', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    let elemDefault: IUser;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [JhiDateUtils],
      });

      service = TestBed.get(UserService);
      httpMock = TestBed.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new User(
        0,
        'login',
        'firstName',
        'lastName',
        'email',
        false,
        'fr',
        [],
        'Admin',
        currentDate.toDate(),
        'Admin',
        currentDate.toDate(),
        'AAAA'
      );
    });

    afterEach(() => {
      httpMock.verify();
    });

    describe('Service methods', () => {
      it('should call correct URL', () => {
        service.find('user').subscribe();

        const req = httpMock.expectOne({ method: 'GET' });
        const resourceUrl = SERVER_API_URL + 'api/users';
        expect(req.request.url).toEqual(`${resourceUrl}/user`);
      });

      it('should return User', () => {
        let expectedResult: string | undefined;

        service.find('user').subscribe(received => {
          expectedResult = received.login;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(new User(1, 'user'));
        expect(expectedResult).toEqual('user');
      });

      it('should return Authorities', () => {
        let expectedResult: string[] = [];

        service.authorities().subscribe(authorities => {
          expectedResult = authorities;
        });
        const req = httpMock.expectOne({ method: 'GET' });

        req.flush([Authority.USER, Authority.ADMIN]);
        expect(expectedResult).toEqual([Authority.USER, Authority.ADMIN]);
      });

      it('should propagate not found response', () => {
        let expectedResult = 0;

        service.find('user').subscribe(null, (error: HttpErrorResponse) => {
          expectedResult = error.status;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request',
        });
        expect(expectedResult).toEqual(404);
      });

      it('should create User', () => {
        let expectedResult: IUser | null = null;
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdDate: currentDate.format(DATE_FORMAT),
            lastModifiedDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate.format(DATE_FORMAT),
            lastModifiedDate: currentDate.format(DATE_FORMAT),
          },
          returnedFromService
        );

        service.create(new User()).subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update User', () => {
        let expectedResult: IUser | null = null;

        const returnedFromService = Object.assign(
          {
            id: 0,
            login: 'string',
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            activated: true,
            langKey: 'fr',
            authorities: [],
            createdBy: 'string',
            createdDate: currentDate.format(DATE_FORMAT),
            lastModifiedBy: 'string',
            lastModifiedDate: currentDate.format(DATE_FORMAT),
            password: 'string',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdDate: currentDate.format(DATE_FORMAT),
            lastModifiedDate: currentDate.format(DATE_FORMAT),
          },
          returnedFromService
        );
        service.update(expected).subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should delete User', () => {
        let expectedResult: {} | null = null;
        const expected = 'login';

        service.delete(expected).subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      it('should find Users', () => {
        let expectedResult: IUser[] | null = null;

        const returnedFromService = Object.assign(
          {
            id: 0,
            login: 'string',
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            activated: true,
            langKey: 'fr',
            authorities: [],
            createdBy: 'string',
            createdDate: currentDate.format(DATE_FORMAT),
            lastModifiedBy: 'string',
            lastModifiedDate: currentDate.format(DATE_FORMAT),
            password: 'string',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate.format(DATE_FORMAT),
            lastModifiedDate: currentDate.format(DATE_FORMAT),
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });
    });
  });
});
