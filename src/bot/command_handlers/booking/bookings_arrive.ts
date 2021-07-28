/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Context } from 'telegraf';
import BriefBooking from '../../message_components/booking/BriefBooking';
import { parseDateAndReplyToInvalid } from './bookings_added';
import briefBookingActions from '../../message_components/booking/BriefBookingActions';
import fetchBookingsArriveAt from '../../../api/calls/fetchBookingsArriveAt';
import { parseDateAsUnix } from '../../../utils/dates.helper';
import bot from '../../bot';
import fetchBookingsArriveAtAndNotLiving from '../../../api/calls/fetchBookingsArriveAtAndNotLiving';

async function parseCommandFindBookingsArrivedOnAndReply(ctx: Context, next) {
	const date = await parseDateAndReplyToInvalid(ctx);
	if (!date) {
		return next();
	}

	const todayArrivals = await fetchBookingsArriveAt(date);
	for (const booking of todayArrivals) {
		await ctx.replyWithHTML(BriefBooking(booking), {
			reply_to_message_id: ctx.message?.message_id,
			reply_markup: { inline_keyboard: briefBookingActions(booking) }
		});
	}
}

export async function parseCommandFindBookingsArrivedOnNotLivingAndSend(chatId: string, textDate: string, replyMessageId?: number) {
	const date = await parseDateAsUnix(textDate);
	if (!date) {
		return;
	}

	const arrivals = await fetchBookingsArriveAtAndNotLiving(date);
	for (const booking of arrivals) {
		await bot.telegram.sendMessage(chatId, BriefBooking(booking), {
			reply_to_message_id: replyMessageId,
			reply_markup: { inline_keyboard: briefBookingActions(booking) },
			parse_mode: 'HTML'
		});
	}
}

export default parseCommandFindBookingsArrivedOnAndReply;
