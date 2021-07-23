import { Context } from 'telegraf';
import BriefBooking from '../../message_components/booking/BriefBooking';
import briefBookingActions from '../../message_components/booking/BriefBookingActions';
import fetchBookingsExpiredAndReminded from '../../../api/calls/fetchBookingsExpiredAndReminded';

async function findBookingsRemindedAndExpiredPrepayment(ctx: Context) {
	const expiredBookings = await fetchBookingsExpiredAndReminded();
	for (const booking of expiredBookings) {
		await ctx.replyWithHTML(BriefBooking(booking), {
			reply_to_message_id: ctx.message?.message_id,
			reply_markup: { inline_keyboard: briefBookingActions(booking) }
		});
	}
}

export default findBookingsRemindedAndExpiredPrepayment;
