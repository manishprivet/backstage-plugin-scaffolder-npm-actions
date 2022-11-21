# backstage-plugin-scaffolder-npm-actions package

This is a `npm` actions plugin for the `scaffolder-backend` in Backstage.

This contains a collection of actions for using with npm:

- npm:init
- npm:install
- npm:exec

## Prerequisites

- Node and NPM must be installed in the environment your Backstage instance is running in, but it will most likely already be there since your Backstage instance runs in Node.

## Getting started

In the root directory of your Backstage project:

```
yarn add --cwd packages/backend @mdude2314/backstage-plugin-scaffolder-npm-actions
```

Add the actions you'd like to the scaffolder:

```typescript
// packages/backend/src/plugins/scaffolder.ts

import {
  createNpmExecAction,
  createNpmInitAction,
  createNpmInstallAction,
} from '@mdude2314/backstage-plugin-scaffolder-npm-actions';
import { ScmIntegrations } from '@backstage/integration';
import { createBuiltinActions, createRouter } from '@backstage/plugin-scaffolder-backend';

...

const integrations = ScmIntegrations.fromConfig(env.config);
const builtInActions = createBuiltinActions({
  catalogClient,
  integrations,
  config: env.config,
  reader: env.reader
});

const actions = [
    createNpmExecAction(),
    createNpmInitAction(),
    createNpmInstallAction(),
  ...builtInActions
];

return await createRouter({
  logger: env.logger,
  config: env.config,
  database: env.database,
  reader: env.reader,
  catalogClient,
  actions
});
```

## Example of using each of the three actions:

```yaml
---
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: npm-demo
  title: My npm demo template
  description: Run npm commands in the task's working directory
spec:
  owner: mdude2314
  type: service

  parameters:
    - title: Npm init
      properties:
        packageToInstall:
          title: Package to install
          type: string
          description: The name of the npm package to install
        execArgs:
          title: Args for exec
          type: array
          description: Arguments to pass to the exec command

  steps:
    - id: npm-init
      name: init
      action: npm:init

    - id: npm-install
      name: install
      action: npm:install
      input:
        packageToInstall: ${{ parameters.packageToInstall }}

    - id: npm-exec
      name: exec
      action: npm:exec
      input:
        args: ${{ parameters.packageToInstall }}
```
