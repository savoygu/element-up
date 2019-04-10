module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
      }
    ],
    '@vue/jsx'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        'element-ui/packages': 'element-ui/lib',
        'element-ui/src': 'element-ui/lib'
      }
    }]
  ],
  env: {
    utils: {
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: 'commonjs',
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
            }
          }
        ]
      ],
      plugins: [
        ['module-resolver', {
          root: ['element-up'],
          alias: {
            'element-up/src': 'element-up/lib'
          }
        }]
      ]
    },
    test: {
      plugins: ['istanbul']
    },
    examples: {
      presets: [
        '@vue/app'
      ],
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    theme: {
      presets: ['@babel/env']
    }
  }
}
