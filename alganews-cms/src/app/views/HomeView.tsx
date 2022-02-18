import { DefaultLayout } from "app/layouts/Default";
import { usePageTitle } from "core/hooks/usePageTitle";

import UsePerformance from "app/features/UsePerformance";
import UserEarnings from "app/features/UserEarnings";
import UserTopTags from "app/features/UserTopTags";
import PostList from "app/features/PostList";

import * as S from './styles'

export default function HomeView() {
    usePageTitle('Home')

    return (
        <DefaultLayout>
            <S.Wrapper>
                <UserTopTags />
                <UserEarnings />
            </S.Wrapper>

            <UsePerformance />
            <PostList />
        </DefaultLayout>
    )
}
