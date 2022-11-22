import {
  createTemplateAction,
  executeShellCommand,
} from '@backstage/plugin-scaffolder-backend';
import { getNpmCommand } from '../../utils/getNpmCommand';

export function createNpmExecAction() {
  return createTemplateAction<{ arguments: string[] }>({
    id: 'npm:exec',
    description:
      'Runs npm exec with the given arguments in the task workspace directory',
    supportsDryRun: true,
    schema: {
      input: {
        type: 'object',
        required: ['arguments'],
        properties: {
          arguments: {
            title: 'Arguments',
            description: 'The arguments to pass to the npm exec command',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    async handler(ctx) {
      try {
        console.log(`Running npm exec in ${ctx.workspacePath}`);
        ctx.logger.info(`Running npm exec in ${ctx.workspacePath}`);
        ctx.logger.info(`Input: ${ctx.input.arguments}`);

        const npm = getNpmCommand(ctx);

        ctx.logger.info(
          `OS platform is ${process.platform}, using '${npm}' as command`,
        );

        await executeShellCommand({
          command: npm,
          args: ['exec', ...ctx.input.arguments],
          logStream: ctx.logStream,
          options: { cwd: ctx.workspacePath },
        });

        console.log('Done running npm exec');
        ctx.logger.info(`Done running npm exec`);
      } catch (err) {
        console.error(err);
        ctx.logger.error(err);
        throw err;
      }
    },
  });
}
