module.exports = {
  runtimeCompiler: true,
  configureWebpack: config => {
  	require('@vux/loader').merge(config, {
  	  	plugins: ['vux-ui', {
  	  		name: 'less-theme',
  	  		path: 'src/theme.less'
  	  	}]
  	})
  }
}
