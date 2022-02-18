import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from 'app/components/Button';

export default {
    title: 'Components/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    variant: 'primary',
    label: 'resetar senha',
};

export const Danger = Template.bind({});
Danger.args = {
    variant: 'danger',
    label: 'resetar senha',
};

export const Text = Template.bind({});
Text.args = {
    variant: 'text',
    label: 'resetar senha',
};

export const Disabled = Template.bind({});
Disabled.args = {
    variant: 'primary',
    label: 'resetar senha',
    disabled: true
};
