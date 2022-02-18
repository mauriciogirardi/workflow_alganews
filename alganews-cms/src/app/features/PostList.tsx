import { useEffect, useMemo, useState } from "react";
import { Column, usePagination, useTable } from "react-table";
import { Post, PostService } from "mauricio.girardi-sdk";
import { MdOpenInNew } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import { dataDateRow, dataTitleWithImageRow, isPublished, positionHeaderName } from "core/utils/tableUtils";
import { withBoundary } from "core/hoc/withBoundary";

import Table from "app/components/Table";

function PostList() {
    const [posts, setPosts] = useState<Post.Paginated>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error>()
    const [page, setPage] = useState(0)

    useEffect(() => {
        setLoading(true)
        PostService
            .getAllPosts({
                page,
                size: 7,
                showAll: true,
                sort: ['createdAt', 'desc']
            })
            .then(setPosts)
            .catch(err => setError(new Error(err.message)))
            .finally(() => setLoading(false))
    }, [page])

    const columns = useMemo<Column<Post.Summary>[]>(
        () => [
            {
                Header: '',
                accessor: 'id',
                Cell: () => <MdOpenInNew size={14} color="#09f" />
            },
            {
                Header: positionHeaderName({ title: 'Título' }),
                accessor: 'title',
                width: 320,
                Cell: (props) => dataTitleWithImageRow(props)
            },
            {
                Header: positionHeaderName({ title: 'Criação', position: 'right' }),
                accessor: 'createdAt',
                Cell: (props) => dataDateRow({ value: props.value })
            },
            {
                Header: positionHeaderName({ title: 'Última atualização', position: 'right' }),
                accessor: 'updatedAt',
                Cell: (props) => dataDateRow({ value: props.value })
            },
            {
                Header: positionHeaderName({ title: 'Publicado?', position: 'right' }),
                accessor: 'published',
                Cell: (props) => isPublished({ value: props.value })
            },
        ],
        []
    )

    const instance = useTable<Post.Summary>(
        {
            data: posts?.content || [],
            columns,
            manualPagination: true,
            initialState: {
                pageIndex: 0,
            },
            pageCount: posts?.totalPages,
        },
        usePagination
    )

    if (error) throw error
    if (!posts || loading) {
        return (
            <div>
                <Skeleton height={32} />
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
            </div>
        )
    }

    return (
        <>
            <Table instance={instance} onPaginate={setPage} />
        </>
    )
}

export default withBoundary(PostList, 'lista de posts')
