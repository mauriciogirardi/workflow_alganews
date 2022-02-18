import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProgressBar } from 'app/components/ProgressBar'

export default {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    argTypes: {
        progress: {
            control: {
                type: 'range',
                min: 0,
                max: 100,
            }
        }
    }
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Javascript',
    progress: 80
};

export const Secondary = Template.bind({});
Secondary.args = {
    title: 'C++',
    progress: 40,
    theme: 'secondary',
    width: 280,
};

export const Complete = Template.bind({});
Complete.args = {
    title: 'Python',
    progress: 100,
    theme: 'secondary',
    width: 280,
};

export const ZeroProgress = Template.bind({});
ZeroProgress.args = {
    title: 'Java',
    progress: 0,
    theme: 'secondary',
    width: 280,
};

export const ProgressInHalfOfText = Template.bind({});
ProgressInHalfOfText.args = {
    title: 'CSS',
    progress: 11,
    theme: 'secondary',
    width: 280,
};
