import { node } from 'prop-types';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Markdown } from 'components/Markdown';
import bem from 'utils/bem';
import { Story } from 'stories/Story';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';
import story from './PropsStory.md';
import './PropsStory.scss';

const SectionHeader = ({ className, ...props }) => (
  <header {...filter(props, ElementPropTypes)} className={bem.block(SectionHeader, null, className)} />
);

const SectionHeaderPropTypes = { ...ElementPropTypes };

SectionHeader.propTypes = SectionHeaderPropTypes;
SectionHeader.className = 'SectionHeader';

const Section = ({ header, children, className, ...props }) => (
  <section {...filter(unprefixed(props, 'header'), ElementPropTypes)} className={bem.block(Section)}>
    <SectionHeader {...prefixed(props, 'header')} className={bem.element(Section, 'header')}>
      {header}
    </SectionHeader>
    <div className={bem.element(Section, 'content')}>{children}</div>
  </section>
);

const PropsSectionPropTypes = {
  ...ElementPropTypes,
  header: node.isRequired,
  ...prefixBy('header', SectionHeaderPropTypes)
};

Section.className = 'Section';
Section.propTypes = PropsSectionPropTypes;

// noinspection RequiredAttributes, HtmlUnknownAttribute
const PropsStory = () => (
  <Story className={bem.block(PropsStory)}>
    <Markdown source={story} />

    <Section
      header="Header"
      header-style={{ color: 'red' }}
      className={bem.element(PropsStory, 'section')}
      style={{ borderColor: 'red' }}
    >
      <Markdown>{`\`\`\`jsx
<Section header='Header' header-style={{ color: 'red' }} style={{ borderColor: 'red' }}>...</Section>
\`\`\``}</Markdown>
    </Section>
  </Story>
);

PropsStory.className = 'PropsStory';

export default storiesOf('utils', module).add('props', () => <PropsStory />);
