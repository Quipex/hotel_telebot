import PmsBookingEntity from '../../../api/entities/PmsBookingEntity';
import { InlineKeyboardButton } from 'telegraf/typings/markup';
import { textBookingDetails } from '../../callback_handlers/callback_actions';
import detailedBookingActions from './DetailedBookingActions';

function briefBookingActions(booking: PmsBookingEntity) {
	const inline_keyboard: InlineKeyboardButton[][] = [];

	inline_keyboard.push([{ text: 'Подробнее 🔍', callback_data: textBookingDetails(booking.id) }]);

	return [...inline_keyboard, ...detailedBookingActions(booking)];
}

export default briefBookingActions;
