import { Context } from 'telegraf';
import putCreateBooking from '../../../api/calls/putCreateBooking';
import { parseDate } from '../../../utils/dates.helper';

async function replyWithUsageManual(ctx: Context) {
	return ctx.replyWithHTML(
		'usage:\n<code>/create fromDateInclusive toDateExclusive roomNumber guestName</code>'
	);
}

async function parseCommandCreateBookingAndReply(ctx: Context) {
	let fromDate, toDate, roomNumber, guestName;
	try {
		const messageText = ctx.message!.text;
		const commandTokens = messageText.split(' ');
		fromDate = parseDate(commandTokens[1]);
		toDate = parseDate(commandTokens[2]);
		roomNumber = commandTokens[3];
		guestName = commandTokens[4];
		if (!fromDate || !toDate) {
			return replyWithUsageManual(ctx);
		}
	} catch (e) {
		return replyWithUsageManual(ctx);
	}

	const { newId } = await putCreateBooking({ from: fromDate, to: toDate, roomNumber, guestName: guestName }) as any;
	await ctx.reply(`Created ✅ /id ${newId}`, { reply_to_message_id: ctx.message?.message_id });
}

export default parseCommandCreateBookingAndReply;
