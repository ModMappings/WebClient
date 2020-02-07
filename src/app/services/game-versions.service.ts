import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameVersion} from './game-version';
import {ApiService} from './api.service';
import {filter, first, mapTo, skipWhile} from 'rxjs/operators';
import {DateTime} from 'luxon';

// import {observableEventSource} from '../util/event-source-observable';

interface ApiGameVersion {
  id: string;
  createdBy: string;
  createdOn: string;
  name: string;
  preRelease: boolean;
  snapshot: boolean;
}

function mapVersion(api: ApiGameVersion): GameVersion {
  return {
    id: api.id,
    name: api.name,
    createdBy: api.createdBy,
    createdOn: DateTime.fromISO(api.createdOn),
    preRelease: api.preRelease,
    snapshot: api.snapshot
  };
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

  constructor(
    private api: ApiService,
    // private gameVersionsService: GameVersionsService
  ) {
  }

  loadVersions(force: boolean = false): Observable<void> {
    if ((force || this.versions$.getValue() == null) && !this.gameVersionsLoading$.getValue()) {
      this.gameVersionsLoading$.next(true);
      this.api.get<ApiGameVersion[]>('/versions')
        .subscribe({
          next: versions => {
            console.log('got game versions', versions);
            this.versions$.next(versions.map(mapVersion));
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
