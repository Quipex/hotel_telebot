import { Context } from 'telegraf';
import { refreshBooking } from './refreshBooking';
import putConfirmBooking from '../../../../api/calls/putConfirmBooking';

export async function confirmBookingAndReply(ctx: Context, bookingId: string, originalMessageId: number) {
	await putConfirmBooking(bookingId);
	await ctx.answerCbQuery('✅ Подтверждено');
	await ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
	await refreshBooking(ctx, bookingId, originalMessageId);
}
