import { GetServerSideProps } from 'next'
import { Post, PostService } from 'mauricio.girardi-sdk'

import { FeaturedPost } from '../components/FeaturedPost'
import { ServerResponse } from 'http'
import { PostCard } from 'components/PostCard'

import * as S from '../styles/HomeStyles'

interface HomeProps {
    posts?: Post.Paginated
}

export default function Home(props: HomeProps) {
    const { posts } = props

    return (
        <S.PageGrid>
            {posts?.content && <FeaturedPost postSummary={posts.content[0]} />}

            <S.PostGrid>
                {posts?.content?.slice(1).map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </S.PostGrid>
        </S.PageGrid>
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
