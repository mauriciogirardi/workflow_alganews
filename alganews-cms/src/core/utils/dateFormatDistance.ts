import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const dateFormatDistance = (startDate: string) => {
    const dateNow = new Date()
    const createdAt = new Date(startDate)
    return formatDistance(createdAt, dateNow, { locale: ptBR })
}
