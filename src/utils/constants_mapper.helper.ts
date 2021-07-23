import { Source, Status } from '../api/entities/PmsBookingEntity';

export function fromSource(source: Source): string {
	switch (source) {
		case 'FRONT_DESK':
			return '🟣 Напрямую';
		case 'BOOKING':
			return '🔵 Booking';
		default:
			return '⚠ Неизвестный ⚠';
	}
}

export function fromStatus(status: Status): string {
	switch (status) {
		case 'LIVING':
			return '🟩 Проживает';
		case 'BOOKING_FREE':
			return '🟥 Без предоплаты';
		case 'REFUSE':
			return '❌ Отмена';
		case 'BOOKING_WARRANTY':
			return '🟨 Предоплата';
		default:
			return '⚠ Неизвестный ⚠';
	}
}
