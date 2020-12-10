import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  getUrl = '/api/mentors';
  postUrl = '/api/requests'

  constructor(
    private http: HttpClient
  ) { }

  getMentors() {
    return<Observable<any>> this.http.get(this.getUrl)
  }

}
