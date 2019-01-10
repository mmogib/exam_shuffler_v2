module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'mshahrani.shuffler.app',
        productName: 'shuffler',
        icon: './src/assets/icon.png',
        target: 'win',
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        publish: {
          provider: 'github',
          owner: 'Dr. Mohammed Alshahrani',
          vPrefixedTagName: true,
          token: process.env.GH_TOKEN,
          private: true,
          publishAutoUpdate: true
        }
      }
    }
  }
}
