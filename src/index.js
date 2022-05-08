const express = require("express");
const path = require('path');
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const app = express();
const port = 3000;
const route = require('./routes');

/** LIVE RELOAD SEVER**/
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
app.use(connectLiveReload());
/****/

/** MIDDLEWARE TO HANDLE FORMDATA **/
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
/****/

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, 'public')));

/** EXPRESS HANDLEBAR **/
app.engine(".hbs", exphbs.engine(
    { extname: '.hbs' }
));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));
/****/

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
