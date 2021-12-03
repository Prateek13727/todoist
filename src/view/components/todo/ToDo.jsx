import React from 'react';
import AddTodo from './AddTodo';

const generateUniqueId = () => {
  return Math.floor(Math.random() * 10000)
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'add': 
      console.log("in add");
      let newNote = {
        id: generateUniqueId(),
        text: action.text,
        completed: false
      };
      return [
        ...state,
        newNote
      ]
    default: 
      return state
  }
};


const ToDo = () => {
  const [todos, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      {/* <button onClick={() => {
        dispatch({type: 'add'})
      }}>Add</button> */}
      <AddTodo addTodo={(text) =>  dispatch({type: 'add', text})} />
      <div>
        {
        todos.map(({id, text, completed}) => {
          return (
            <div key={id}>
              <input type="checkbox" id={id}></input>
              <input 
                type="text" 
                id={id}
                name={id}
                value={text}
                onChange={(e) => {
                  let {value} = e.target;
                  dispatch({type: 'update', id, text: value})
                }}
              />
              <button 
                type="button" 
                class="btn-close" 
                aria-label="Close"
                onClick={(e) => {
                  dispatch({type: 'remove', id})
                }}
              >
              </button>
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default ToDo;