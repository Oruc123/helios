# Sprite

---

## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { Sprite } from 'components/Sprite';

render(<Sprite type="envelope" />, document.getElementById('app'));
```

### Props

- **type** `{ string }` File name of sprite from `/src/sprites/`
- Any HTML prop

### Customization

```js
import React from 'react';
import { render } from 'react-dom';
import { Sprite } from 'components/Sprite';

// Size
render(
  <Sprite type="envelope" style={{ width: 48, height: 48 }} />,
  document.getElementById('app')
);

// Primary color
render(
  <Sprite type="users" style={{ fill: 'red' }} />,
  document.getElementById('app')
);

// Primary color / Secondary color
render(
  <Sprite type="group" style={{ fill: 'lightgreen', color: 'green' }} />,
  document.getElementById('app')
);
```

## Examples
