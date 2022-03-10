#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { ScraperStack } from '../lib/scraper-stack';

const app = new cdk.App();
new ScraperStack(app, 'ScraperStack');