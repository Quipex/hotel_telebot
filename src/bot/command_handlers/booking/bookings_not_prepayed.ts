import { Context } from 'telegraf';
import { parseDateAndReplyToInvalid } from './bookings_added';
import BriefBooking from '../../message_components/booking/BriefBooking';
import briefBookingActions from '../../message_components/booking/BriefBookingActions';
import fetchNotPayedBookingsArriveAfter from '../../../api/calls/fetchNotPayedBookingsArriveAfter';

async function parseCommandFindBookingsNotPrePayedAndReply(ctx: Context, next) {
	const date = await parseDateAndReplyToInvalid(ctx);
	if (!date) {
		return next();
	}

	const notPrePayedBookings = await fetchNotPayedBookingsArriveAfter(date);
	for (const booking of notPrePayedBookings) {
		await ctx.replyWithHTML(BriefBooking(booking), {
			reply_to_message_id: ctx.message?.message_id,
			reply_markup: { inline_keyboard: briefBookingActions(booking) }
		});
	}
}

export default parseCommandFindBookingsNotPrePayedAndReply;
