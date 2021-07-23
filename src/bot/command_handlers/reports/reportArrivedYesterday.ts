import bot from '../../bot';
import { parseCommandFindBookingsArrivedOnAndSend } from '../booking/bookings_arrive';

async function reportArrivedYesterday(chatId: string) {
	const titleMessage = await bot.telegram.sendMessage(chatId, 'Должны были заехать вчера ⏰');
	await parseCommandFindBookingsArrivedOnAndSend(chatId, '/cmd yesterday', titleMessage.message_id);
}

export default reportArrivedYesterday;
