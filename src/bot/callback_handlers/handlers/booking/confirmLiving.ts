import { Context } from 'telegraf';
import { refreshBooking } from './refreshBooking';
import putConfirmLiving from '../../../../api/calls/putConfirmLiving';

export async function confirmLivingAndReply(ctx: Context, bookingId: string, originalMessageId: number) {
	await putConfirmLiving(bookingId);
	await ctx.answerCbQuery('✅ Подтверждено');
	await ctx.deleteMessage(ctx.update.callback_query.message?.message_id);
	await refreshBooking(ctx, bookingId, originalMessageId);
}
