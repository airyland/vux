var langs = [
  {
    title: '简体中文',
    path: '/'
  },
  {
    title: 'English(working)',
    path: '#'
  }
]

self.$config = {
  home: '/zh-CN/README.md',
  repo: 'airyland/vux',
  languages: ['/', '/en'],
  nav: {
    'zh-CN':[{
        title: '首页',
        path: '/zh-CN/README'
      },
      {
        title: '组件',
        type: 'dropdown',
        items: [{
        title: '全部组件',
        path: '/zh-CN/components'
      },{
          title: '表单组件',
          path: '/zh-CN/components_form'
        },
        {
          title: '弹窗提示',
          path: '/zh-CN/components_dialog'
        },
        {
          title: '布局',
          path: '/zh-CN/components_layout'
        },
        {
          title: '样式工具',
          path: '/zh-CN/css'
        }]
      },
      {
        title: 'vux-loader',
        path: '/zh-CN/vux-loader'
      },
      {
        title: '版本更新',
        type: 'dropdown',
        items: [{
          title: '版本更新历史',
          path: '/zh-CN/changes'
        }, {
          title: '更新到v2.x',
          path: '/zh-CN/upgrade-to-2'
        }]
        
      },
      {
        title: 'Languages',
        type: 'dropdown',
        items: langs
      }
    ],
    
    en: [{
        title: 'Home',
        path: '/en/'
      },
      {
        title: 'Components',
        path: '/en/components'
      },
      {
        title: 'Components',
        type: 'dropdown',
        items: [{
          title: 'Form Components',
          path: '/en/components_form'
        },
        {
          title: 'Dialog && Tip',
          path: '/en/components_dialog'
        },
        {
          title: 'Layout',
          path: '/en/components_layout'
        }]
      },
      {
        title: 'vux-loader',
        path: '/en/vux-loader'
      },
      {
        title: 'upgrade to v2.x',
        path: '/en/upgrade-to-2'
      },
      {
        title: 'Languages',
        type: 'dropdown',
        items: langs
      }
    ]

  }
}