import { map } from "rxjs/operators";
import {atom, ReadonlyAtom, readonlyAtom} from "./atom";
import { combine } from "./combine";
import { get } from "./get";


// ATOM
const $name = atom("Jerry");

$name.get()                            // "Jerry"
$name.set("Tom")                       // sets value to "Tom" and notifies subscribers
$name.update(n => n + " Mander")       // set to "Jerry Mander" -
                                       //   use instead of set if you want to use the previous value

const uppercaseName$ = $name.pipe(     // pipe can be used as per usual in RxJS,
  map(n => n.toUpperCase()),           // and returns an RxJS observable
)
const lowercaseName$ = $name.map(n => n.toLowerCase()) // "map" is provided for convenience so you
                                                       //   don't need pipe, and returns a ReadonlyAtom

const $nameRO = $name.readonly()       // returns a read-only version of the atom (ReadonlyAtom)
$nameRO.get()    // "Jerry Mander"
// $nameRO.set(...) // ERROR - METHOD DOESN'T EXIST!

$name.destroy()                        // rarely used but can use to remove all subscribers


// COMBINE
const names$ = atom(["Geoffrey", "Bungle", "George", "Zippy"]);
const selectedIndex$ = atom(1);
const selectedName$ = combine(
    [names$, selectedIndex$], // tuple of multiple observables
    ([names, index]) => names[index] // calculate new value derived from values from observables
  );
  selectedName$.get(); // "Bungle"

const selectedName2$ = combine(
    { names: names$, idx: selectedIndex$ }, // object lookup of multiple observables
    ({ names, idx }) => names[idx] // calculate derived value
  );
  selectedName2$.get(); // "Bungle"

  const selectedName3$ = combine({ names: names$, idx: selectedIndex$ }); // = an observable that emits {names: string[], idx: number} objects

const selectedName4$ = combine([names$, selectedIndex$]); // = an observable that emits [string[], number] objects

// GET
// This library provides a convenience method for synchronously getting the value from an RxJS observable
get($name); // 7

// READONLY ATOM
const [count$, setCount] = readonlyAtom(4);
count$.get(); // 4 - this is just a ReadonlyAtom

setCount(7);
count$.get(); // 7

// This would be useful for e.g. using in a class, where the read-only atom is public, but the setter is private:

class Person {
    public name$: ReadonlyAtom<string>;
    private setName: (name: string) => void;
  
    constructor(initialName: string) {
      [this.name$, this.setName] = readonlyAtom(initialName); // NOTE the parentheses when doing this
    }
  
    //... use this.setName("...") internally
  }
  
  const person = new Person("Fred");
  person.name$.set("Bubba"); // ERROR: name$ is readonly so has no 'set'