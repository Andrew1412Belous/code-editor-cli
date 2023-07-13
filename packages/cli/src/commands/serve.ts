import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

interface LocalApiError {
	code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
	.command('serve [filename]')
	.description('Open a file for editing')
	.option('-p, --port <number>', 'port to run server on', '4005')
	.action(async (filename = 'notebook.js', options: { port: string }) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === 'string';
		};

		try {
			let { port } = options;
			const dir = path.join(process.cwd(), path.dirname(filename));

			if (port.charAt(0) === '=') {
				port = port.substring(1);
			}

			await serve(parseInt(port), path.basename(filename), dir, !isProduction);

			console.log(`Opened ${filename}. Navigate to http://localhost:${port} to edit the file`);
		} catch (err) {
			if (isLocalApiError(err)) {
				if (err.code === 'EADDRINUSE') {
					console.error('Port is in use. Try running on a different port.');
				}
			} else if (err instanceof Error) {
				console.log('Here the problem', err.message);
			}

			process.exit(1);
		}
	});
