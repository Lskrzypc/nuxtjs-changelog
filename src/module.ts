import { defineNuxtModule, createResolver, extendPages, addServerHandler } from '@nuxt/kit'
import { join } from 'node:path'

export interface ModuleOptions {
  filepath: string
  locale?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxtjs-changelog',
    configKey: 'changelog',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    filepath: './changelog.json',
    locale: 'en',
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    const fullPath = join(_nuxt.options.rootDir, _options.filepath)
    _nuxt.options.runtimeConfig.changelogFilePath = fullPath

    addServerHandler({
      route: '/api/_changelog',
      handler: resolver.resolve('./runtime/server/api/changelog.get'),
    })

    extendPages((pages) => {
      pages.push({
        name: 'changelog',
        path: '/changelog',
        file: resolver.resolve('./runtime/pages/changelog.vue'),
      })
    })
  },
})
