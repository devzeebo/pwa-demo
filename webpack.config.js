const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

const root = path.join(__dirname, 'src');
const outputPath = path.join(__dirname, 'dist');

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(root, 'index.html'),
  inject: 'head',
});

const tsPathsPlugin = new TsConfigPathsWebpackPlugin();

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    pathinfo: false,
    path: path.resolve(outputPath),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  entry: {
    main: [
      path.join(root, 'index.tsx'),
    ],
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [
      tsPathsPlugin,
    ],
  },
  plugins: [
    htmlPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: root,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    https: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
