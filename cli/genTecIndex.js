const package = require('../package.json');
const config = require('../vux-config.json');
const path = require('path');
const { outputFileSync } = require('fs-extra');

function genTecIndex () {
  let importStr = `import { App } from 'vue';\n`;
  const packages = [];
  config.nav.map(item => {
    item.packages.forEach(element => {
      let { name, show, type } = element;
      if (show) {
        importStr += `import ${name} from '../${name.toLowerCase()}/index';\n`;
        packages.push(name);
      }
    });
  });
  let installFunction = `function install(app: App) {
    const packages = [${packages.join(',')}];
    packages.forEach((item: any) => {
      app.component(item.name, item);
    });
  }`;
  let fileStr = `${importStr}
  ${installFunction}
  export { ${packages.join(',')}  };
  export default install;`;
  outputFileSync(path.resolve(__dirname, '../packages/vux/index.ts'), fileStr)
}

module.exports = {
  genTecIndex
}