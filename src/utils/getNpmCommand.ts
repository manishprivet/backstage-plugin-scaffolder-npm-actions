import { ActionContext } from '@backstage/plugin-scaffolder-backend';

export const getNpmCommand = (ctx: ActionContext<any>) => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  ctx.logger.info(
    `OS platform is ${process.platform}, using '${npm}' as command`,
  );

  return npm;
};
