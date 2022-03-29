#!/usr/bin/env node
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { AmplifyStack } from '../lib/amplify-stack';

const app = new cdk.App();
new AmplifyStack(app, 'FrontendStack');
