import type { Status, StatusColor } from "./definition"

export const statusColor = (status: string): StatusColor => status == 'Success' ? 'green' : (status == 'On Process' ? 'blue' : 'yellow')

export const numberFormat = (num: number) => (new Intl.NumberFormat('de-DE').format(num))

export const sum = (items: Array<any>) => items.reduce((acc, item) => acc + item.estimatedPrice * item.amount)