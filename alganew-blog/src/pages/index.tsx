import { GetServerSideProps } from 'next'
import { Post, PostService } from 'mauricio.girardi-sdk'

import { FeaturedPost } from '../components/FeaturedPost'
import { ServerResponse } from 'http'

interface HomeProps {
    posts?: Post.Paginated
}

export default function Home(props: HomeProps) {
    const { posts } = props

    return (
        <>
            {posts?.content && <FeaturedPost postSummary={posts.content[0]} />}
        </>
    )
}

function sendToHomePage(res: ServerResponse) {
    res.statusCode = 302
    res.setHeader('Location', '/?page=1')
    return { props: {} }
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query, res }) => {
    const { page: _page } = query
    const page = Number(_page) - 1

    if (isNaN(page) || page < 0) return sendToHomePage(res)

    const posts = await PostService.getAllPosts({ page })

    if (!posts.content?.length) return sendToHomePage(res)

    return {
        props: {
            posts
        }
    }
}
