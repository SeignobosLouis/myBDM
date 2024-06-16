import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  constructor() { }

  private monSondage: Observable<boolean> = new Observable(observer => {
    observer.next(false);
    /**setTimeout(() => {
      observer.next(false);
      observer.complete();
    }, 2000);**/
  });

  getSondages(): Observable<boolean> {
    return this.monSondage;
  }
}
