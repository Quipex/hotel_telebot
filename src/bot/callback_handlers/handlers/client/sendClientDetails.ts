import { Context } from 'telegraf';
import { sendClientById } from '../../../command_handlers/client/client_by_id';

export async function sendClientDetails(ctx: Context, id: string, message_id?: number) {
	await sendClientById(id, ctx, { reply_to_message_id: message_id });
	await ctx.answerCbQuery();
}
