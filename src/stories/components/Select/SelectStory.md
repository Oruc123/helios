# Select

---

## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { Select } from 'components/Select';

render(<Select dataSource={[]} label="Test" />, document.getElementById('app'));
```

### Props

- **dataSource** `{ array }` Default `[]`
- **label** `{ string }` Default `""`

### Customization

```js
import React from 'react';
import { render } from 'react-dom';
import { Select } from 'components/Select';

render(<Select dataSource={[]} />, document.getElementById('app'));
```

## Examples

```js
import React from 'react';
import { render } from 'react-dom';
import { Select } from 'components/Select';

render(<Select dataSource={[]} />, document.getElementById('app'));
```
