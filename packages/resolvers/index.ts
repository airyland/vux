import { resolve } from 'path'

/**
 * Convert string to kebab-case
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
}

/**
 * Vux component resolver for unplugin-vue-components
 * Enables auto-importing components like <vux-button /> or <VuxButton />
 */
export function VuxResolver() {
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      // Handle both 'vux-button' and 'VuxButton' naming
      const normalizedName = name.startsWith('vux-') ? name : `vux-${kebabCase(name).replace(/^vux-/, '')}`

      // Map of available components
      const componentMap: Record<string, string> = {
        'vux-button': resolve(__dirname, '../button/src/index.vue'),
        'vux-icon': resolve(__dirname, '../icon/src/index.vue'),
        'vux-loading': resolve(__dirname, '../loading/src/index.vue'),
      }

      // Check if the component exists
      const componentPath = componentMap[normalizedName] || componentMap[name]

      if (componentPath) {
        return {
          import: `defineAsyncComponent(() => import('${componentPath}'))`,
          sideEffects: getSideEffects(normalizedName)
        }
      }

      // For Button, Icon, Loading without vux prefix
      if (name === 'Button' || name === 'Icon' || name === 'Loading') {
        const pathMap: Record<string, string> = {
          'Button': '../button/src/index.vue',
          'Icon': '../icon/src/index.vue',
          'Loading': '../loading/src/index.vue'
        }
        return {
          import: `defineAsyncComponent(() => import('${pathMap[name]}'))`,
          sideEffects: getSideEffects(`vux-${kebabCase(name)}`)
        }
      }
    }
  }
}

function getSideEffects(componentName: string): string | undefined {
  // Map components to their style side effects
  const styleMap: Record<string, string> = {
    'vux-button': '@vux/theme-chalk/button.scss',
    'vux-icon': '@vux/theme-chalk/icon/icon.scss',
    'vux-loading': '@vux/theme-chalk/loading.scss'
  }
  return styleMap[componentName]
}
