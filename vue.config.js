module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'mshahrani.shuffler.app',
        productName: 'Shuffler',
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
          repo: 'exam_shuffler_v2',
          vPrefixedTagName: true,
          //token: process.env.GH_TOKEN,
          //private: true,
          releaseType: 'release',
          publishAutoUpdate: true
        }
      }
    }
  }
}
