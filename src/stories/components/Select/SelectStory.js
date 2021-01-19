import React from 'react';
import { storiesOf } from '@storybook/react';

import { Markdown } from 'components/Markdown';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { Story } from 'stories/Story';

import story from './SelectStory.md';
import './SelectStory.scss';

const dataSource = [{ label: 'True', value: 1 }, { label: 'False', value: 0 }];
const dataSource1 = [{ label: 'Alexander', value: '1' }, { label: 'Evgeny', value: '2' }];

function onChange(v) {
  console.log('onChange', v);
}

const SelectStory = () => (
  <Story className={bem.block(SelectStory)}>
    <Markdown source={story} />
    <div className={bem.element(SelectStory, 'example')}>
      <div className={bem.element(SelectStory, 'exampleItem')}>
        without label
        <Select dataSource={dataSource1} onChange={onChange} />
      </div>
      <div className={bem.element(SelectStory, 'exampleItem')}>
        with label
        <Select defaultValue={dataSource[0].value} label="Field name" dataSource={dataSource} onChange={onChange} />
      </div>
      <div className={bem.element(SelectStory, 'exampleItem')}>
        loading
        <Select loading defaultValue={dataSource[0].value} dataSource={dataSource1} onChange={onChange} />
      </div>
      <div className={bem.element(SelectStory, 'exampleItem')}>
        disabled
        <Select
          disabled
          defaultValue={dataSource[0].value}
          label="Field name"
          dataSource={dataSource}
          onChange={onChange}
        />
      </div>
    </div>
    <div className={bem.element(SelectStory, 'example')}>
      <div className={bem.element(SelectStory, 'exampleItem')}>
        multiple mode
        <Select
          mode="multiple"
          placeholder="Please select"
          defaultValue={[dataSource1[0].value, dataSource1[1].value]}
          dataSource={dataSource1}
          onChange={onChange}
        />
      </div>
      <div className={bem.element(SelectStory, 'exampleItem')}>
        tags mode
        <Select
          mode="tags"
          label="Field name"
          placeholder="Please select"
          dataSource={dataSource1}
          onChange={onChange}
        />
      </div>
    </div>
  </Story>
);

SelectStory.className = 'SelectStory';

export default storiesOf('components', module).add('Select', () => <SelectStory />);
