# Date and Time

---

## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { dateFormat } from 'utils/moment';

render(<div>{dateFormat()}</div>, document.getElementById('app'));
```

### Date Format

```js
import React from 'react';
import { render } from 'react-dom';
import { dateFormat } from 'utils/moment';

render(<div>{dateFormat()}</div>, document.getElementById('app'));
```

### Time format

```js
import React from 'react';
import { render } from 'react-dom';
import { timeFormat } from 'utils/moment';

render(<div>{timeFormat()}</div>, document.getElementById('app'));
```

### Full time format

```js
import React from 'react';
import { render } from 'react-dom';
import { fullTimeFormat } from 'utils/moment';

render(<div>{fullTimeFormat()}</div>, document.getElementById('app'));
```
