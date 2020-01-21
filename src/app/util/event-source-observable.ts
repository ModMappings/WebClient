// import {Observable} from 'rxjs';
// import {EventSourcePolyfill} from 'event-source-polyfill';
//
// export function observableEventSource(url: string, init?: EventSourceInit): Observable<string> {
//   return new Observable<string>(observer => {
//     const eventSource = new EventSourcePolyfill(url, init);
//
//     const onMessage = (e: MessageEvent) => {
//       observer.next(e.data);
//     };
//     const onError = (e: Event) => {
//       if (eventSource.readyState === EventSource.CLOSED) {
//         observer.complete();
//       } else {
//         observer.error(e);
//       }
//     };
//
//     eventSource.addEventListener('message', onMessage);
//     eventSource.addEventListener('error', onError);
//
//     return () => {
//       eventSource.removeEventListener('message', onMessage);
//       eventSource.removeEventListener('error', onError);
//       eventSource.close();
//     };
//   });
// }
