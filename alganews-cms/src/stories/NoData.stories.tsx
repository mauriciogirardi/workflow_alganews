import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NoData } from 'app/components/NoData';

export default {
    title: 'Components/NoData',
    component: NoData,
} as ComponentMeta<typeof NoData>;

const Template: ComponentStory<typeof NoData> = (args) => <NoData {...args} />;

export const Default = Template.bind({});

export const FixedHeight = Template.bind({});
FixedHeight.args = {
    height: 250,
}
