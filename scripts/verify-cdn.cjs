#!/usr/bin/env node
'use strict';

const crypto = require('crypto');

const CDN_BASE = (process.env.CDN_BASE || 'https://skillpress-ui.pages.dev/skillpress-ui').replace(/\/+$/, '');
const REQUIRED = [
  'manifest.json',
  'public-api.json',
  'css/dashboard.css',
  'css/demo-minimal.css',
  'js/index.js',
  'fonts/manrope/Manrope-Variable.woff2',
];

function sha384(buf) {
  return 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');
}

async function get(rel, method) {
  const url = `${CDN_BASE}/${rel}`;
  const res = await fetch(url, { method: method || 'GET' });
  const body = method === 'HEAD' ? Buffer.alloc(0) : Buffer.from(await res.arrayBuffer());
  return { rel, url, res, body };
}

function header(res, name) {
  return res.headers.get(name) || '';
}

(async function main() {
  const manifestResp = await get('manifest.json');
  if (manifestResp.res.status !== 200) {
    throw new Error(`manifest.json status=${manifestResp.res.status}`);
  }
  const manifest = JSON.parse(manifestResp.body.toString('utf8'));
  const files = manifest.files || {};

  const failures = [];
  for (const rel of REQUIRED) {
    const item = await get(rel);
    const cache = header(item.res, 'cache-control');
    const acao = header(item.res, 'access-control-allow-origin');
    const type = header(item.res, 'content-type');
    const expected = files[rel] && files[rel].sha384;
    const actual = item.body.length ? sha384(item.body) : '';

    if (item.res.status !== 200) failures.push(`${rel}: status ${item.res.status}`);
    if (!/no-cache/i.test(cache)) failures.push(`${rel}: missing Cache-Control no-cache`);
    if (acao !== '*') failures.push(`${rel}: missing ACAO *`);
    if (expected && actual !== expected) failures.push(`${rel}: sha384 mismatch`);

    process.stdout.write(
      `OK ${rel} (${item.res.status}, ${type || 'no content-type'}, ${item.body.length} bytes)\n`
    );
  }

  if (failures.length) {
    process.stderr.write('\nverify-cdn: FAIL\n');
    for (const failure of failures) process.stderr.write(`  - ${failure}\n`);
    process.exit(1);
  }

  process.stdout.write(`\nverify-cdn: OK ${CDN_BASE} @ ${manifest.version || 'unknown'}\n`);
})().catch(function (err) {
  process.stderr.write(`verify-cdn: ${err && err.stack ? err.stack : err}\n`);
  process.exit(1);
});
