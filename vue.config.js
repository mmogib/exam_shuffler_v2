module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'mshahrani.shuffler.app',
        productName: 'shuffler',
        icon: './src/assets/icon.png',
        win: {
          target: [
            {
              target: 'nsis',
              arch: ['x64', 'ia32']
            }
          ]
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },

        publish: {
          provider: 'github',
          owner: 'mmogib',
          vPrefixedTagName: true,
          //token: process.env.GH_TOKEN,
          publishAutoUpdate: true
        }
      }
    }
  }
}
