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
        is_completed: false
      };
      return [
        ...state,
        newNote
      ]
    case 'remove':
      return state.filter((todo) => action.id !== todo.id)
    case 'toggle-status':
      return state.map(({id, text, is_completed}) => {
        return action.id === id ?
          {
            id,
            text,
            is_completed: !is_completed
          } 
          :
          {
            id,
            text,
            is_completed
          } 
      })
    default: 
      return state
  }
};

const ToDo = () => {
  const [todos, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      <AddTodo addTodo={(text) =>  dispatch({type: 'add', text})} />
      <div>
      {
        todos.map(({id, text, is_completed}) => {
          return (
            <div key={id}>
              <input type="checkbox" id={id} onClick={(e) => {
                 dispatch({type: 'toggle-status', id})
              }}></input>
              <input 
                type="text" 
                id={id}
                name={id}
                value={text}
                onChange={(e) => {
                  let {value} = e.target;
                  dispatch({type: 'update', id, text: value})
                }}
                className={is_completed ? "c-item": ""}
              />
              <button 
                type="button" 
                className="btn-close" 
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