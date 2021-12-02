import React from 'react';

const generateUniqueId = () => {
  return Math.floor(Math.random() * 10000)
}

const reducer = (state = [], action) => {
  console.log("previous-state", state );
  switch(action.type) {
    case 'add': 
      console.log("in add");
      let newNote = {
        id: generateUniqueId(),
        text: "",
        completed: false
      };
      return [
        ...state,
        newNote
      ]
    case 'update':
      console.log("in update");
      let newTodo = {
        id: action.id,
        text: action.text,
        completed: false
      };
      return state.map((todo) => {
          return todo.id === action.id ? newTodo : todo
      })
    default: 
      return state
  }
};

const ToDo = () => {
  const [todos, dispatch] = React.useReducer(reducer, []);
  console.log("updated-state", todos);
  return (
    <>
      <button onClick={() => {
        dispatch({type: 'add'})
      }}>Add</button>
      <div>
        {
        todos.map(({id, text, completed}) => {
          console.log("id", id);
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
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default ToDo;