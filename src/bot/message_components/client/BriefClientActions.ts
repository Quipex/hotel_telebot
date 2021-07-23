import { InlineKeyboardButton } from 'telegraf/typings/markup';
import { textClientDetails } from '../../callback_handlers/callback_actions';
import PmsClientEntity from '../../../api/entities/PmsClientEntity';
import detailedClientActions from './DetailedClientActions';

function briefClientActions(client: PmsClientEntity) {
	const inline_keyboard: InlineKeyboardButton[][] = [];

	inline_keyboard.push([{ text: 'Подробнее 🔍', callback_data: textClientDetails(client.id) }]);

	return [...inline_keyboard, ...detailedClientActions(client)];
}

export default briefClientActions;
