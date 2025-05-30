
const path = require('path');

module.exports = {
  mode: 'development', // Modo de compilación
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,      // Solo .ts
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
};


