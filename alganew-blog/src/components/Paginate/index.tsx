import Router from "next/router"
import ReactPaginate from "react-paginate"

import * as S from './styles'

interface PaginateProps {
    totalPages: number
}

export const Paginate = ({ totalPages }: PaginateProps) => {
    return (
        <S.Container>
            <ReactPaginate
                breakLabel="..."
                containerClassName="pagination"
                pageCount={totalPages}
                marginPagesDisplayed={0}
                pageRangeDisplayed={3}
                previousLabel={'<'}
                nextLabel={'>'}
                hrefBuilder={(page) => `/?page=${page}`}
                onPageChange={(page) =>
                    Router.push(`/?page=${page.selected + 1}`)
                }
            />
        </S.Container>
    )
}
