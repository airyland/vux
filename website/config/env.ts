type EnvConfig = {
  baseUrl: string;
  isPrd: boolean;
};

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * articleUrl: 文章地址
 */

const config: EnvConfig = {
  baseUrl: '',
  isPrd: true // 是否为线上
};
switch (import.meta.env.MODE) {
  case 'development':
    /*
     * 开发环境    => npm run dev
     */
    config.isPrd = false;
    config.baseUrl = '/devServer';
    break;
  case 'production':
    /*
     * 线上环境 => npm run build
     */
    config.isPrd = true;
    config.baseUrl = 'http://nutui-server.jd.com';
    break;
}
export default config;
