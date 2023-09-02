const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');

const tsconfigFile = __dirname + '/tsconfig.json';

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    Code: './Code.ts',
  },
  output: {
    path: __dirname + '/../dist',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: tsconfigFile,
      },
    }),
    new GasPlugin(),
    // copy appsscript.json to dist dir
    new CopyWebpackPlugin({
      patterns: [{ from: './appsscript.json' }, { from: './setting.js' }],
    }),
  ],
  optimization: {
    minimize: false,
  },
};
