import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GameVersion} from './game-version';
// import {observableEventSource} from '../util/event-source-observable';

interface ApiGameVersion {
  id: string;
  createdBy: string;
  createdOn: string;
  name: string;
  preRelease: boolean;
  snapshot: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameVersionsService {

  private readonly versions$: Observable<GameVersion[]> = of(
    // [v('1.12'), v('1.13'), v('1.14', true), v('1.15', true)]
  );

  constructor() {
  }

  get versions(): Observable<GameVersion[]> {
    return this.versions$;
  }

  private loadVersions() {
    // return observableEventSource('http://localhost:8081')
  }
}
