import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MappableType, MappingsService, PackageService, VersionedMappablesService} from '../../generated';
import {delay, filter, flatMap, map, mergeMap} from 'rxjs/operators';
import {angularLifecycleMethodKeys} from 'codelyzer/util/utils';

function randomString(length: number, chars: string): string {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

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
    outputRegex: string,
    gameVersionId?: string,
    mappingTypeId?: string,
    releaseId?: string,
    page?: number
  ): Observable<string[]> {
    if (page == null) {
      page = 0;
    }

    return this.apiPackageService.getPackagesBySearchCriteria(
      gameVersionId,
      releaseId,
      mappingTypeId,
      undefined,
      outputRegex,
      page
    ).pipe(
      mergeMap((pulledPage) => {
        if (pulledPage.last) {
          return of(pulledPage.content);
        }

        const current = pulledPage.content ?? [];
        return this.getPackagesWithRegex(
          outputRegex, gameVersionId, mappingTypeId, releaseId, (pulledPage.number ?? -1) + 1
        )
          .pipe(
            map(packageToAppend => {
              return [...current, ...packageToAppend];
            })
          );
      }),
      map(packages => {
        if (packages === undefined) {
          return [];
        }

        return packages;
      })
    );
  }

}
