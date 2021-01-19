# props

---

## filter(props: Object, include: Object): Object

Returns an object which contains only truthy properties from `include`.
By default data-\* and aria-\* properties are included in the result. To exclude them see example below.

```js
import { aria, filter, data } from 'utils/props';

filter({ foo: 1, bar: 2 }, { foo: true, bar: false }); // { foo: 1 }
filter({ foo: 1, bar: 2, 'data-foo': 3, 'aria-bar': 4 }, { foo: true }); // { foo: 1, 'data-foo': 3, 'aria-bar': 4 }

// Exclude data-\* and aria-\* props
filter({ foo: 1, bar: 2, 'data-foo': 3, 'aria-bar': 4 }, { foo: true, [data]: false, [aria]: false }); // { foo: 1 }
```

## prefixBy(prefix: string, props: Object): Object

Adds the specified prefix to the provided props or prop types.

```js
import { prefixBy } from 'utils/props';

prefixBy('ted', { foo: 1, bar: 2 }); // { 'ted-foo': 1, 'ted-bar': 2 }
```

## prefixed(props: Object, prefix: string): Object

Returns an object which contains only properties with the specified prefix (removes prefix from result).

```js
import { prefixed } from 'utils/props';

prefixed({ 'ted-foo': 1, 'ted-bar': 2 }, 'ted'); // { foo: 1, bar: 2 }
```

## unprefixed(props: Object, ...prefixes: string[]): Object

Returns an object which contains properties without the specified prefixes.

```js
import { unprefixed } from 'utils/props';

unprefixed({ 'ted-foo': 1, 'ted-bar': 2, baz: 3 }, 'ted'); // { baz: 3 }
```

### Example

```js
import React from 'react';

import bem from 'modules/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';
import './Props.scss';

// Section Header
const SectionHeader = ({ className, ...props }) => (
  <header {...filter(props, ElementPropTypes)} className={bem.block(SectionHeader, null, className)} />
);

// SectionHeader supports any of Element props
const SectionHeaderPropTypes = { ...ElementPropTypes };

SectionHeader.propTypes = SectionHeaderPropTypes;
SectionHeader.className = 'SectionHeader';

// Section
const Section = ({ header, children, className, ...props }) => (
  <section {...filter(unprefixed(props, 'header'), ElementPropTypes)} className={bem.block(Section)}>
    <SectionHeader {...prefixed(props, 'header')} className={bem.element(Section, 'header')}>
      {header}
    </SectionHeader>
    <div className={bem.element(Section, 'content')}>{children}</div>
  </section>
);

// Section supports any of Element props as well as `header` and any of `header-*` props.
const SectionPropTypes = {
  ...ElementPropTypes,
  header: node.isRequired,
  ...prefixBy('header', SectionHeaderPropTypes)
};

Section.className = 'Section';
Section.propTypes = SectionPropTypes;
```
