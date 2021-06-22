const { ROOT, normalizePath, deepGet, VETUR_DIR, VUX_CONFIG_FILE, PACKAGE_FILE } = require('./common')
const glob = require('fast-glob')
const { join } = require('path')
const { mdParser } = require('./genVeturConfig/parseMd')
const { formatter } = require('./genVeturConfig/formatter')
const { readFileSync, outputFileSync } = require('fs-extra')
const { genWebTypes } = require('./genVeturConfig/web-types')
const { genVeturTags, genVeturAttributes } = require('./genVeturConfig/vetur')

async function readMarkdown(options) {
  const mds = await glob(normalizePath(`${options.path}/**/*.md`));
  return mds
    .map(path => readFileSync(path, 'utf-8'));
}

async function parseAndWrite(options) {
  if (!options.outputDir) {
    throw new Error('outputDir can not be empty.');
  }

  const mds = await readMarkdown(options);
  const datas = mds
    .map(md => formatter(mdParser(md), options.tagPrefix))
    .filter(item => !!item)

  const webTypes = genWebTypes(datas, options);
  const veturTags = genVeturTags(datas);
  const veturAttributes = genVeturAttributes(datas);

  outputFileSync(
    join(options.outputDir, 'tags.json'),
    JSON.stringify(veturTags, null, 2)
  );
  outputFileSync(
    join(options.outputDir, 'attributes.json'),
    JSON.stringify(veturAttributes, null, 2)
  );
  outputFileSync(
    join(options.outputDir, 'web-types.json'),
    JSON.stringify(webTypes, null, 2)
  );
}

const options = deepGet(VUX_CONFIG_FILE, 'build.vetur');

parseAndWrite({
  name: VUX_CONFIG_FILE.name,
  path: `${ROOT}`,
  version: PACKAGE_FILE.version,
  outputDir: VETUR_DIR,
  ...options,
})
