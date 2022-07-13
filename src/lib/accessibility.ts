const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
const fs = require ("fs");
const lighthouse = require ("lighthouse");
const chromeLauncher = require ("chrome-launcher");