import React from 'react';

let noteId = 0;

const reducer = (state, action) => {
  switch(action.type) {
    case 'add': 
      console.log("add");
      return [
        ...state, {
          id: ++noteId,
          text: "",
          completed: false
        } 
      ]
    case 'update':
      console.log("add");
      const todos = state.filter((todo) => {return todo.id !== action.id})
      return [
        ...todos,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default: 
      return state
  }
};

const ToDo = () => {
  const [todos, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      <button onClick={() => {
        dispatch({type: 'add'})
      }}>Add</button>
      <div>
        {
        todos.map(({id, text, completed}) => {
          return (
            <div>
              <input type="checkbox" id="id" name="id"></input>
              <input 
                type="text" 
                id={id}
                name={id}
                value={text}
                onChange={(e) => {
                  let {value} = e.target;
                  console.log("value", value);
                  console.log("id", id);
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