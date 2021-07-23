import { schedule, ScheduleOptions } from 'node-cron';
import moment from 'moment';

const time = () => moment().format('llll');

export function createSchedule(cronExpression: string, func: () => void, options?: ScheduleOptions) {
	schedule(cronExpression, () => {
		console.log(`Running schedule '${func.name}' at ${time()}`);
		try {
			func();
		} catch (e) {
			console.error(`Got an error while running schedule '${func.name}' at ${time()}`, e);
		} finally {
			console.log(`Schedule '${func.name}' finished at ${time()}`);
		}
	}, { timezone: 'Europe/Kiev', ...options });
}
