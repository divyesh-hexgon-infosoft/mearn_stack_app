const userRoutes = require('../routers/user.router');
class RoutesLoader {
    static initRoutes (app,version){
        app.use('/api/user',userRoutes);
    }
}

module.exports = {RoutesLoader};
