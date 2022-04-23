import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SessionController } from 'app/components/SessionController';

export default {
    title: 'Components/SessionController',
    component: SessionController,
    argTypes: {
        onLogout: {
            action: 'logout',
        },
    },
} as ComponentMeta<typeof SessionController>;

const Template: ComponentStory<typeof SessionController> = args => (
    <SessionController />
);

export const Default = Template.bind({});
Default.args = {};
