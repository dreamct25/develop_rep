import proxy from 'http2-proxy'

/**@type {import('snowpack').SnowpackUserConfig}**/
export default {
    mount:{
        public:'/',
        src:'/'
    },
    devOptions:{
        port:9966,
        hostname: 'localhost',
        open:'none'
    },
    plugins:[
        "@snowpack/plugin-vue"
    ],
    routes:[{
        // /api/ entry
        src: '/api/.*',
        dest: (req,res) => {
            // replace /api/ url entry
            req.url = req.url.replace('/api/', '/test_api/')

            // proxy server (like express server)
            return proxy.web(req, res, {
                hostname: 'localhost', // express server hostname
                port: 9870 // express server port
            })
        }
    }]
}