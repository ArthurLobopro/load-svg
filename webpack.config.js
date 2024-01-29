const path = require('path')

/**@type {import('webpack').Configuration}*/
const common = {
    target: "web",
    entry: "./src/index.ts",
    devtool: "source-map",
    resolve: {
        mainFields: ["browser", "module", "main"],
        extensions: [".ts", ".js"],
        alias: {},
        fallback: {}
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
}

/**@type {import('webpack').Configuration[]}*/
const config = [
    {
        ...common,
        output: {
            path: path.resolve(__dirname, "dist/commonjs"),
            filename: "index.js",
            libraryTarget: "commonjs2",
        },
    },
    {
        ...common,
        output: {
            path: path.resolve(__dirname, "dist/esm"),
            filename: "index.js",
            library: {
                type: "module"
            }
        },
        experiments: {
            outputModule: true
        }
    },
]

module.exports = config