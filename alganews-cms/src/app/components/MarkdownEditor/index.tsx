import MarkdownIt from 'markdown-it'
import MdEditor, { Plugins } from 'react-markdown-editor-lite'

import 'react-markdown-editor-lite/lib/index.css'
import { FileService } from 'sdk/services/FileService'

MdEditor.unuse(Plugins.FontUnderline)

const parser = new MarkdownIt()

const defaultRender = parser.renderer.rules.link_open ||
    function (tokens: any, idx: any, options: any, env: any, self: any) {
        return self.renderToken(tokens, idx, options);
    };

parser.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    var aIndex = tokens[idx].attrIndex('target');
    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
    } else {
        //@ts-ignore
        tokens[idx].attrs[aIndex][1] = '_blank';
    }
    return defaultRender(tokens, idx, options, env, self);
};

type MarkdownEditorProps = {
    onChange?: (text: string) => void
    value?: string
    readyOnly?: boolean
}

export const MarkdownEditor = ({ onChange, value, readyOnly }: MarkdownEditorProps) => {
    const height = readyOnly ? 'auto' : 300
    const canReadyOnly = readyOnly ? { menu: false, md: false, html: true } : undefined

    const handleImageUpload = async (file: File) => FileService.upload(file)

    return (
        <MdEditor
            renderHTML={text => parser.render(text)}
            onChange={({ text }) => onChange && onChange(text)}
            onImageUpload={handleImageUpload}
            readOnly={readyOnly}
            style={{ height, width: '100%' }}
            value={value}
            view={canReadyOnly}
            config={{ view: { html: false } }}
        />
    )
}
