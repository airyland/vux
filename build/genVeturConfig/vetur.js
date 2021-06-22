function genVeturTags(tags) {
  const veturTags = {};

  tags.forEach(tag => {
    veturTags[tag.name] = {
      attributes: tag.attributes ? tag.attributes.map(item => item.name) : [],
    };
  });

  return veturTags;
}

function genVeturAttributes(tags) {
  const veturAttributes = {};

  tags.forEach(tag => {
    if (tag.attributes) {
      tag.attributes.forEach(attr => {
        veturAttributes[`${tag.name}/${attr.name}`] = {
          type: attr.value.type,
          description: `${attr.description}, 默认值: ${attr.default}`,
        };
      });
    }
  });

  return veturAttributes;
}

module.exports = {
  genVeturTags,
  genVeturAttributes
}