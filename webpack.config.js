const path = require('path');

module.exports = env => {

    var outputPath = (env.NODE_ENV == "local") ? path.resolve(__dirname) : path.resolve(__dirname, "prod");

    return {
        mode: 'development',

        entry: {
            main: "./src/main.js",
            sw: "./src/sw.js"
        },
        output: {
            path: outputPath,
            filename: "[name].bundle.js"
        },

        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },

        module: {
            rules: [
                {
                    test: /\.tag$/,
                    exclude: "/node_modules/",
                    use: [{
                        loader: "riot-tag-loader",
                        options: {
                            hot: false
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: "/node_modules/",
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ['babel-preset-env']
                        }
                    }]
                }
            ]
        },

        resolve: {
            alias: {
                config: path.resolve(__dirname, "src", "config", env.NODE_ENV)
            }
        }
    }
    
}