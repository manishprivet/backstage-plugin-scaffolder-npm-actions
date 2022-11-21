import { PassThrough } from 'stream';
import { createNpmInstallAction } from './install';
import { getVoidLogger } from '@backstage/backend-common';
import { executeShellCommand } from '@backstage/plugin-scaffolder-backend';

jest.mock('@backstage/plugin-scaffolder-backend', () => ({
  ...jest.requireActual('@backstage/plugin-scaffolder-backend'),
  executeShellCommand: jest.fn(),
}));

describe('npm:install', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call action', async () => {
    const action = createNpmInstallAction();

    const logger = getVoidLogger();

    await action.handler({
      input: { packageToInstall: 'test' },
      workspacePath: '/tmp',
      logger,
      logStream: new PassThrough(),
      output: jest.fn(),
      createTemporaryDirectory() {
        throw new Error('Not implemented');
      },
    });

    expect(executeShellCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        command: expect.stringContaining('npm'),
        args: expect.arrayContaining(['install']),
      }),
    );
  });

  it('should call action with proper package to install', async () => {
    const action = createNpmInstallAction();

    const logger = getVoidLogger();
    const packageToInstallString = 'my-package';

    await action.handler({
      input: { packageToInstall: packageToInstallString },
      workspacePath: '/tmp',
      logger,
      logStream: new PassThrough(),
      output: jest.fn(),
      createTemporaryDirectory() {
        throw new Error('Not implemented');
      },
    });

    expect(executeShellCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        command: expect.stringContaining('npm'),
        args: expect.arrayContaining(['install', packageToInstallString]),
      }),
    );
  });
});
