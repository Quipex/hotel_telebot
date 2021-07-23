import { Context } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/telegram-types';
import {
	bookingDetails,
	bookingLivingAsk,
	bookingLivingConfirm,
	bookingPrePaidAsk,
	bookingPrePaidConfirm,
	bookingRefresh,
	bookingRemindedPrepayment,
	cancel,
	clientBookings,
	clientDetails,
	clientRefresh
} from './callback_actions';
import { sendBookingDetails } from './handlers/booking/sendBookingDetails';
import { confirmBookingAndReply } from './handlers/booking/confirmBooking';
import { setRemindedPrepaymentAndReply } from './handlers/booking/remindedPrepayment';
import { confirmLivingAndReply } from './handlers/booking/confirmLiving';
import askForConfirmation, { cancelAction, extractMessageId } from './handlers/askConfirmation';
import { refreshBooking } from './handlers/booking/refreshBooking';
import { refreshClient } from './handlers/client/refreshClient';
import { findClientBookings } from './handlers/client/findClientBookings';
import { sendClientDetails } from './handlers/client/sendClientDetails';

async function handleCallbackQueries(ctx: Context) {
	const { data, message: { message_id } } = ctx.update.callback_query as CallbackQuery;
	await handleCallbackQuery(ctx, { callbackData: data.split('|'), message_id });
}

async function handleCallbackQuery(ctx: Context, callback: { callbackData: string[]; message_id: number; }) {
	console.log('callback data', callback);
	const dataArray = callback.callbackData;
	const action = dataArray[0];
	const firstArgument = dataArray[1];
	const lastArgument = dataArray[dataArray.length - 1];
	switch (action) {
		case cancel: {
			await cancelAction(ctx);
			break;
		}
		case bookingDetails: {
			await sendBookingDetails(ctx, firstArgument, callback.message_id);
			break;
		}
		case bookingPrePaidAsk: {
			await askForConfirmation({
				ctx,
				action: bookingPrePaidConfirm,
				args: [firstArgument],
				messageId: callback.message_id,
				confirmationMessage: 'Предоплата'
			});
			break;
		}
		case bookingPrePaidConfirm: {
			await confirmBookingAndReply(ctx, firstArgument, extractMessageId(lastArgument));
			break;
		}
		case bookingRemindedPrepayment: {
			await setRemindedPrepaymentAndReply(ctx, firstArgument);
			break;
		}
		case bookingLivingAsk: {
			await askForConfirmation({
				ctx,
				action: bookingLivingConfirm,
				args: [firstArgument],
				messageId: callback.message_id,
				confirmationMessage: 'Проживание'
			});
			break;
		}
		case bookingLivingConfirm: {
			await confirmLivingAndReply(ctx, firstArgument, extractMessageId(lastArgument));
			break;
		}
		case bookingRefresh: {
			await refreshBooking(ctx, firstArgument);
			break;
		}
		case clientDetails: {
			await sendClientDetails(ctx, firstArgument, callback.message_id);
			break;
		}
		case clientRefresh: {
			await refreshClient(ctx, firstArgument);
			break;
		}
		case clientBookings: {
			await findClientBookings(ctx, firstArgument, callback.message_id);
			break;
		}
	}
}

export default handleCallbackQueries;
