import { Column, usePagination, useTable } from "react-table";
import { useEffect, useMemo, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { Post } from "mauricio.girardi-sdk";
import Skeleton from "react-loading-skeleton";

import {
    dataDateRow,
    dataTitleWithImageRow,
    isPublished,
    positionHeaderName
} from "core/utils/tableUtils";
import { withBoundary } from "core/hoc/withBoundary";
import { usePosts } from "core/hooks/usePosts";
import { Loading } from "app/components/Loading";

import Table from "app/components/Table";

function PostList() {
    const { fetchingPosts, loading, paginatedPosts } = usePosts()
    const [error, setError] = useState<Error>()
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetchingPosts({
            page,
            size: 7,
            showAll: true,
            sort: ['createdAt', 'desc']
        })
            .catch(err => setError(new Error(err.message)))
    }, [page, fetchingPosts])

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
                Header: positionHeaderName({ title: 'Publicado?', position: 'right' }),
                accessor: 'published',
                Cell: (props) => isPublished({ value: props.value }),
            },
        ],
        []
    )

    const instance = useTable<Post.Summary>(
        {
            data: paginatedPosts?.content || [],
            columns,
            manualPagination: true,
            initialState: { pageIndex: 0 },
            pageCount: paginatedPosts?.totalPages,
        },
        usePagination
    )

    if (error) throw error
    if (!paginatedPosts) {
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
            <Loading show={loading} />
            <Table instance={instance} onPaginate={setPage} />
        </>
    )
}

export default withBoundary(PostList, 'lista de posts')
