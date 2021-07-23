import PmsClientEntity from '../../../api/entities/PmsClientEntity';
import { InlineKeyboardButton } from 'telegraf/typings/markup';
import { textClientBookings, textClientRefresh } from '../../callback_handlers/callback_actions';

function detailedClientActions({ id }: PmsClientEntity) {
	const inline_keyboard: InlineKeyboardButton[][] = [];

	inline_keyboard.push([{ text: 'Бронирования 🚪', callback_data: textClientBookings(id) }]);
	inline_keyboard.push([{ text: 'Обновить ♻', callback_data: textClientRefresh(id) }]);

	return inline_keyboard;
}

export default detailedClientActions;
