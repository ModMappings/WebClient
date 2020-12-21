import {map, mergeMap} from 'rxjs/operators';
import {Pageable} from '../../generated';
import {Observable, of} from 'rxjs';

export interface Page<T> {
  content?: Array<T>;
  pageable?: Pageable;
  last?: boolean;
  number?: number;
}

export function getAllPages<T>(
  nextPageProducer: (pageIndex: number) => Observable<Page<T>>
): ((source: Observable<Page<T>>) => Observable<T[]>) {
  return (source: Observable<Page<T>>): Observable<T[]> => {
    return source.pipe(
      mergeMap((page: Page<T>) => {
        if (page == null) {
          return of([]);
        }

        if (page.last) {
          return of(page.content);
        }

        const emptyData: T[] = [];
        of(emptyData);

        const current = page.content ?? [];
        const nextPageIndex = (page.number ?? -1) + 1;
        return nextPageProducer(nextPageIndex)
          .pipe(
            getAllPages(nextPageProducer),
            mergeMap(packageToAppend => {
              return of([...current, ...packageToAppend]);
            })
          );
      }),
      map(data => {
        if (data == null) {
          return [];
        }

        return data;
      })
    );
  };
}

/*

 */
