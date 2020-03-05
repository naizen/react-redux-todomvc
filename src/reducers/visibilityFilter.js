import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes';
import { SHOW_ACTIVE } from '../constants/TodoFilters';

const visibilityFilter = (state = SHOW_ACTIVE, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
