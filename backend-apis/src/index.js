
// const {DatabaseLoader} = require('./loaders/database.loader');
const {RoutesLoader} = require('./loaders/routes.loaders');
// const {ExpressLoader} = require('./loaders/express.loader');
const {MiddlewareLoader} = require('./loaders/middleware.loader');

// const app = ExpressLoader.init();

class api {
    static init (app){

        const  version = "v1";
        RoutesLoader.initRoutes(app,version);
        MiddlewareLoader.init(app);

    }
}

module.exports = {api};
