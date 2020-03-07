import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ filteredTodos, actions }) => {
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const sourceTodo = filteredTodos[result.source.index];
    const destTodo = filteredTodos[result.destination.index];
    actions.reorderTodo(sourceTodo, destTodo);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ul
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={`${todo.id}`} index={index}>
                {(provided, snapshot) => (
                  <TodoItem
                    innerRef={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    key={todo.id}
                    todo={todo}
                    index={index}
                    {...actions}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  actions: PropTypes.object.isRequired
};

export default TodoList;
