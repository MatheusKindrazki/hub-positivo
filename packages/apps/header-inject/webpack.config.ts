import dotenv from 'dotenv'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

interface Config extends webpack.Configuration {
  devServer: {
    contentBase: string
    historyApiFallback: boolean
    hot: boolean
    port: number
  }
}

dotenv.config()

const isDevelopment = process.env.NODE_ENV !== 'production'

const config: Config = {
  mode: isDevelopment ? 'development' : 'production',

  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, '..', 'hub-web', 'build', 'static', 'js'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      title: 'Hub Digital - Header Inject'
    }),
    new Dotenv()
  ].filter(Boolean)
}

export default config
