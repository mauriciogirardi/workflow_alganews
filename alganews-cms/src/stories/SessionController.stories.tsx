import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SessionController } from 'app/components/SessionController';

export default {
    title: 'Components/SessionController',
    component: SessionController,
    argTypes: {
        onLogout: {
            action: 'logout'
        }
    }
} as ComponentMeta<typeof SessionController>;

const Template: ComponentStory<typeof SessionController> = (args) => <SessionController {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Cristiano Moreira Silvano',
    description: 'editor há 2 anos.',
    url: 'https://avatars.githubusercontent.com/u/51093343?v=4',
};
