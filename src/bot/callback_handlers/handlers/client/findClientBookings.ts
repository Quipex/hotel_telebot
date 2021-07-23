import { Context } from 'telegraf';
import BriefBooking from '../../../message_components/booking/BriefBooking';
import briefBookingActions from '../../../message_components/booking/BriefBookingActions';
import fetchClientBookings from '../../../../api/calls/fetchClientBookings';

export async function findClientBookings(ctx: Context, clientId: string, originalMessageId?: number) {
	const bookings = await fetchClientBookings(clientId);
	await ctx.answerCbQuery();
	await ctx.reply(`🔎 Found ${bookings.length} bookings`, { reply_to_message_id: originalMessageId });
	for (const booking of bookings) {
		await ctx.replyWithHTML(BriefBooking(booking), {
			reply_to_message_id: originalMessageId,
			reply_markup: { inline_keyboard: briefBookingActions(booking) }
		});
	}
}
