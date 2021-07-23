import PmsBookingEntity from '../../../api/entities/PmsBookingEntity';
import { InlineKeyboardButton } from 'telegraf/typings/markup';
import {
	textBookingLivingAsk,
	textBookingMoveList,
	textBookingPrepaidAsk,
	textBookingRefresh,
	textBookingRemindedPrepayment,
	textClientDetails
} from '../../callback_handlers/callback_actions';

function detailedBookingActions({ id, status, startDate, customerId }: PmsBookingEntity) {
	const inline_keyboard: InlineKeyboardButton[][] = [];

	inline_keyboard.push([{ text: 'Переместить... 🚪', callback_data: textBookingMoveList(id) }]);
	inline_keyboard.push([{ text: 'Обновить ♻', callback_data: textBookingRefresh(id) }]);
	inline_keyboard.push([{ text: 'Клиент 🧑️', callback_data: textClientDetails(customerId) }]);

	if (status === 'BOOKING_FREE') {
		inline_keyboard.push([{ text: 'Подтвердить предоплату ✅', callback_data: textBookingPrepaidAsk(id) }]);
		inline_keyboard.push([{ text: 'Напомнили за предоплату 💬', callback_data: textBookingRemindedPrepayment(id) }]);
	}

	if ((status === 'BOOKING_FREE' || status === 'BOOKING_WARRANTY') && (new Date() > new Date(startDate))) {
		inline_keyboard.push([{ text: 'Подтвердить проживание 🏠', callback_data: textBookingLivingAsk(id) }]);
	}

	return inline_keyboard;
}

export default detailedBookingActions;
