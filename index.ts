import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

console.clear();
const szamsor = new Observable<number>((observer) => {
  const interval = 500;

  let counter = 0;
  const intervalID = setInterval(() => {
    counter++;
    console.warn('Emitting: ', counter);
    observer.next(counter);
    if (counter === 5) {
      observer.error('counter === 5, emitting error');
    }
  }, interval);

  return () => clearInterval(intervalID);
}).pipe(
  map((value) => value + 2),
  filter((value) => value % 2 === 1)
);

const subject = new Subject<number>();
szamsor.subscribe(subject);

const subscription2 = subject.subscribe({
  next: (res) => console.warn('subscription2 caught: ', res),
  error: (error) => console.error(error),
  complete: () => console.log('Observable completed...'),
});
