import {Observable, of} from 'rxjs';
import {first, map, mapTo, shareReplay} from 'rxjs/operators';
import {LoadedPackage} from '../services/package.service';

export interface PackageNode {
  name: string;
  simpleName: string;
  hasChildren: boolean;
}

export type PackageLoader = (parentPackage: string) => Observable<LoadedPackage[]>;

export class PackageTree {

  readonly rootNode: PackageNode = {
    name: '',
    simpleName: '',
    hasChildren: true
  };

  private readonly loader: PackageLoader;
  private loadingMap = new Map<string, Observable<PackageNode[]>>();
  private childMap = new Map<string, PackageNode[]>();

  constructor(loader: PackageLoader) {
    this.loader = loader;
  }

  isLoadingChildren(name: string): boolean {
    return this.loadingMap.has(name);
  }

  getImmediateChildrenIfLoaded(name: string): PackageNode[] | null {
    const children = this.childMap.get(name);
    return children == null ? null : children;
  }

  loadChildren(name: string): Observable<void> {
    return this.getImmediateChildren(name).pipe(mapTo(undefined));
  }

  getImmediateChildren(name: string): Observable<PackageNode[]> {
    const loading = this.loadingMap.get(name);
    if (loading != null) {
      return loading;
    }
    const children = this.childMap.get(name);
    if (children != null) {
      return of(children);
    }

    const loader = this.loader(name).pipe(
      first(),
      map(rawChildren => {
        return rawChildren.map(pkg => parsePackage(pkg));
      }),
      shareReplay(1)
    );

    this.loadingMap.set(name, loader);
    loader.subscribe({
      next: c => this.childMap.set(name, c),
      complete: () => {
        this.loadingMap.delete(name);
      }
    });

    loader.subscribe();

    return loader;
  }
}

function parsePackage(pkg: LoadedPackage): PackageNode {
  const match = pkg.name.match(/\.([^.]+)$/);
  return {
    name: pkg.name,
    simpleName: match == null ? pkg.name : match[1],
    hasChildren: pkg.hasChildren
  };
}
