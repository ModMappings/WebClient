import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PackageService} from '../../generated';
import {getAllPages} from '../util/observable-functions';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageManagementService {

  constructor(
    private readonly apiPackageService: PackageService
  ) {
  }

  getPackagesStartingWith(dotPrefix: string, gameVersionId?: string, mappingTypeId?: string, releaseId?: string): Observable<string[]> {
    const slashPrefix = dotPrefix.replace('.', '/');
    const outputRegex = `${slashPrefix}([a-zA-Z_-]+/.*)/[a-zA-Z_0-9]+`;

    return this.getPackagesWithRegex(outputRegex, gameVersionId, mappingTypeId, releaseId);
  }

  getPackagesIn(packagePrefix: string, gameVersionId?: string, mappingTypeId?: string, releaseId?: string): Observable<string[]> {
    const outputRegex = `${packagePrefix}([a-zA-Z_-]+)/.*`;

    return this.getPackagesWithRegex(outputRegex, gameVersionId, mappingTypeId, releaseId);
  }

  getPackagesInWithDirectChildren(
    packagePrefix: string,
    gameVersionId?: string,
    mappingTypeId?: string,
    releaseId?: string
  ): Observable<string[]> {
    const outputRegex = `(${packagePrefix}[a-zA-Z_-]+(/[a-zA-Z_-]+)?)/.*`;

    return this.getPackagesWithRegex(outputRegex, gameVersionId, mappingTypeId, releaseId);
  }

  getPackagesWithRegex(
    outputMatchingRegex: string,
    gameVersion?: string,
    mappingType?: string,
    release?: string,
    page?: number
  ): Observable<string[]> {
    if (page == null) {
      page = 0;
    }

    return this.apiPackageService.getPackagesBySearchCriteria( {
       gameVersion,
       release,
       mappingType,
       outputMatchingRegex,
       page
    }
    ).pipe(
      getAllPages((page) => {
        return this.apiPackageService.getPackagesBySearchCriteria({
          gameVersion,
          release,
          mappingType,
          outputMatchingRegex,
          page
        });
      }),
      map(packages => packages.sort())
    );
  }

}
