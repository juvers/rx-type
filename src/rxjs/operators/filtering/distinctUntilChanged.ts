// RxJS v6+
import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// only output distinct values, based on the last emitted value
const source$ = from([1, 1, 4,4,,3,3, 2, 2, 3, 3]);

export const distinctUntilChangedSource = source$
  .pipe(distinctUntilChanged())
  // output: 1,2,3
  .subscribe(console.log);