import { Row } from "./data"

interface PaginateRowsArgs {
    rows: Row[],
    page: number,
    limit: number
}

export const paginateRows = ({rows = [], page = 1, limit = 25}: PaginateRowsArgs): Row[] => {
    return rows.slice((page - 1) * limit, page * limit)
}