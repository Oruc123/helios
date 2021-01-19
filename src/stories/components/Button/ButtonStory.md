## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { Button } from 'components/Button';

render(<Button btnText="Add new" />, document.getElementById('app'));
```

### Customization

```js
import React from 'react';
import { render } from 'react-dom';
import { Button } from 'components/Button';

// type: 'default', 'primary', 'icon'
render(<Button btnText="Add new" type="icon" onClick={() => {}} />, document.getElementById('app'));

// size: 'small', 'medium', 'large'
render(<Button btnText="Add new" size="small" onClick={() => {}} />, document.getElementById('app'));

// disabled btn
render(<Button btnText="Add new" disable onClick={() => {}} />, document.getElementById('app'));

// use all props btn
render(
  <Button
    type="primary"
    htmlType="submit"
    size="small"
    btnText="Add new"
    disable
    onClick={() => {}}
    onMouseLeave={() => {}}
    onFocus={() => {}}
    onMouseEnter={() => {}}
  />,
  document.getElementById('app')
);
```

## Examples

```js
import React from 'react';
import { render } from 'react-dom';
import { Button } from 'components/Button';

render(
  <Button
    type="primary"
    htmlType="submit"
    size="small"
    btnText="Add new"
    disable
    onClick={() => {}}
    onMouseLeave={() => {}}
    onFocus={() => {}}
    onMouseEnter={() => {}}
  />,
  document.getElementById('app')
);
```
