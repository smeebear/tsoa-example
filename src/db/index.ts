import mongoose from 'mongoose';

const {
	DEV = "true",
	DB_URL = "localhost:27017",
	DB_USER = "admin",
	DB_PASS = "password",
	DB_NAME = "tsoa-test",
	DB_RETRY,
	DB_RETRY_INTERVAL = '3000',
	DB_RETRY_ATTEMPTS = '1',
} = process.env;

const dbConn = encodeURI(`mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`);

mongoose.set('debug', !!DEV);

export const configure = async () => {
	let retry: boolean = DB_RETRY == 'true';
	let retries = 0;

	do {
		if (retries > parseInt(DB_RETRY_ATTEMPTS)) {
			console.log(
				`Failed to connect to DB. It's either down or the network is having issues. Exiting...`,
			);
			return process.exit(1);
		}

		try {
			let db = await mongoose.connect(dbConn, {
				dbName: DB_NAME,
			});
			console.log('DB connection made successfully.');
			return db.connection.getClient();
		} catch (err: any) {
			if (err.message.match(/failed to connect to server .* on first connect/) && retry) {
				console.log(
					`Failed to connect to DB for first time. Retrying attempt #${++retries}`,
				);
				await new Promise((resolve) => setTimeout(resolve, parseInt(DB_RETRY_INTERVAL)));
				continue;
			}

			console.error('Unknown db error: ', err);
			return process.exit(1);
		}
		retry = false;
	} while (retry);
    return;
};
