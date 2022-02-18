import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircleChart } from 'app/components/CircleChart';

export default {
    title: 'Components/CircleChart',
    component: CircleChart,
    argTypes: {
        progress: {
            control: {
                type: 'range',
                min: 0,
                max: 100,
            }
        }
    }
} as ComponentMeta<typeof CircleChart>;

const Template: ComponentStory<typeof CircleChart> = (args) => <CircleChart {...args} />;

export const Default = Template.bind({});
Default.args = {
    progress: 80,
    size: 100,
    theme: 'primary',
    caption: 'Web',
};
