import { Post, PostService } from "mauricio.girardi-sdk"
import { ResourceNotFoundError } from "mauricio.girardi-sdk/dist/errors"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"

interface Params extends ParsedUrlQuery {
    id: string
}

interface PostPageProps extends NextPageProps {
    post?: Post.Detailed
}

export default function PostPage({ post }: PostPageProps) {
    return (
        <>
            <h1>{post?.title}</h1>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<PostPageProps, Params> = async ({ params, res }) => {
    try {
        if (!params) return { notFound: true }

        const { id } = params
        const postId = Number(id)

        if (isNaN(postId)) return { notFound: true }

        const post = await PostService.getExistingPost(postId)

        return {
            props: {
                post,
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
