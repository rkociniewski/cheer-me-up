import { App } from '@serverless-stack/resources';
import { UserStack } from './User';
import { AuthStack } from './Auth';

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: 'nodejs16.x',
    srcPath: 'services',
    bundle: {
      format: 'esm',
    },
  });
  app.stack(AuthStack).stack(UserStack);
}
