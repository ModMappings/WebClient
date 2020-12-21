import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {GameVersion} from '../../services/game-version';
import {GameVersionsService} from '../../../generated';
import {DateTime} from 'luxon';
import {getAllPages} from '../../util/observable-functions';

@Component({
  selector: 'app-game-versions-selector',
  templateUrl: './game-versions-selector.component.html',
  styleUrls: ['./game-versions-selector.component.scss']
})
export class GameVersionsSelectorComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject();
  versions: GameVersion[] | null = null;

  @Output()
  selectGameVersion = new EventEmitter<GameVersion>();

  constructor(private readonly gameVersionsService: GameVersionsService) {
  }

  ngOnInit() {
    this.gameVersionsService.getGameVersionsBySearchCriteria({}).pipe(
      getAllPages(pageIndex => this.gameVersionsService.getGameVersionsBySearchCriteria({page: pageIndex})),
      map(versions => {
        return versions.map(version => {
          return {
            id: version.id || '',
            createdBy: version.createdBy || '<unknown>',
            createdOn: version.createdOn == null ? null : DateTime.fromJSDate(new Date(Date.parse(version.createdOn))),
            name: version.name,
            preRelease: version.preRelease,
            snapshot: version.snapshot
          };
        });
      }),
      takeUntil(this.destroyed$)
    ).subscribe(versions => this.versions = versions == null ? null : versions);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
