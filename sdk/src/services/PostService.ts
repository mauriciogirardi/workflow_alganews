import { generateQueryString } from "../utils";
import { Service } from "../Service";
import { Post } from "../@types";

class PostService extends Service {
    static getAllPosts(search: Post.Query) {
        const queryString = generateQueryString(search);
        return this.Http.get<Post.Paginated>(
            '/posts'.concat(queryString)
        ).then(this.getData);
    }

    static getExistingPost(id: number) {
        return this.Http.get<Post.Detailed>(
            `/posts/${id}`
        ).then(this.getData);
    }

    static insertNewPost(post: Post.Input) {
        return this.Http.post<Post.Detailed>(
            '/posts',
            post
        ).then(this.getData);
    }

    static publishExistingPost(postId: number) {
        return this.Http.put<{}>(
            `/posts/${postId}/publishing`
        ).then(this.getData);
    }

    static updateExistingPost(
        postId: number,
        post: Post.Input
    ) {
        return this.Http.put<Post.Detailed>(
            `/posts/${postId}`,
            post
        ).then(this.getData);
    }

    static deleteExistingPost(postId: number) {
        return this.Http.delete<{}>(`/posts/${postId}`).then(
            this.getData
        );
    }
    static deactivateExistingPost(postId: number) {
        return this.Http.delete<{}>(
            `/posts/${postId}/activation`
        ).then(this.getData);
    }
}

export default PostService