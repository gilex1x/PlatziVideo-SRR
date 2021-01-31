require('ignore-styles');
//Configuramos Babel
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});
//Configuramos la llamada de asets
//Tenemos que pasarle el tipo de extension y como lo va a resolver
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  name: '/assets/[hash].[ext]',
});
//Llamamos el archivo server
require('./server');
