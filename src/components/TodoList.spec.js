import React from 'react'
import renderer from 'react-test-renderer'
import TodoList from './TodoList'

const props = {
  filteredTodos: [
    {
      text: 'Use Redux',
      completed: false,
      id: 0
    },
    {
      text: 'Run the tests',
      completed: true,
      id: 1
    }
  ],
  actions: {
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn(),
    completeAll: jest.fn(),
    clearCompleted: jest.fn(),
    reorderTodo: jest.fn()
  }
}

describe('components', () => {
  describe('TodoList', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<TodoList {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
