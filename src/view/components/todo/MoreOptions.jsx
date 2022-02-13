import { Dropdown } from 'react-bootstrap';

const EditTask = ({onDeleteTask, onEditTask, className}) => {
  return (
  <Dropdown bsPrefix={className}>
    <Dropdown.Toggle id="dropdown-basic" bsPrefix="c-more-options">
      ...
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={onDeleteTask}>
        Delete Task
      </Dropdown.Item>
      <Dropdown.Item onClick={onEditTask}>
        Edit Task
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default EditTask