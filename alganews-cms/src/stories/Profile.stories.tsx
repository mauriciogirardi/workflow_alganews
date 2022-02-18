import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Profile } from 'app/components/Profile';

export default {
    title: 'Components/Profile',
    component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Mauricio Girardi',
    description: 'criador de conteúdo há 3 anos.',
    url: 'https://avatars.githubusercontent.com/u/51093343?v=4',
};
