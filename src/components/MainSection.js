import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodoList';

function MainSection({
  todosCount,
  completedCount,
  actions,
  canUndo,
  canRedo
}) {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  function areKeysPressed(keys = [], keysPressed = []) {
    const required = new Set(keys);
    for (var elem of keysPressed) {
      required.delete(elem);
    }
    return required.size === 0;
  }

  useEffect(() => {
    function downHandler({ key }) {
      setKeyPressed(keysPressed.add(key));
      const undoPressed = areKeysPressed(['Meta', 'z'], keysPressed);
      const redoPressed = areKeysPressed(['Meta', 'z', 'Shift'], keysPressed);
      if (undoPressed && canUndo) {
        actions.undo();
      } else if (redoPressed && canRedo) {
        actions.redo();
      }
    }

    function upHandler({ key }) {
      keysPressed.delete(key);
      setKeyPressed(keysPressed);
    }

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keysPressed, canUndo, canRedo]);

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={actions.completeAllTodos} />
        </span>
      )}
      <VisibleTodoList />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
        />
      )}
    </section>
  );
}

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
