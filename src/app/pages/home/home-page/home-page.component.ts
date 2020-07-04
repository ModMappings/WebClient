import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameVersion} from '../../../services/game-version';
import {PackageTree} from '../../../util/package-tree';
import {PackageService} from '../../../services/package.service';
import {MappingType, MappingTypesService} from '../../../../generated';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  mappingTypes: MappingType[] | null = null;
  packageTree: PackageTree | null = null;

  constructor(
    private router: Router,
    private mappingTypesService: MappingTypesService,
    private packageService: PackageService
  ) {
  }

  ngOnInit() {
    this.mappingTypesService.getMappingTypesBySearchCriteria().subscribe(pmt => {
      this.mappingTypes = pmt.content == null ? null : pmt.content;
    });
  }


  selectGameVersion(gameVersion: GameVersion) {
    if (this.mappingTypes != null) {
      this.packageTree = new PackageTree(pkg => {
        if (this.mappingTypes == null || this.mappingTypes[0].id == null) {
          throw new Error();
        }
        return this.packageService.getPackagesStartingWith(pkg, gameVersion.id, this.mappingTypes[0].id);
      });
    }
  }

  search(value: string) {
    // TODO error handling

  }
}
