import { Context } from 'telegraf';
import BriefClient from '../../message_components/client/BriefClient';
import briefClientActions from '../../message_components/client/BriefClientActions';
import fetchClientsByName from '../../../api/calls/fetchClientsByName';

async function parseCommandFindClientAndReply(ctx: Context) {
	const messageText = ctx.message?.text;
	if (!messageText || messageText.split(' ').length < 2) {
		await ctx.reply('Specify the search string');
		return;
	}
	const commandTokens = messageText.split(' ');
	const clients = await fetchClientsByName(commandTokens.slice(1).join(' '));

	const messageId = ctx.message?.message_id;
	const limitedClients = clients.slice(0, 3);
	if (clients.length > 0) {
		await ctx.reply(`🔍 Got ${clients.length} results`);
		for (const client of limitedClients) {
			await ctx.replyWithHTML(BriefClient(client),
				{
					reply_to_message_id: messageId, reply_markup:
						{
							inline_keyboard: briefClientActions(client)
						}
				});
		}
	} else {
		return ctx.reply('No results');
	}
}

export default parseCommandFindClientAndReply;
