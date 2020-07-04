import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MappableType, MappingsService, VersionedMappablesService} from '../../generated';
import {delay, map} from 'rxjs/operators';

function randomString(length: number, chars: string): string {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export interface LoadedPackage {
  name: string;
  hasChildren: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private readonly mappingsService: MappingsService
  ) {
  }

  getPackagesStartingWith(pkg: string, gameVersionId: string, mappingTypeId: string): Observable<LoadedPackage[]> {
    const count = 3 + Math.floor(Math.random() * 10);
    const pkgs = new Array(count).fill(0)
      .map(() => (pkg === '' ? '' : pkg + '.') + randomString(3 + Math.floor(Math.random() * 6), 'abcdefghijklmnopqrstuvwxyz'))
      .map(name => ({
        name,
        hasChildren: pkg === '' ? true : Math.random() < 0.2
      }));
    return of(pkgs).pipe(
      delay(300 + Math.floor(Math.random() * 300))
    );
    // const dots = pkg.split('.').length;
    // const dotsRegex = new RegExp(`^(?:[^.]+.){${dots}}(.+)$`);
    //
    // return this.mappingsService.getMappingsBySearchCriteria(
    //   undefined, undefined, undefined, MappableType.CLASS,
    //   undefined, undefined, mappingTypeId
    // ).pipe(
    //   map(mappings => {
    //     const pkgs = mappings.content == null ? [] : mappings.content
    //       .map(mapping => mapping.output)
    //       .filter<string>((s): s is string => s != null)
    //       .map(clsName => clsName.replace(/\/[^/]+$/, '').replace(/\//g, '.'))
    //       .filter<string>((s): s is string => s != null)
    //       .filter(pkgName => pkgName.startsWith(pkg));
    //     return [...new Set(pkgs)];
    //   })
  // )
  //   ;

    // return this.versionedMappablesService.getVersionedMappablesBySearchCriteria(
    //   gameVersionId, MappableType.CLASS
    // ).pipe(
    //   map(mappables => {
    //     return mappables.content == null ? [] : mappables.content.map(vm => {
    //       return vm.
    //     })
    //   })
    // );
  }


}
