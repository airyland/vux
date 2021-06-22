module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.ts$": "<rootDir>/node_modules/ts-jest" // ts 文件用 ts-jest 转换
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
  testMatch: ['<rootDir>/packages/**/__test__/*.spec.(js|ts|jsx|tsx)'],
  //testRegex: '__tests__.action.spec.ts',
  // 支持源代码中相同的 `@` -> `src` 别名
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1'
  // }
};
