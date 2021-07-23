import glob from 'glob';
import path from 'path';

glob.sync(`${__dirname}/**/jobs/**/*.ts`).forEach(file => {
	require(path.resolve(file));
});
