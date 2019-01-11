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
          owner: 'Dr. Mohammed Alshahrani',
          vPrefixedTagName: true,
          token: '7d8f464c693e7e0853dab4f761760b1a05eb529f',
          private: true,
          publishAutoUpdate: true
        }
      }
    }
  }
}
