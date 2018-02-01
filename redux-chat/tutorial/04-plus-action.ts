interface Action{
  type:string;
  payload?: any;
}

interface Reducer<T>{
  (state:T, action:Action):T;
}

let incrementAction: Action = {type:'INCREMENT'};
let decrementAction: Action = {type:'DECREMENT'};
let plus1000Action: Action = {type:'PLUS', payoad:1000};

let reducer: Reducer<number> = (state:number, action:Action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'PLUS':
      return state + action.payload;
    default:
      return state;
  }
};

console.log(reducer(1000, plus1000Action));
console.log(reducer(1000, {type:'PLUS', payload:5000}));
