import { FeaturedPost } from '../components/FeaturedPost'
import type { NextPage } from 'next'

const fake = {
    id: 42,
    slug: "como-fazer-x-coisas-com-react-js",
    title: "Como fazer X coisas com React.js",
    imageUrls: {
        default: "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
        small: "https://storage.googleapis.com/alganews-files/posts/avatar-joao-small.jpeg",
        medium: "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
        large: "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg"
    },
    editor: {
        id: 29,
        name: "Daniel Bonifacio",
        avatarUrls: {
            default: "https://storage.googleapis.com/alganews-files/posts/avatar-joao.jpeg",
            small: "https://avatars.githubusercontent.com/u/51093343?v=4",
            medium: "https://storage.googleapis.com/alganews-files/posts/avatar-joao-medium.jpeg",
            large: "https://storage.googleapis.com/alganews-files/posts/avatar-joao-large.jpeg"
        },
        createdAt: "2017-03-04T00:12:45Z"
    },
    createdAt: "2020-12-01T18:09:02Z",
    updatedAt: "2022-02-27T14:48:21.457Z",
    published: true,
    tags: [
        "JavaScript",
        "Java",
        "Python"
    ],
    canBePublished: true,
    canBeUnpublished: true,
    canBeDeleted: true,
    canBeEdited: true
}

const Home: NextPage = () => {
    return (
        <>
            <FeaturedPost postSummary={fake} />
        </>
    )
}

export default Home
