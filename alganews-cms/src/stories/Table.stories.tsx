import { ComponentMeta } from '@storybook/react';

import Table from 'app/components/Table';
import { useMemo } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { Column, useTable } from 'react-table';

export default {
    title: 'Components/Table',
    component: Table,
} as ComponentMeta<typeof Table>;

type Post = {
    id: number
    title: string
    views: number
    author: {
        name: string
        avatar: string
    }
    conversions: {
        thousands: number
        percentage: number
    }
}

export const Default = () => {
    const data = useMemo<Post[]>(
        () => [
            {
                author: {
                    name: 'Daniel Bonifacio',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNf0vAZLggJoZxGKpfOa3EBClHkwQmmvv9Lg&usqp=CAU'
                },
                id: 1,
                conversions: {
                    percentage: 64.35,
                    thousands: 607,
                },
                title: 'Como dobrei meu salário aprendendo somente React',
                views: 985415
            },
            {
                author: {
                    name: 'Daniel Bonifacio',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNf0vAZLggJoZxGKpfOa3EBClHkwQmmvv9Lg&usqp=CAU'
                },
                id: 2,
                conversions: {
                    percentage: 64.35,
                    thousands: 607,
                },
                title: 'React.js vs. React Native: a REAL diferença entre os dois',
                views: 985415
            },
            {
                author: {
                    name: 'Daniel Bonifacio',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNf0vAZLggJoZxGKpfOa3EBClHkwQmmvv9Lg&usqp=CAU'
                },
                id: 3,
                conversions: {
                    percentage: 95.35,
                    thousands: 845,
                },
                title: 'Como dobrei meu salário aprendendo somente React',
                views: 985415
            }
        ],
        []
    )

    const columns = useMemo<Column<Post>[]>(
        () => [
            {
                Header: '',
                accessor: 'id',
                Cell: () => <MdOpenInNew size={14} color="#09f" />
            },
            {
                Header: () => <div style={{ textAlign: 'left' }}>Artigo</div>,
                accessor: 'title',
                width: 320,
                Cell: (props) => (
                    <div style={{
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '300px',
                    }}>
                        <img width={24} height={24} src={props.row.original.author.avatar} alt={props.row.original.author.name} />
                        <p
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                lineClamp: 1,
                                overflow: 'hidden',
                            }}
                        >

                            {props.value}
                        </p>
                    </div>
                )
            },
            {
                Header: () => <div style={{ textAlign: 'left' }}>Views</div>,
                accessor: 'views',
                Cell: (props) => (
                    <span style={{ textAlign: 'right', fontWeight: 600, fontFamily: '"Roboto mono", monospace' }}>
                        {props.value.toLocaleString('pt-br')}
                    </span >
                )
            },
            {
                Header: () => <div style={{ textAlign: 'left' }}>Conversões</div>,
                accessor: 'conversions',
                Cell: (props) => (
                    <div style={{
                        textAlign: 'left',
                        display: 'flex',
                        gap: 8,
                        fontWeight: 600,
                        fontFamily: '"Roboto mono", monospace'
                    }}>
                        <span>{props.value.thousands}k</span>
                        <span style={{ color: '#09f' }}>({props.value.percentage})%</span>
                    </div>
                )
            },
            {
                id: Math.random().toString(),
                Header: () => <div style={{ textAlign: 'right' }}>Ações</div>,
                Cell: () => (
                    <div style={{
                        textAlign: 'right',
                    }}>
                        []
                    </div>
                )
            },
        ],
        []
    )

    const instance = useTable<Post>({ columns, data })

    return <Table<Post> instance={instance} />
}

export const WithoutData = () => {
    const data = useMemo<Post[]>(() => [], [])

    const columns = useMemo<Column<Post>[]>(
        () => [
            {
                Header: '',
                accessor: 'id',
                Cell: () => <MdOpenInNew size={14} color="#09f" />
            },
            {
                Header: 'Artigo',
                accessor: 'title',
                width: 320,
                Cell: (props) => (
                    <div style={{
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <img width={24} height={24} src={props.row.original.author.avatar} alt={props.row.original.author.name} />
                        {props.value}
                    </div>
                )
            },
            {
                Header: 'Views',
                accessor: 'views',
                Cell: (props) => (
                    <span style={{ textAlign: 'right', fontWeight: 600, fontFamily: '"Roboto mono", monospace' }}>
                        {props.value.toLocaleString('pt-br')}
                    </span >
                )
            },
            {
                Header: 'Conversões',
                accessor: 'conversions',
                Cell: (props) => (
                    <div style={{
                        textAlign: 'left',
                        display: 'flex',
                        gap: 8,
                        fontWeight: 600,
                        fontFamily: '"Roboto mono", monospace'
                    }}>
                        <span>{props.value.thousands}k</span>
                        <span style={{ color: '#09f' }}>({props.value.percentage})%</span>
                    </div>
                )
            },
            {
                Header: 'Ações',
                Cell: () => (
                    <div style={{
                        textAlign: 'right',
                    }}>
                        []
                    </div>
                )
            },
        ],
        []
    )

    const instance = useTable<Post>({ columns, data })

    return <Table<Post> instance={instance} />
}
