import React from 'react';

let uniqueNoteId = 0;

const reducer = (state = [], action) => {
  console.log("previous-state", state );
  switch(action.type) {
    case 'add': 
      console.log("in add");
      let newNote = {
        id: uniqueNoteId++,
        text: "",
        completed: false
      };
      return [
        ...state,
        newNote
    ]
    case 'update':
      console.log("in update");
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
  console.log("updated-state", todos);
  return (
    <>
      <button onClick={() => {
        console.log("onClick", uniqueNoteId);
        dispatch({type: 'add'})
      }}>Add</button>
      <div>
        {
        todos.map(({id, text, completed}) => {
          console.log("id", id);
          return (
            <div>
              <input type="checkbox" id={id}></input>
              {/* <input 
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
              /> */}
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default ToDo;