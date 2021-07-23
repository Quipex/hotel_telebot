import { Context } from 'telegraf';
import synchronizationStatus from '../message_components/Synchronization';
import putSyncBookings from '../../api/calls/putSyncBookings';
import putSyncClients from '../../api/calls/putSyncClients';

async function synchronizeBookingsAndClientsAndReply(ctx: Context) {
	const { message_id } = await ctx.reply(synchronizationStatus('бронирования', 1, 3));
	await ctx.replyWithChatAction('typing');
	await putSyncBookings();
	await ctx.telegram.editMessageText(ctx.chat!.id, message_id, null as any, synchronizationStatus('клиенты', 2, 3));
	await ctx.replyWithChatAction('typing');
	await putSyncClients();
	await ctx.telegram.editMessageText(ctx.chat!.id, message_id, null as any, synchronizationStatus('всё синхронизировано', 3, 3, true));
	return ctx.reply('✅ Done');
}

export default synchronizeBookingsAndClientsAndReply;
