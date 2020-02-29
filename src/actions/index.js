import * as types from '../constants/ActionTypes';

export const addTodo = text => {
  let todos = JSON.parse(localStorage.getItem('todos'));
  const maxId = todos.reduce((acc, todo) => Math.max(acc, todo.id), 0);
  const newTodo = {
    text,
    id: maxId + 1,
    completed: false
  };
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.ADD_TODO, text };
};

export const deleteTodo = id => {
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.DELETE_TODO, id };
};
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => {
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter(todo => todo.completed !== false);
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.CLEAR_COMPLETED };
};
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
export const reorderTodo = result => ({
  type: types.REORDER_TODO,
  sourceIndex: result.source.index,
  destinationIndex: result.destination.index
});
