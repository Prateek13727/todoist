// const { connect, Provider } = ReactRedux;

//Helper functions
const getVisibleTodos = (todos, visibilityFilter) => {
  switch(visibilityFilter){
      case 'ACTIVE':
          return todos.filter(todo => !todo.completed)
      case 'COMPLETED':
          return todos.filter(todo => todo.completed)
      default:
          return todos
  }
}

//action creators
const setVisibiliyFilter = (filter) => {
  return {
      type: 'SET_VISIBILITY_FILTER',
      filter
  }
}

const toggleTodo = (id) => {
  return {
      type: 'TOGGLE_TODO',
      id,
  }
}


let noteId = 0;

//AddToDo component
let  AddToDo = ({ dispatch }) => {
  let input;
  return <div> 
      <input ref = { node => {
          input = node;
      }}>
      </input>
      <button onClick = {() => {
              dispatch({
                  id: noteId++,
                  text: input.value,
                  type: 'ADD_TODO'
              })
          }}>
      ADD TODO
      </button>
  </div>
}

AddToDo = connect()(AddToDo);

//VisibleTodosList and its associated component definition
//To Do component definition
const ToDo = ({
  text, 
  completed,
  onClick 
}) => {
  return  <li 
      onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : 'none'}}
  >
      {text}
  </li>
}

//ToDoList component definition
const ToDoList = ({
  todoList,
  onTodoClick
}) => {
return <ul>
  {
      todoList.map(todo => 
          <ToDo 
              key={todo.id}
              {...todo}
              onClick={() => {
                  onTodoClick(todo.id)
              }}
          />
      )
  }
</ul>
}


//VisibleTodosList component definition without Connnect HOC//

class VisibleTodosList extends React.Component {
  componentWillMount(){
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => 
          this.forceUpdate()
      );
  }
  componentWillUnmount(){
      this.unsubscribe();
  }
  render() {
      const { store } = this.context;
      const state = store.getState();
      return <ToDoList 
          todoList={
              getVisibleTodos(state.todos, state.visibilityFilter)
          }
          onTodoClick={id => {
              store.dispatch({
                  id,
                  type: 'TOGGLE_TODO'
              })
          }}
      />
  }
}

VisibleTodosList.contextTypes = {
  store: PropTypes.object
};


//VisibleTodosList component definition
const mapStateToProps = (state) => {
  return {
      todoList: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onTodoClick: (id) => {
          dispatch(toggleTodo(id))
      }
  }
}

const VisibleTodosList = connect(mapStateToProps, mapDispatchToProps)(ToDoList)

//Footer component and its dependent component definition

//Link component - pure presentational component
const Link = ({
  active, 
  onClick, 
  children
}) => {
if(active){
  return <span>{children}</span>
}
return <a href='#' onClick={(e) => {
      e.preventDefault();
      onClick();
  }}>
  {children}
</a> 
}

//Filter Link component without connect component//
/*
class FilterLink extends React.Component {
  componentDidMount(){
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => 
          this.forceUpdate()
      );
  }
  componentWillUnmount(){
      this.unsubscribe();
  }
  render() {
      const { store } = this.context;
      const state = store.getState();
      const props = this.props;
      return <Link
          active={state.filter === props.filter}
          onClick={() => {
              store.dispatch({
                  type: 'SET_VISIBILITY_FILTER',
                  filter: props.filter
              })
          }}
      >
          {props.children}
      </Link>
  } 
}

FilterLink.contextTypes = {
  store: PropTypes.object
};
*/

//Filter Link component definition
const mapStateToLinkProps = (state, ownProps) => {
  return {
      active: state.filter === ownProps.filter
  }
}

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
      onClick: () => {
          dispatch(setVisibiliyFilter(ownProps.filter))
      }
  }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

// Footer component definition
const Footer = () => {
  return <div>     
      Show:
      { " "}
      <FilterLink filter='SHOW_ALL'>
          All
      </FilterLink>
      { " "}
      <FilterLink filter='ACTIVE' >
          Active
      </FilterLink>
      { " "}
      <FilterLink filter='COMPLETED'>
          Completed
      </FilterLink>
  </div>
}


const ToDoApp = ({visibilityFilter, todos }) => {
  const visibleTodos = getVisibleTodos(todos, visibilityFilter);
  return <div>
      <AddToDo />
      <VisibleTodosList />
      <Footer />
  </div>
}

const createStore = (reducer) => {
  let state;
  let listners = [];

  const getState = () => state;

  const dispatch = (action) => {
      state = reducer(state, action)
      listners.forEach(listner => listner())
  }

  const subscribe = (listner) => {
      listners.push(listner);
      return () => {
          listners = listners.filter(l => l !== listner)
      }
  }

 //when an action is dispatched the store calls the reducer it was created with passing
 // the current state, and action as arguments
  dispatch({});

  return { getState, dispatch, subscribe }
}

// when an action is dispatched the store calls the reducer it was created with passing
// the current state, and action as arguments

// mimicing combine reducers and creating global state //

/*
const todosApp = (state, action) => {
  return  {
      todos: todos(state.todos, action),
      visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
*/

const combinedReducers = (reducers) => {
  return(state={}, action) => {
      return Object.keys(reducers).reduce((nextState, key) => {
          nextState[key] = reducers[key](state[key], action);
          return nextState
      }, {});
  };
};

//reducer-1 helper
const todo = (state, action) => {
  switch(action.type){
      case 'ADD_TODO':
          return {
              text: action.text,
              id: action.id,
              completed: false
          }
      case 'TOGGLE_TODO':
          return Object.assign({}, state, {
              completed: !state.completed
          })
  }
}

//reducer-1
const todos = (state=[], action) => {
  switch(action.type){
      case 'ADD_TODO':
          return [
              ...state,
              todo(undefined, action)
          ]
      case 'TOGGLE_TODO':
          return state.map((obj) => {
              if(obj.id !== action.id){
                  return obj;
              }
              return todo(obj, action)
          })
      default:
          return state
  }
}

//reducer-2
const visibilityFilter = (state='SHOW_ALL', action) => {
  switch(action.type){
      case 'SET_VISIBILITY_FILTER':
          return action.filter
      default:
          return state
  }   
}

//root reducer - return reducer object for initializing create-store
const todoApp = combinedReducers({
  todos,
  visibilityFilter
})

const storeGlobal = createStore(todoApp);

// Provider Implementation //

class Provider extends React.Component {
  getChildContext(){
      return {
          store: this.props.store
      };
  }

  render(){
      return this.props.children
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
}


const render = () => {
  ReactDOM.render(
  <Provider store={storeGlobal}>
      <ToDoApp />
  </Provider>, document.getElementById('root'))
}

storeGlobal.subscribe(render);

render();


const debugReduxState = (store) => {
  console.log('Initial state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching ADD_TODO.')
  store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');

  console.log('Dispatching SET_VISIBILITY_FILTER');
  store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  });

  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');
}
