import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Paragraph } from 'app/components/Typography/Paragraph';

export default {
    title: 'Typography/Paragraph',
    component: Paragraph,
} as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = (args) => <Paragraph {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 'default',
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea assumenda delectus optio esse, maiores, nemo, laudantium corporis architecto nesciunt nulla voluptatem in expedita omnis amet explicabo unde consequatur enim?'
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea assumenda delectus optio esse, maiores, nemo, laudantium corporis architecto nesciunt nulla voluptatem in expedita omnis amet explicabo unde consequatur enim?'
};
