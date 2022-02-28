import { GetServerSideProps } from 'next'
import { Post, PostService } from 'mauricio.girardi-sdk'

import { sendToHomePage } from 'utils/sendToHomePage'
import { FeaturedPost } from 'components/FeaturedPost'
import { PostCard } from 'components/PostCard'
import { Paginate } from 'components/Paginate'

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

            <Paginate totalPages={posts?.totalPages || 0} />
        </S.PageGrid>
    )
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
