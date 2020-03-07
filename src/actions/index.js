import * as types from '../constants/ActionTypes';

export const addTodo = text => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const maxId = todos.reduce((acc, todo) => Math.max(acc, todo.id), 0);
  const newTodo = {
    text,
    id: maxId + 1,
    completed: false
  };
  todos.unshift(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.ADD_TODO, text };
};

export const deleteTodo = id => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.DELETE_TODO, id };
};
export const editTodo = (id, text, index) => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos[index].text = text;
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.EDIT_TODO, id, text };
};
export const completeTodo = id => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  return { type: types.COMPLETE_TODO, id };
};
export const completeAllTodos = () => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const areAllMarked = todos.every(todo => todo.completed);
  let updatedTodos = todos.map(todo => ({ ...todo, completed: !areAllMarked }));
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  return { type: types.COMPLETE_ALL_TODOS };
};
export const clearCompleted = () => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.completed === false);
  localStorage.setItem('todos', JSON.stringify(todos));
  return { type: types.CLEAR_COMPLETED };
};
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
export const reorderTodo = result => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todo] = todos.splice(result.source.index, 1);
  todos.splice(result.destination.index, 0, todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  return {
    type: types.REORDER_TODO,
    sourceIndex: result.source.index,
    destIndex: result.destination.index
  };
};
