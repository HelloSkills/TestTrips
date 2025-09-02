// Утилита для возвращения ранней даты в нужном нам формате (согласно ТЗ)

// Формат даты
export function formatDate(dateStr: string): string {
    if (!dateStr) {

        return ''
    }
    const [day, month, year] = dateStr.split('-')
    return `${day}.${month}.${year}`
}

// Возвращает дату в формате Day.Month (26.08)
export function formatDayMonth(dateStr: string): string {
    if (!dateStr) {

        return ''
    }
    const [day, month] = dateStr.split('-')
    return `${day}.${month}`
}

export const formatDateForFilter = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
}

// Поиск самой ранней даты
export function getEarliestDate(services: any[]): string {
    if (!Array.isArray(services) || services.length === 0) return ''
    const dates = services
        .map(service => service?.ticket?.dateFrom)
        .filter(Boolean)

    if (dates.length === 0) {

        return ''
    }

    const earliest = dates.reduce((a, b) => {
        const [d1, m1, y1] = a.split('-').map(Number)
        const [d2, m2, y2] = b.split('-').map(Number)
        const date1 = new Date(y1, m1 - 1, d1)
        const date2 = new Date(y2, m2 - 1, d2)

        return date1 < date2 ? a : b
    })

    return formatDate(earliest)
}
