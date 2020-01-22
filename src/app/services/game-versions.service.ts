import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameVersion} from './game-version';
import {ApiService} from './api.service';
import {filter, first, mapTo, skipWhile} from 'rxjs/operators';

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

  private readonly gameVersionsLoading$ = new BehaviorSubject<boolean>(false);
  readonly versions$ = new BehaviorSubject<GameVersion[] | null>(null);
  readonly versions: Observable<GameVersion[]> = this.versions$.pipe(
    filter<GameVersion[]>(v => v != null)
  );

  constructor(private api: ApiService) {
  }

  loadVersions(force: boolean = false): Observable<void> {
    if ((force || this.versions$.getValue() == null) && !this.gameVersionsLoading$.getValue()) {
      this.gameVersionsLoading$.next(true);
      this.api.get<GameVersion[]>('/versions')
        .subscribe({
          next: versions => {
            this.versions$.next(versions);
          },
          complete: () => this.gameVersionsLoading$.next(false)
        });
    }
    return this.gameVersionsLoading$.pipe(
      skipWhile(loading => loading),
      first(),
      mapTo(undefined)
    );
  }
}
