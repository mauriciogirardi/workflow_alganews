import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from 'app/components/Input';

export default {
    title: 'Components/Input',
    component: Input,

} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const WithPlacehlder = Template.bind({});
WithPlacehlder.args = {
    placeholder: 'e.g: Jon Doe'
};

export const WithLabelAndContent = Template.bind({});
WithLabelAndContent.args = {
    placeholder: 'e.g: Jon Doe',
    label: 'Name',
    value: 'Jon Doe'
};

export const WithLabelAndPlacehlder = Template.bind({});
WithLabelAndPlacehlder.args = {
    placeholder: 'e.g: Jon Doe',
    label: 'Name',
};

export const WithContent = Template.bind({});
WithContent.args = {
    value: 'Jon Doe'
};
