import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip } from 'app/components/Tooltip';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
    content: 'Hello',
    children: <h1>Homer me</h1>
};

