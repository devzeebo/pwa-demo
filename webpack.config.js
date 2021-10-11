const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

const root = path.join(__dirname, 'src');
const outputPath = path.join(__dirname, 'dist');

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(root, 'index.html'),
  inject: 'head',
});

const tsPathsPlugin = new TsConfigPathsWebpackPlugin();

const pwaPlugin = new WebpackPwaManifest({
  name: 'PWA Demo - Clocks',
  short_name: 'PWADemo',
  description: 'Small sample app showing PWA setup',
  background_color: '#ffffff',
  icons: [
    { 
      src: path.resolve(__dirname, 'insightful-energy.svg'),
      size: '1024x1024',
      purpose: 'maskable',
    },
    { 
      src: path.resolve(__dirname, 'insightful-energy.svg'),
      size: '1024x1024',
      purpose: 'any',
    },
  ],
});

const injectPlugin = new InjectManifest({
  swSrc: path.resolve(root, 'serviceWorker.ts'),
  swDest: path.resolve(outputPath, 'sw.js'),
  maximumFileSizeToCacheInBytes: 1e+7,
});

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
    pwaPlugin,
    injectPlugin,
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
    // https: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
