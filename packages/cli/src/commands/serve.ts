import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

export const serveCommand = new Command()
	.command('serve [filename]')
	.description('Open a file for editing')
	.option('-p, --port <number>', 'port to run server on', '4005')
	.action((filename = 'notebook.js', options: { port: string }) => {
		let { port } = options;
		const dir = path.join(process.cwd(), path.dirname(filename));

		if (port.charAt(0) === '=') {
			port = port.substring(1);
		}

		serve(parseInt(port), path.basename(filename), dir);
	});
