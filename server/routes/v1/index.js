import LocationRoutes from './location.route';

const API_PREFIX = '/api/v1/';

const routes = (app) => {
  app.use(API_PREFIX, LocationRoutes);
};

export default routes;
