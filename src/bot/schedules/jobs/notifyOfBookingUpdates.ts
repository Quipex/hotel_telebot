import localDb from '../../db';
import { createSchedule } from '../schedule.helper';
import moment from 'moment';

createSchedule('0 */10 * * * *', updateReminder);

async function updateReminder() {
	await localDb.read();
	localDb.data!.lastUpdateNotification = moment().toISOString();
	await localDb.write();
}
