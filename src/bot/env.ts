import dotenv from 'dotenv';
import { getOsEnvArray } from '../utils/path.helper';

dotenv.config();

const _env = process.env;

export function getEnv(key: string): string {
	const val = _env[key];
	if (!val) {
		console.warn('Missing env variable', key);
	}
	return _env[key] ?? '';
}

interface Env {
	pmsAdapterUrl: string;
	xSecHeader: string;
	botToken: string;
	telegramIds: string[];
}

const env: Env = {
	pmsAdapterUrl: getEnv('PMS_ADAPTER_URL'),
	xSecHeader: getEnv('X_SEC_HEADER'),
	botToken: getEnv('BOT_TOKEN'),
	telegramIds: getOsEnvArray('TELEGRAM_IDS')
};

export default env;
