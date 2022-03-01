import { ResourceNotFoundError } from "mauricio.girardi-sdk/dist/errors"
import { GetServerSideProps } from "next"
import { Post, PostService } from "mauricio.girardi-sdk"
import { ParsedUrlQuery } from "querystring"
import Head from "next/head"
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
                <link
                    rel="canonical"
                    href={`http://${host}/${post.id}/${post.slug}`}
                />
            </Head>

            <PostHeader
                editor={post.editor}
                createdAt={post.createdAt}
                thumbnail={post.imageUrls.large}
                title={post.title}
            />

            <Markdown>{post.body}</Markdown>
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
