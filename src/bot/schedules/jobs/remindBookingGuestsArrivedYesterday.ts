import reportArrivedYesterday from '../../command_handlers/reports/reportArrivedYesterday';
import env from '../../env';
import { createSchedule } from '../schedule.helper';

// at 8:00
createSchedule('0 0 8 * * *', remindBookingGuestsArrivedYesterday);
// at 20:00
createSchedule('0 0 20 * * *', remindBookingGuestsArrivedYesterday);

async function remindBookingGuestsArrivedYesterday() {
	for (const chatId of env.telegramIds) {
		await reportArrivedYesterday(chatId);
	}
}
