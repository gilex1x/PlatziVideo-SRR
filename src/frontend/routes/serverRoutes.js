//creamos un arreglo de rutas para el servidor
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Player from '../containers/Player';

//copiamos las propiedades de las rutas como un json
const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/register',
    component: Register,
  },
  {
    exact: true,
    path: '/player/:id',
    component: Player,
  },
  {
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;

