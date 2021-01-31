require('ignore-styles');
//Configuramos Babel
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});
//Llamamos el archivo server
require('./server');
