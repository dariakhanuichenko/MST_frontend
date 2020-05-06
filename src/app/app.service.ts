import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Edge} from './model/Edge';
import {Result} from './model/Result';


@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(private http: HttpClient) {
  }

  uploadFile(files: FormData, l: number): Observable<Result> {
    return this.http.post<any>(`http://localhost:8080/api/upload/${l}`, files);
  }
}
