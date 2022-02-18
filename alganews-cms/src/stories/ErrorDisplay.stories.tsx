import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ErrorDisplay } from 'app/components/ErrorDisplay';

export default {
    title: 'Components/ErrorDisplay',
    component: ErrorDisplay,
} as ComponentMeta<typeof ErrorDisplay>;

const Template: ComponentStory<typeof ErrorDisplay> = (args) => <ErrorDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Erro ao renderizar',
    message: 'Erro com o servidor',
    sizeIcon: false
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
    title: 'Erro ao buscar o dados'
};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
    message: 'Message de erro'
};

export const Small = Template.bind({});
Small.args = {
    sizeIcon: true
};
