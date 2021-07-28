/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Context, Telegraf } from 'telegraf';
import env from './env';
import handleCallbackQueries from './callback_handlers';
import security from './middlewares/security';
import validateMessage from './middlewares/message_validation';
import parseCommandFindClientAndReply from './command_handlers/client/find_client';
import parseCommandFindBookingsArrivedOnAndReply from './command_handlers/booking/bookings_arrive';
import parseCommandFindBookingsAddedAfterAndReply from './command_handlers/booking/bookings_added';
import parseCommandFindBookingsByIdAndReply from './command_handlers/booking/bookings_by_id';
import synchronizeBookingsAndClientsAndReply from './command_handlers/synchronize_bookings_and_clients';
import parseCommandCreateBookingAndReply from './command_handlers/booking/create_booking';
import parseCommandFindBookingsNotPrePayedAndReply from './command_handlers/booking/bookings_not_prepayed';
import findBookingsRemindedAndExpiredPrepaymentAndReply
	from './command_handlers/booking/bookings_not_prepayed_reminded_expired';
import parseCommandFindClientByIdAndReply from './command_handlers/client/client_by_id';

const bot = new Telegraf(env.botToken);

bot.catch(async (err, ctx: Context) => {
	await ctx.replyWithHTML('☠ Got error ☠\n\n' +
		`<code>${err.message}</code>`);
	console.error(`Got an error for update of type '${ctx.updateType}':`, err.message);
});
bot.use(security);
bot.on('text', validateMessage);
bot.on('callback_query', handleCallbackQueries);

bot.start(ctx => ctx.reply('Hello!'));

bot.command(['c', 'cl', 'client'], parseCommandFindClientAndReply);
bot.command('arrive', parseCommandFindBookingsArrivedOnAndReply);
bot.command('added', parseCommandFindBookingsAddedAfterAndReply);
bot.command('id', parseCommandFindBookingsByIdAndReply);
bot.command('cl_id', parseCommandFindClientByIdAndReply);
bot.command('sync', synchronizeBookingsAndClientsAndReply);
bot.command('create', parseCommandCreateBookingAndReply);
bot.command(['not_payed', 'prepay', 'prepayment', 'pp', 'npp'], parseCommandFindBookingsNotPrePayedAndReply);
bot.command(['pp_expired', 'expired'], findBookingsRemindedAndExpiredPrepaymentAndReply);

bot.launch()
	.then(() => {
		console.log('⚡ Launched bot');
	})
	.catch(err => {
		console.error('Error at launch', err);
		process.exit(1);
	});

export default bot;
