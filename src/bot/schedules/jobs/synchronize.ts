import { createSchedule } from '../schedule.helper';
import putSyncBookings from '../../../api/calls/putSyncBookings';
import putSyncClients from '../../../api/calls/putSyncClients';

// every 10 minutes
createSchedule('0 0/10 * * * *', synchronizeBookingsAndClients);

async function synchronizeBookingsAndClients() {
	await putSyncBookings();
	await putSyncClients();
}
