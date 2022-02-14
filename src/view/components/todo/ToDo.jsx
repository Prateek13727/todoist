import React from 'react';
import AddTodo from './AddTodo';
import MoreOptions from './MoreOptions';

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
    case 'edit':
      return state.map(({id, text, is_completed}) => {
        return action.id === id ?
          {
            id,
            text: action.text,
            is_completed
          } 
          :
          {
            id,
            text,
            is_completed
          } 
      })
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
  const [is_editable, toggleEdit] = React.useState(false);
  const [is_shown, setIsShown] = React.useState(false);
  return (
    <>
      <AddTodo addTodo={(text) =>  dispatch({type: 'add', text})} />
      <div 
        className='container'
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
      {
        todos.map(({id, text, is_completed}) => {
          return (
            <div key={id} className="row my-2">
              <div className='col-sm-1'>
                <input type="checkbox" id={id} onClick={(e) => {
                  dispatch({type: 'toggle-status', id})
                }}></input>
              </div>
              <div className='col-sm-2'>
                <input 
                  type="text" 
                  disabled={!is_editable}
                  id={id}
                  name={id}
                  value={text}
                  onBlur={(e) => {
                    toggleEdit(false)
                  }}
                  onChange={(e) => {
                    let {value} = e.target;
                    dispatch({type: 'edit', id, text: value})
                  }}
                  className={is_completed ? "c-item-completed": "c-item "}
                />
              </div>
              {
              is_shown &&
                <MoreOptions 
                  className='col-sm-1'
                  onDeleteTask={(e) => {
                    dispatch({type: 'remove', id})
                  }}
                  onEditTask={(e) => {
                    toggleEdit(true)
                  }}
                />
              }
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default ToDo;