import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Edge} from './model/Edge';
import {Result} from './model/Result';
import {Statistics} from './model/statistics';
import {Counters} from './model/counters';


@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(private http: HttpClient) {
  }

  uploadFile(files: FormData): Observable<Result[]> {
    return this.http.post<any[]>(`http://localhost:8081/api/upload`, files);
  }

  getData( size: number, num: number): Observable<Result[]> {
    return this.http.get<any[]>('http://localhost:8081/api/upload-random?size=' + size + '&number=' + num );
  }

  getStatistics(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>('http://localhost:8081/api/statistics');
  }

  getStatisticsByDiaphazone(diaphazone: string): Observable<Statistics[]> {
    return this.http.get<Statistics[]>('http://localhost:8081/api/statistics-chart?d=' + diaphazone );
  }

  getCountersByDiaphazone(diaphazone: string): Observable<Counters> {
    return this.http.get<Counters>('http://localhost:8081/api/statistics-chart-counters?d=' + diaphazone );
  }
}
