import Head from "next/head"

import { ResourceNotFoundError } from "mauricio.girardi-sdk/dist/errors"
import { DiscussionEmbed } from 'disqus-react'
import { GetServerSideProps } from "next"
import { Post, PostService } from "mauricio.girardi-sdk"
import { ParsedUrlQuery } from "querystring"

import { PostHeader } from "components/PostHeader"
import { Markdown } from "components/Markdown"

interface Params extends ParsedUrlQuery {
    id: string
    slug: string
}

interface PostPageProps extends NextPageProps {
    post?: Post.Detailed
    host?: string
}

export default function PostPage({ post, host }: PostPageProps) {
    if (!post) return

    return (
        <>
            <Head>
                <meta property="og:title" content={post.title} />
                <meta property="og:site_name" content="Alganews" />
                <meta property="og:url" content="github.com/mauriciogirardi" />
                <meta property="og:description" content={post.body.slice(0, 54)} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={post.imageUrls.medium} />
                <link
                    rel="canonical"
                    href={`http://${host}/${post.id}/${post.slug}`}
                />
                <title>{post.title}</title>
            </Head>

            <PostHeader
                editor={post.editor}
                createdAt={post.createdAt}
                thumbnail={post.imageUrls.large}
                title={post.title}
            />

            <Markdown>{post.body}</Markdown>

            <DiscussionEmbed
                shortname="alganews-10"
                config={{
                    url: `http://${host}/${post.id}/${post.slug}`,
                    identifier: String(post.id),
                    title: post.title,
                    language: "pt_BR"
                }}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps<PostPageProps, Params> = async ({ params, req }) => {
    try {
        if (!params) return { notFound: true }

        const { id, slug } = params
        const postId = Number(id)

        if (isNaN(postId)) return { notFound: true }

        const post = await PostService.getExistingPost(postId)

        return {
            props: {
                post,
                host: req.headers.host
            }
        }
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return { notFound: true }
        }
        return {
            props: {
                error: {
                    message: err.message,
                    statusCode: err.data?.status || 500
                }
            }

        }
    }
}
