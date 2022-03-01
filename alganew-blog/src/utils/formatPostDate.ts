import { differenceInDays, format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

export const formatPostDate = (postCreatedAt: string) => {
    const postDate = new Date(postCreatedAt)
    const today = new Date()

    const dayDiff = differenceInDays(today, postDate)

    if (dayDiff > 3) {
        return format(postDate, 'dd/MM/yyyy')
    }

    return `há ${formatDistanceToNow(postDate, { locale: ptBr })}`
}
