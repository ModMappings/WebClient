import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';

export interface LocalStorageHandle<T> {
  readonly key: string;
  value: T;
  readonly value$: Observable<T>;
  dispose(): void;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  createHandle<T>(
    key: string,
    decoder: (encoded: string | null) => T,
    encoder: (value: T) => string
  ): LocalStorageHandle<T> {
    key = 'mcms.' + key;

    function load(): T {
      return decoder(localStorage.getItem(key));
    }

    function save(value: T) {
      localStorage.setItem(key, encoder(value));
    }

    const eventSubscription = fromEvent(window, 'storage')
      .subscribe((evt: StorageEvent) => {
        if (evt.key == null || evt.key === key) {
          subject.next('newValue' in evt ? decoder(evt.newValue) : load());
        }
      });
    const subject = new BehaviorSubject(load());
    return {
      key,
      get value(): T {
        return subject.getValue();
      },
      set value(value: T) {
        save(value);
        subject.next(value);
      },
      value$: subject,
      dispose() {
        eventSubscription.unsubscribe();
      }
    };
  }

}
