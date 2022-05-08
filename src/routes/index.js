const newRouter = require('./news');
const siteRouter = require('./sites');
function route(app) {
    app.use('/news', newRouter);
    app.use('/', siteRouter);
}

module.exports = route;
