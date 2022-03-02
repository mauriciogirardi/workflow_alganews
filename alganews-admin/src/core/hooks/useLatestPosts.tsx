import { useCallback, useState } from 'react';
import { Post, PostService } from 'mauricio.girardi-sdk';

export const useLatestPosts = () => {
  const [posts, setPosts] = useState<Post.Paginated>();
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    PostService.getAllPosts({
      sort: ['createdAt', 'desc'],
      page: 0,
      size: 3,
    })
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return {
    posts: posts?.content,
    loading,
    fetchPosts,
  };
};
