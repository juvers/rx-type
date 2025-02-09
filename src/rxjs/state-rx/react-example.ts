// // Convenience method to get the current value of any "stateful observable"
// // BehaviorSubjects already have the getValue method, but that won't work
// // on derived state

// function get(observable$) {
//     let value;
//     observable$.subscribe((val) => (value = val)).unsubscribe();
//     return value;
//   }
  
//   // Custom React hook for unwrapping observables
//   function useUnwrap(observable$) {
//     const [value, setValue] = useState(() => get(observable$));
  
//     useEffect(() => {
//       const subscription = observable$.subscribe(setValue);
//       return function cleanup() {
//         subscription.unsubscribe();
//       };
//     }, [observable$]);
  
//     return value;
//   }


//   // `player` would in reality come from elsewhere (e.g., another file, or provided with context)
// const player = new Player();

// function MyComponent() {
//   // Unwrap the observables into plain values
//   const x = useUnwrap(player.x$),
//     y = useUnwrap(player.y$);

//   const handleClickRight = () => {
//     // Update state by calling a method
//     player.moveRight();
//   };

//   return (
//     <div>
//       The player's position is ({x},{y})
//       <button onClick={handleClickRight}>Move right</button>
//     </div>
//   );
// }