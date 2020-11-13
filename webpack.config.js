const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// To use Dynamic Imports only need to add CHUNK FILE NAME property to an output

let plugins = [
  // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
  // new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'Development',
    template: 'src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: 'styles/main.css',
  }),
];

let optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        name: 'vendor.bundle',
      },
    },
  },
};

module.exports = (env, argv) => {
  function babelConf() {
    if (argv.mode === 'development') {
      return {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      };
    } else {
      return {};
    }
  }

  var bbl = babelConf();

  return {
    mode: argv.mode,
    entry: {
      main: './src/app/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].bundle.js',
      publicPath: '',
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist'),
      stats: {
        maxModules: 5,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(ttf)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[ext]',
            publicPath: '../fonts',
          },
        },
        {
          test: /\.svg$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[ext]',
            publicPath: './fonts',
          },
        },
        {
          test: /\.jpg$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[ext]',
            publicPath: './images',
          },
        },
        bbl, // Babel Config. To transpile code only in production mode
      ],
    },
    plugins,
    optimization,
  };
};
