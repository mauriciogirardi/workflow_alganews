import { useCallback, useState } from 'react';
import { Post, PostService } from 'mauricio.girardi-sdk';

export const useLatestPosts = () => {
  const [posts, setPosts] = useState<Post.Paginated>();
  const [error, setError] = useState<Error>();

  const fetchPosts = useCallback(() => {
    PostService.getAllPosts({
      sort: ['createdAt', 'desc'],
      page: 0,
      size: 3,
    })
      .then(setPosts)
      .catch((err) => setError(new Error(err.message)));
  }, []);

  return {
    posts: posts?.content,
    fetchPosts,
    error,
  };
};
