import ReactMarkdown, { Components } from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import * as S from './styles'

interface MarkdownProps {
    children: string
}

const components: Components = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={okaidia}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

export const Markdown = ({ children }: MarkdownProps) => {
    return (
        <S.Container>
            <ReactMarkdown
                className="markdownRenderer"
                remarkPlugins={[gfm]}
                components={components}
            >
                {children}
            </ReactMarkdown>
        </S.Container>
    )
}
