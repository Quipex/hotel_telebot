import { Context } from 'telegraf';
import { ExtraSendMessage } from 'telegraf/typings/telegram-types';
import DetailedClient from '../../message_components/client/DetailedClient';
import detailedClientActions from '../../message_components/client/DetailedClientActions';
import fetchClientById from '../../../api/calls/fetchClientById';

export async function sendClientById(clientId: string, ctx: Context, extra?: ExtraSendMessage) {
	const foundClient = await fetchClientById(clientId);
	if (foundClient) {
		return ctx.replyWithHTML(DetailedClient(foundClient), {
			reply_markup: { inline_keyboard: detailedClientActions(foundClient) },
			...extra
		});
	} else {
		return ctx.reply('🔍 Not found');
	}
}

async function parseCommandFindClientByIdAndReply(ctx: Context) {
	const messageText = ctx.message?.text;
	if (!messageText || messageText.split(' ').length <= 1) {
		return ctx.reply('❌ id missing ❌');
	}
	const id = messageText.split(' ')[1];
	return sendClientById(id, ctx);
}

export default parseCommandFindClientByIdAndReply;
