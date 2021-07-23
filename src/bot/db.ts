import { join } from 'path';
import { Low, JSONFile } from 'lowdb';

type LocalDbData = {
	lastUpdateNotification: string
}

// Use JSON file for storage
const adapter = new JSONFile<LocalDbData>('data/app.db.json');
const localDb = new Low(adapter);

localDb.read()
	.then(() => {
		console.log('Read the contents of local db');
	})
	.catch(e => {
		console.error('Failed to read the contents of local db', e);
		process.exit(1);
	});

export default localDb;
