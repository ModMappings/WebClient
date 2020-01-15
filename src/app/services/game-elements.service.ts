import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameElementsService {

  constructor() { }

  // getPackages(options?: GetPackagesOptions): Observable<PackageNode> {
  //
  // }
  //
  // private makeHierarchical(flat: Package[]): Package[] {
  //   const exploded = flat.map(p => this.explode(p));
  //   const commonPrefix = this.findCommonPrefix(exploded);
  //
  // }
  //
  //
  //
  // private explode(pkg: Package): ExplodedPackage {
  //   return {
  //     fullName: pkg.fullName,
  //     parts: pkg.fullName.split('.')
  //   };
  // }
  //
  // private findCommonPrefix(data: ExplodedPackage[]): string[] {
  //   data.sort((a, b) => a.fullName < b.fullName ? -1 : a.fullName > b.fullName ? 1 : 0);
  //   const first = data[0];
  //   const last = data[data.length - 1];
  //   const commonPrefix = [];
  //   for (let i = 0; i < first.parts.length && i < last.parts.length; i++) {
  //     const fp = first.parts[i];
  //     const lp = last.parts[i];
  //     if (fp !== lp) {
  //       break;
  //     }
  //     commonPrefix.push(lp);
  //   }
  //   return commonPrefix;
  // }
}
