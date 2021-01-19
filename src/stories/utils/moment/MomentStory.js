import React from 'react';
import { storiesOf } from '@storybook/react';

import { Markdown } from 'components/Markdown';
import bem from 'utils/bem';
import { Story } from 'stories/Story';
import { dateFormat, timeFormat, fullTimeFormat } from 'utils/moment';
import story from './MomentStory.md';
import './MomentStory.scss';

const MomentStory = () => (
  <Story className={bem.block(MomentStory)}>
    <Markdown source={story} />
    <div className={bem.element(MomentStory, 'example')}>
      <div className={bem.element(MomentStory, 'exampleItem')}>
        Date format
        <div>{dateFormat()}</div>
        <div>{dateFormat('2017/12/23')}</div>
      </div>
      <div className={bem.element(MomentStory, 'exampleItem')}>
        Time format
        <div>{timeFormat()}</div>
        <div>{timeFormat('2017/12/23')}</div>
      </div>
      <div className={bem.element(MomentStory, 'exampleItem')}>
        Full time format
        <div>{fullTimeFormat()}</div>
        <div>{fullTimeFormat('2019/07/19')}</div>
      </div>
    </div>
  </Story>
);

MomentStory.className = 'MomentStory';

export default storiesOf('utils', module).add('moment', () => <MomentStory />);
