import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MarkdownEditor } from 'app/components/MarkdownEditor';

export default {
    title: 'Components/MarkdownEditor',
    component: MarkdownEditor,
} as ComponentMeta<typeof MarkdownEditor>;

const Template: ComponentStory<typeof MarkdownEditor> = (args) => <MarkdownEditor {...args} />;

export const Default = Template.bind({});
Default.args = {

};
