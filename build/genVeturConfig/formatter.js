/* eslint-disable no-continue */
const { formatType, removeVersion, toKebabCase } = require('../common')

function getComponentName(artical, tagPrefix) {
  if (artical.content) {
    return tagPrefix + toKebabCase(artical.content.split(' ')[0]);
  }
  return '';
}

function formatter(articals, tagPrefix = '') {
  if (!articals.length) {
    return;
  }

  const tag = {
    name: getComponentName(articals[0], tagPrefix),
    slots: [],
    events: [],
    attributes: [],
  };

  const tables = articals.filter(artical => artical.type === 'table');

  tables.forEach(item => {
    const { table } = item;
    const prevIndex = articals.indexOf(item) - 1;
    const prevArtical = articals[prevIndex];

    if (!prevArtical || !prevArtical.content || !table || !table.body) {
      return;
    }

    const tableTitle = prevArtical.content;

    if (tableTitle.includes('Props')) {
      table.body.forEach(line => {
        const [name, desc, type, defaultVal] = line;
        tag.attributes.push({
          name: removeVersion(name),
          default: defaultVal,
          description: desc,
          value: {
            type: formatType(type),
            kind: 'expression',
          },
        });
      });
      return;
    }

    if (tableTitle.includes('Events')) {
      table.body.forEach(line => {
        const [name, desc] = line;
        tag.events.push({
          name: removeVersion(name),
          description: desc,
        });
      });
      return;
    }

    if (tableTitle.includes('Slots')) {
      table.body.forEach(line => {
        const [name, desc] = line;
        tag.slots.push({
          name: removeVersion(name),
          description: desc,
        });
      });
    }
  });

  return tag;
}

module.exports = {
  formatter
}