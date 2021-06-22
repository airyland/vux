// 创建模板

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const config = require('../vux-config.json');
const { outputFileSync, readFileSync }  = require('fs-extra')
const demoModel = require('./demo');
const nav = config.nav;
const { genTecIndex } = require('./genTecIndex')

var newCpt = {
  version: '3.0.0',
  name: '',
  type: '',
  cName: '',
  desc: '',
  sort: '',
  show: true,
  author: ''
};
function init() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: '组件英文名(每个单词的首字母都大写，如TextBox)：',
        validate(value) {
          let repeat = false;
          for (var i = 0; i < nav.length; i++) {
            for (var j = 0; j < nav[i].packages.length; j++) {
              if (nav[i].packages[j].name === value) {
                repeat = true;
              }
            }
          }

          if (repeat) {
            return '该组件名已存在！';
          }
          const pass = value && value.match(/^[A-Z]/);
          if (pass) {
            return true;
          }
          return '不能为空，且每个单词的首字母都要大写，如TextBox';
        }
      },
      {
        type: 'input',
        name: 'cName',
        message: '组件中文名(十个字以内)：',
        validate(value) {
          const pass = value && value.length <= 10;
          if (pass) {
            return true;
          }
          return '不能为空，且不能超过十个字符';
        }
      },
      {
        type: 'input',
        name: 'desc',
        message: '组件描述(五十个字以内)：'
      },
      {
        type: 'rawlist',
        name: 'type',
        message: '请选择组件类型(输入编号)：目前只支持组建模板',
        choices: ['component', 'filter', 'directive', 'method'],
        validate(value) {
          const pass = value && /^[1-4]$/.test(value);
          if (pass) {
            return true;
          }
          return '输入有误！请输入选项前编号';
        }
      },
      {
        type: 'input',
        name: 'sort',
        message:
          '请选择组件分类(输入编号)：1布局组件，2操作反馈，3基础组件，4导航组件，5数据录入，6业务组件',
        validate(value) {
          const pass = /^[1-6]$/.test(value);
          if (pass) {
            return true;
          }
          return '输入有误！请输入选项前编号';
        }
      },
      {
        type: 'input',
        name: 'author',
        message: '组件作者(可署化名):',
        validate(value) {
          if (value) {
            return true;
          }
          return '不能为空, 请输入作者名词';
        }
      }
    ])
    .then(function(answers) {
      newCpt = Object.assign(newCpt, answers);
      createNew();
    });
}
function createIndexJs() {
  const nameLc = newCpt.name.toLowerCase();
  const destPath = path.join('packages/' + nameLc);
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
  }
  if (newCpt.type == 'method') return;
  return new Promise((resolve, reject) => {
    resolve(`生成index.js文件成功`);
  });
}

function createVue() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase();
    let content = demoModel(nameLc).vue;
    const dirPath = path.join(__dirname, `../packages/${nameLc}/src/`);
    const filePath = path.join(dirPath, `index.vue`);
    outputFileSync(filePath, content)
    resolve(`生成${newCpt.name}.vue文件成功`);
  });
}

function createDemo() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase();
    let content = demoModel(nameLc).demo;
    const dirPath = path.join(__dirname, '../packages/' + nameLc);
    const filePath = path.join(dirPath, `demo.vue`);
    outputFileSync(filePath, content)
    resolve(`生成demo.vue文件成功`);
  });
}

function createIndex () {
  // 创建组件的入口文件
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase();
    let content = demoModel(newCpt.name).index;
    const dirPath = path.join(__dirname, '../packages/' + nameLc);
    const filePath = path.join(dirPath, `index.ts`);
    outputFileSync(filePath, content)
    resolve(`生成demo.vue文件成功`);
  });
}

function addToPackageJson() {
  return new Promise((resolve, reject) => {
    let sort = newCpt.sort;
    newCpt.sort = nav[sort - 1].packages.length + 1;
    nav[sort - 1].packages.push(newCpt);
    config.nav = nav;
    const dirPath = path.join(__dirname, `../`);
    const filePath = path.join(dirPath, `vux-config.json`);
    const tempfile = JSON.stringify(config, null, 2);
    outputFileSync(filePath, tempfile)
    genTecIndex()
    resolve(`修改vux-config.json文件和入口文件成功`);
  });
}
function createScss() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase();
    let content = `.vux-${nameLc} {}`;
    const dirPath = path.join(__dirname, '../packages/theme-chalk');
    const name = `${nameLc}.scss`
    const filePath = path.join(dirPath, name);
    outputFileSync(filePath, content)
    resolve(`.scss文件生成成功`);
    // 修改index.scss
    updateIndexScss(name)
  });
}

function updateIndexScss (name) {
  const dirPath = path.join(__dirname, '../packages/theme-chalk');
  const filePath = path.join(dirPath, 'index.scss')
  let content = readFileSync(filePath, 'utf-8')
  content = content + `
@import './${name}';
  `
  outputFileSync(filePath, content)
  resolve(`index.scss文件修改成功`);
}

function createDoc() {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase();
    const author = newCpt.author || ''
    const desc = newCpt.desc || ''
    let content = demoModel(nameLc, author, desc).doc;
    const dirPath = path.join(__dirname, '../packages/' + nameLc);
    const filePath = path.join(dirPath, `doc.md`);
    outputFileSync(filePath, content)
    resolve(`doc.md文件成功`);
  });
}
function createPackage () {
  return new Promise((resolve, reject) => {
    const nameLc = newCpt.name.toLowerCase();
    const author = newCpt.author || ''
    let content = demoModel(nameLc, author).package;
    const dirPath = path.join(__dirname, '../packages/' + nameLc);
    const filePath = path.join(dirPath, `package.json`);
    outputFileSync(filePath, content)
    resolve(`package.json文件成功`);
  });
}
function createNew() {
  createIndexJs()
    .then(() => {
      // 创建vue文件
      if (newCpt.type == 'component' || newCpt.type == 'method') {
        return createVue();
      } else {
        return;
      }
    })
    .then(() => {
      // 创建入口文件
      return createIndex()
    })
    .then(() => {
      // 创建demo
      return createDemo();
    })
    .then(() => {
      // 创建文档
      return createDoc();
    })
    .then(() => {
      // 修改配置文件
      return addToPackageJson();
    }).then(() => {
      // 创建package.json
      return createPackage()
    })
    .then(() => {
      console.log('组件模板生成完毕，请开始你的表演~');
      process.exit();
    });
}
function createComponent() {
  init();
}
createComponent();
