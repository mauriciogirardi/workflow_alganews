import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WordPriceCounter } from 'app/components/WordPriceCounter';

export default {
    title: 'Components/WordPriceCounter',
    component: WordPriceCounter,
} as ComponentMeta<typeof WordPriceCounter>;

const Template: ComponentStory<typeof WordPriceCounter> = (args) => <WordPriceCounter {...args} />;

export const Default = Template.bind({});
Default.args = {
    pricePerWord: 0.25,
    wordsCount: 20
};
