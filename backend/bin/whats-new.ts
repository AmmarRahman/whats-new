#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { PresentationStack } from '../lib/presentation-stack';
import { ScraperStack } from '../lib/scraper-stack';

const app = new cdk.App();
const scraper = new ScraperStack(app, 'ScraperStack');
const presentation = new PresentationStack(app, 'PresentationStack', scraper.dbTable);
