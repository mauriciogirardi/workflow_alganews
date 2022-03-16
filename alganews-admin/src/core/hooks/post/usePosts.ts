import { Post, PostService } from 'mauricio.girardi-sdk';
import { useCallback, useState } from 'react';

export const usePosts = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [posts, setPosts] = useState<Post.Paginated>();

  const fetchUserPosts = useCallback(
    async (userId: number, page = 0) => {
      try {
        setIsFetching(true);
        const posts = await PostService.getAllPosts({
          editorId: userId,
          showAll: true,
          page,
          size: 8,
        });
        setPosts(posts);
      } finally {
        setIsFetching(false);
      }
    },
    [],
  );

  const togglePostStatus = useCallback(
    async (post: Post.Summary | Post.Detailed) => {
      setLoadingToggle(true);
      try {
        post.published
          ? await PostService.deactivateExistingPost(
              post.id,
            )
          : await PostService.publishExistingPost(post.id);
      } finally {
        setLoadingToggle(false);
      }
    },
    [],
  );

  return {
    togglePostStatus,
    fetchUserPosts,
    loadingToggle,
    isFetching,
    posts,
  };
};
