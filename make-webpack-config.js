var path = require('path');
var webpack = require('webpack');
var extend = require('extend-shallow');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var loadersByExtension = require('./config/loaders-by-extension');
var bundlePath = [ path.join(__dirname, 'lib/index.js') ];
var entry = {};
var key = 'build';

module.exports = function(options) {
  var devScripts = [
    //'webpack-dev-server/client?http://localhost:' + options.port,
    'webpack/hot/only-dev-server',
  ];

  var loaders = [
      { test: /\.html$/, loader: 'handlebars-loader' },
      { test: /\.js$/, include: ( new RegExp(path.join(process.cwd(), 'lib/utils')) ), loader: 'babel-loader'}
  ];

  var stylesheetLoaders = {
    'scss|css': [
      'style-loader',
      'css-loader',
      'autoprefixer-loader?browsers=last 2 version',
      'sass-loader?imagePath=~stylesheets/blocks&' +
      'includePaths[]=' + (require('node-bourbon').includePaths) +
      '&includePaths[]=' + (path.resolve(__dirname, './node_modules/normalize-libsass'))
    ]
  };

  var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({output: {comments: false}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[contenthash].main.css', {
        allChunks: true
    })
  ];

  if(options.isProd) {
    stylesheetLoaders = [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass?imagePath=~stylesheets/blocks&' +
                                                            'includePaths[]=' + require('node-bourbon').includePaths) +
                                                            '&includePaths[]=' + (path.resolve(__dirname, './node_modules/normalize-libsass'))
      }
    ];
    plugins = prodPlugins;
  } else {
    stylesheetLoaders = loadersByExtension(stylesheetLoaders);
  }

  loaders.push.apply(loaders, stylesheetLoaders);

  var config =  {
    entry: entry,
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'public'),
      filename: options.isProd ? '[hash].[name].js' : '[name].js',
      chunkFilename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js', '.html', '.scss'],
    },
    module: {
      loaders: loaders
    },
    plugins: plugins
  };

  if(!options.isProd) {
    bundlePath = devScripts.concat(bundlePath);
    config.devtool = 'inline-source-map';
    //extend(config, options);
  }
  config.entry[key] = bundlePath;

  return config;
};
