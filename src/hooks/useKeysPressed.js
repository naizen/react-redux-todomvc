import { useState, useEffect } from 'react';

export default function useKeysPressed(
  keys = [],
  downHandlerFn = () => {},
  enableDownHandler = false
) {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  function areKeysPressed() {
    const required = new Set(keys);
    for (var elem of keysPressed) {
      required.delete(elem);
    }
    return required.size === 0;
  }

  function downHandler({ key }) {
    setKeyPressed(keysPressed.add(key));
    //const arePressed = areKeysPressed();
    //console.log('areKeysPressed: ', arePressed);
    //console.log('enableDownHandler: ', enableDownHandler);
    //if (areKeysPressed() && enableDownHandler) {
    //  downHandlerFn();
    //}
  }

  const upHandler = ({ key }) => {
    keysPressed.delete(key);
    setKeyPressed(keysPressed);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keysPressed;
}
