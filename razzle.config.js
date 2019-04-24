const path = require('path')
const modifyBuilder = require('razzle-plugin-pwa').default

const pwaConfig = {
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [{
        urlPattern: new RegExp('https://webimg.kgimg.com'),
        handler: 'networkFirst'
    }]
}

const manifestConfig = {
    filename: 'manifest.json',
    name: 'Razzle App',
    short_name: 'Razzle',
    description: 'Another Razzle App',
    orientation: 'portrait',
    display: 'fullscreen',
    start_url: '.',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    related_applications: [],
    icons: [
        {
            'src': require.resolve(path.join(__dirname, 'public', 'favicon.ico')),
            'sizes': '16x16',
            'type': 'image/png'
        },
        // {
        //     'src': require.resolve(path.join(__dirname, 'public', 'favicon-32x32.png')),
        //     'sizes': '32x32',
        //     'type': 'image/png'
        // },
        // {
        //     'src': require.resolve(path.join(__dirname, 'public', 'favicon-144x144.png')),
        //     'sizes': '144x144',
        //     'type': 'image/png'
        // },
        // {
        //     'src': require.resolve(path.join(__dirname,'public', 'android-chrome-192x192.png')),
        //     'sizes': '192x192',
        //     'type': 'image/png'
        // },
        // {
        //     'src': require.resolve(path.join(__dirname, 'public', 'android-chrome-512x512.png')),
        //     'sizes': '512x512',
        //     'type': 'image/png'
        // }
    ]
}

const modify = modifyBuilder({ pwaConfig, manifestConfig })

module.exports = {
    plugins: [{ func: modify }],
};
