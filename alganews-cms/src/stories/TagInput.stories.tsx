import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TagInput } from 'app/components/TagInput';
import { useState } from 'react';
import { Tag } from 'react-tag-input';

export default {
    title: 'Components/TagInput',
    component: TagInput,
} as ComponentMeta<typeof TagInput>;

const Template: ComponentStory<typeof TagInput> = (args) =>
    <div>
        <TagInput {...args} />
    </div>
    ;

export const Default = Template.bind({});
Default.args = {
    tags: [{ id: '1', text: 'JavaScript' }],
    placeholder: 'Insira as tags deste post'
};

export const VariousTags = Template.bind({});
VariousTags.args = {
    tags: [
        { id: '1', text: 'JavaScript' },
        { id: '2', text: 'C++' },
        { id: '3', text: 'Java' },
        { id: '4', text: 'CSS' },
        { id: '5', text: 'Python' },
        { id: '6', text: 'TypeScript' },
        { id: '6', text: 'Ruby on Rails' },
    ],
    placeholder: 'Insira as tags deste post'
};

export function WorkingLiveExample() {
    const [tags, setTags] = useState<Tag[]>([])

    const onAdd = (tag: Tag) => {
        setTags(prevState => [...prevState, tag])
    }

    const onDelete = (index: number) => {
        const findIndex = tags.filter((tag, i) => i !== index)
        setTags(findIndex)
    }

    return <TagInput
        placeholder='Insira as tags deste post'
        onDelete={(index) => onDelete(index)}
        onAdd={(tag) => onAdd(tag)}
        tags={tags}
    />
}
