import { useCallback, useState } from 'react';
import { Post, PostService } from 'mauricio.girardi-sdk';
import { info } from 'core/utils/info';

export const useSinglePost = () => {
    const [post, setPost] = useState<Post.Detailed>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    const fetchPost = useCallback(async (postId: number) => {
        setLoading(true);
        PostService.getExistingPost(postId)
            .then(setPost)
            .catch(err => setError(new Error(err.message)))
            .finally(() => setLoading(false));
    }, []);

    const publishPost = useCallback(async (postId: number) => {
        await PostService.publishExistingPost(postId);
        info({
            title: 'Post publicado',
            description: 'Você publicou o post com sucesso',
            status: 'success',
        });
    }, []);

    return {
        post,
        error,
        loading,
        fetchPost,
        publishPost,
    };
};
