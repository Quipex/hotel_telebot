import { Context } from 'telegraf';
import { parseDateAndReplyToInvalid } from './bookings_added';
import postMoveBooking from '../../../api/calls/postMoveBooking';
import postMoveBookingInBatch from '../../../api/calls/postMoveBookingInBatch';

async function replyWithMoveBookingUsageManual(ctx: Context) {
	return ctx.replyWithHTML(
		'usage:\n<code>/mv bookingId roomNumber [date]</code>'
	);
}

export async function parseCommandMoveBookingAndReply(ctx: Context, next) {
	const messageText = ctx.message!.text;
	let bookingId, roomNumber, date;
	try {
		const commandTokens = messageText.split(' ');
		bookingId = commandTokens[1];
		roomNumber = commandTokens[2];
		if (commandTokens.length < 3) {
			return replyWithMoveBookingUsageManual(ctx);
		}
		if (commandTokens.length > 3) {
			date = await parseDateAndReplyToInvalid(ctx, commandTokens[3]);
			if (!date) {
				return next();
			}
		}
	} catch (e) {
		return replyWithMoveBookingUsageManual(ctx);
	}
	await postMoveBooking({ bookingId, roomNumber, date });
	await ctx.reply('Moved ✅', { reply_to_message_id: ctx.message?.message_id });
}

async function replyWithMoveBookingInBatchUsageManual(ctx: Context) {
	return ctx.replyWithHTML(
		'usage:\n<code>/mv_batch bookingId room(days) [room(days)...]</code>'
	);
}

const roomToDaysRegex = /^(\d+)\((\d+)\)$/;

export async function parseCommandMoveBookingInBatchAndReply(ctx: Context) {
	const messageText = ctx.message!.text;
	let bookingId, roomsToDays;
	try {
		const commandTokens = messageText.split(' ');
		bookingId = commandTokens[1];
		if (commandTokens.length < 3) {
			return replyWithMoveBookingInBatchUsageManual(ctx);
		}
		if (commandTokens.length >= 3) {
			roomsToDays = commandTokens.slice(2).map(roomToDaysText => {
				const parsedTokens = roomToDaysRegex.exec(roomToDaysText);
				if (!parsedTokens || parsedTokens.length < 3) {
					return ctx.replyWithHTML(`Не понял что за <code>'${roomToDaysText}'</code>, должно быть <code>room(days)</code>`);
				}
				return {
					room: parsedTokens[1],
					days: parsedTokens[2]
				};
			});
		}
	} catch (e) {
		return replyWithMoveBookingInBatchUsageManual(ctx);
	}
	const reportPlan = await postMoveBookingInBatch({ bookingId, roomsToDays });
	await ctx.replyWithHTML(`Moved ✅\n<code>${JSON.stringify(reportPlan, null, 2)}</code>`, { reply_to_message_id: ctx.message?.message_id });
}
