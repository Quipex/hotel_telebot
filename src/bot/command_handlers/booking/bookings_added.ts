/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Context } from 'telegraf';
import BriefBooking from '../../message_components/booking/BriefBooking';
import { parseDateAsUnix } from '../../../utils/dates.helper';
import briefBookingActions from '../../message_components/booking/BriefBookingActions';
import fetchBookingsAddedAfter from '../../../api/calls/fetchBookingsAddedAfter';

export async function parseDateAndReplyToInvalid(ctx: Context, text?: string): Promise<number | undefined> {
	const messageText = text ?? ctx.message!.text;
	const commandTokens = messageText.split(' ');
	let date: number | undefined;
	if (commandTokens.length < 2) {
		date = parseDateAsUnix('today');
	} else {
		date = parseDateAsUnix(commandTokens[1]);
	}
	if (date === undefined) {
		await ctx.reply(`❌ Unrecognized date: ${commandTokens[1]}`);
	}
	return date;
}

interface FindBookingsOptions {
	commandText?: string;
	messageReplyId?: number;
}

async function parseCommandFindBookingsAddedAfterAndReply(ctx: Context, next, options?: FindBookingsOptions) {
	const date = await parseDateAndReplyToInvalid(ctx, options?.commandText);
	if (!date) {
		return next();
	}
	const todayArrivals = await fetchBookingsAddedAfter(date);
	for (const booking of todayArrivals) {
		await ctx.replyWithHTML(BriefBooking(booking), {
			reply_to_message_id: (options?.messageReplyId ?? ctx.message?.message_id),
			reply_markup: { inline_keyboard: briefBookingActions(booking) }
		});
	}
	return next();
}

export default parseCommandFindBookingsAddedAfterAndReply;
