import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/${path}`, { observe: 'response' })
      .pipe(map((res) => res.body));
  }

  put(path: string, param: object, header: object = {}): Observable<any> {
    return this.http
      .put<any>(`${environment.apiUrl}/${path}`, param, {
        ...header,
        observe: 'response',
      })
      .pipe(map((res) => res.body));
  }

  post(path: string, param: object, header: object = {}): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/${path}`, param, {
        ...header,
        observe: 'response',
      })
      .pipe(map((res) => res.body));
  }

  patch(path: string, param: object): Observable<any> {
    return this.http
      .patch<any>(`${environment.apiUrl}/${path}`, param, {
        observe: 'response',
      })
      .pipe(map((res) => res.body));
  }

  delete(path: string): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(`${environment.apiUrl}/${path}`, { observe: 'response' })
      .pipe(map((res) => res.body));
  }
}
