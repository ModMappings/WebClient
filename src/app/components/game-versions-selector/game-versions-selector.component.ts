import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {GameVersion} from '../../services/game-version';
// import {GameVersionsService} from '../../../generated';

@Component({
  selector: 'app-game-versions-selector',
  templateUrl: './game-versions-selector.component.html',
  styleUrls: ['./game-versions-selector.component.scss']
})
export class GameVersionsSelectorComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject();
  versions: GameVersion[] | null = null;

  constructor(/*private readonly gameVersionsService: GameVersionsService*/) {
  }

  ngOnInit() {
    // this.gameVersionsService.getGameVersionsBySearchCriteria().pipe(
    //   map(versions => {
    //     return versions.content?.map()
    //   })
    //   takeUntil(this.destroyed$)
    // ).subscribe(versions => this.versions = versions);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
