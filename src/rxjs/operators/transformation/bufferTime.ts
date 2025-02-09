// RxJS v6+
import { interval } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

// Buffer for 2 seconds

//Create an observable that emits a value every 500ms
const source = interval(500);
//After 2 seconds have passed, emit buffered values as an array
const example = source.pipe(bufferTime(2000));
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
export const bufferTimeSubscribe = example.subscribe(val =>
  console.log('Buffered with Time:', val)
);


// Multiple active buffers

//Create an observable that emits a value every 500ms
const multiSource = interval(500);
/*
bufferTime also takes second argument, when to start the next buffer (time in ms)
for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
*/
const multiExample = multiSource.pipe(bufferTime(2000, 1000));
//Print values to console
export const multiBufferTimeSubscribe = multiExample.subscribe(val =>
  console.log('Start Buffer Every 1s:', val)
);