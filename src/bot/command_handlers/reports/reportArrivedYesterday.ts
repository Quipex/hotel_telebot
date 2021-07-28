import bot from '../../bot';
import { parseCommandFindBookingsArrivedOnNotLivingAndSend } from '../booking/bookings_arrive';

async function reportArrivedYesterday(chatId: string) {
	const titleMessage = await bot.telegram.sendMessage(chatId, 'Должны были заехать вчера и не отмечены как проживающие ⏰');
	await parseCommandFindBookingsArrivedOnNotLivingAndSend(chatId, 'yesterday', titleMessage.message_id);
}

export default reportArrivedYesterday;
