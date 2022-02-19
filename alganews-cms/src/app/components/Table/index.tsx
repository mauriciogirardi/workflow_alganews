import { transparentize } from 'polished'
import { TableInstance } from 'react-table'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import { NoData } from '../NoData'

import * as S from './styles'

interface TableProps<T extends object> {
    instance: TableInstance<T>
    onPaginate?: (newPage: number) => any
}

export default function Table<T extends Object>({
    instance,
    onPaginate
}: TableProps<T>) {
    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        prepareRow,
        rows,
        pageCount,
        gotoPage,
        state: {
            pageIndex
        }
    } = instance

    useEffect(() => {
        onPaginate && onPaginate(pageIndex)
    }, [onPaginate, pageIndex])

    return (
        <>
            <S.TableContainer cellPadding={0} cellSpacing={0} {...getTableProps}>
                <S.THead>
                    {headerGroups.map(headerGroup => (
                        <S.TrHeading {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <S.Th  {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </S.Th>
                            ))}
                        </S.TrHeading>
                    ))}
                </S.THead>

                <S.TBody {...getTableBodyProps}>
                    {rows.map(row => {
                        prepareRow(row)

                        return (
                            <S.TrBody {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <S.Td key={cell.column.id} {...cell.getCellProps}>
                                        {cell.render('Cell')}
                                    </S.Td>
                                ))}
                            </S.TrBody>
                        )
                    })}
                </S.TBody>
            </S.TableContainer>

            {!rows.length && <NoData height={300} bg={transparentize(0.95, "#274060")} />}

            <S.Pagination>
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={page => gotoPage(page.selected)}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={4}
                    nextLabel={<BsChevronRight size={16} style={{ paddingTop: 2 }} />}
                    previousLabel={<BsChevronLeft size={16} style={{ paddingTop: 2 }} />}
                />
            </S.Pagination>
        </>
    )
}
