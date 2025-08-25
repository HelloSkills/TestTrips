// Пользователь
export interface User {
    id: number
    first_name: string
    second_name: string
    last_name: string
}

// Авиа-вариант
export interface AviaVariant {
    id: number
    provider: string
    placeFrom: string
    placeTo: string
    dateFrom: string
    dateTo: string
    timeFrom: string
    timerTo: string
    iataFrom: string
    iataTo: string
    price: number
}

// Сервис (юзер + билет)
export interface Service {
    user: User
    ticket: AviaVariant
}

// Путёвка
export interface Trip {
    id?: number,
    name: string,
    price: number,
    passengers: User[],
    services: Service[],
}