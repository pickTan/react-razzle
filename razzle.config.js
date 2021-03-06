const modifyBuilder = require('razzle-plugin-pwa').default
const modifyMPA = require('./lib/mpa-razzle-modifictions')

const pwaConfig = {
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [{
    urlPattern: new RegExp('https://webimg.kgimg.com'),
    // handler: 'networkFirst'
    handler: 'cacheOnly'
  }]
}

const manifestConfig = {
  // filename: 'manifest.json',
  // name: 'Razzle App',
  // short_name: 'Razzle',
  // description: 'Another Razzle App',
  // orientation: 'portrait',
  // display: 'fullscreen',
  // start_url: '.',
  // theme_color: '#ffffff',
  // background_color: '#ffffff',
  // related_applications: [],
  // icons: [
  //   {
  //     'src': require.resolve(path.join(__dirname, 'public', 'favicon.ico')),
  //     'sizes': '16x16',
  //     'type': 'image/png'
  //   },
  // ]
}

const modify = modifyBuilder({ pwaConfig, manifestConfig })


module.exports = {

  plugins: [{ func: modify },modifyMPA],
};
