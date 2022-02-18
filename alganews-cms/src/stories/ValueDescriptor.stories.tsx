import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ValueDescriptor } from 'app/components/ValueDescriptor'

export default {
    title: 'Components/ValueDescriptor',
    component: ValueDescriptor,
    // argTypes: {
    //     backgroundColor: { control: 'color' }
    // }
} as ComponentMeta<typeof ValueDescriptor>

const Template: ComponentStory<typeof ValueDescriptor> = (args) => <ValueDescriptor {...args} />

export const Default = Template.bind({});
Default.args = {
    value: 560332.62,
    description: 'Ganhos na semana'
};

export const DefaultCurrency = Template.bind({});
DefaultCurrency.args = {
    value: 560332.62,
    description: 'Ganhos na semana',
    isCurrency: true,
};

export const Primary = Template.bind({});
Primary.args = {
    value: 560332.62,
    description: 'Ganhos na semana',
    color: 'primary'
};

export const PrimaryCurrency = Template.bind({});
PrimaryCurrency.args = {
    value: 560332.62,
    description: 'Ganhos na semana',
    isCurrency: true,
    color: 'primary'
};
