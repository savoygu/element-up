module.exports = {
  presets: [
    [
      '@vue/app',
      {
        loose: true,
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        },
        jsx: true
      }
    ],
    '@babel/env'
  ],
  plugins: [
    ['module-resolver', {
      root: ['node_modules/element-ui'],
      alias: {
        'element-ui/packages': 'element-ui/lib',
        'element-ui/src': 'element-ui/lib'
      }
    }],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ],
  env: {
    utils: {
      presets: [
        [
          '@vue/app',
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
    }
  }
}
