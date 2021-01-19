# Movable

---

Class to create movable components

```js
import React from 'react';

import bem from 'modules/bem';
import { Movable } from 'components/Movable';

class MovableArea extends PureComponent {
  static className = 'MovableArea';

  handleRef = createRef();

  render() {
    const { handleRef } = this;

    return (
      <div className={bem.block(MovableStory)}>
        <Markdown source={story} />

        <div className={bem.element(MovableStory, 'moveArea')}>
          <Movable direction={Movable.HORIZONTAL} handleRef={handleRef}>
            <div className={bem.element(MovableStory, 'movable')}>
              <div ref={handleRef} className={bem.element(MovableStory, 'movableHeader')}>
                Drag
              </div>
              <div className={bem.element(MovableStory, 'movableContent')}>
                Movable
              </div>
            </div>
          </Movable>
        </div>
      </Story>
    );
  }
}

```
