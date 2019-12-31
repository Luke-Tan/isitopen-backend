const cors = require('cors');
const RestaurantData = require('./RestaurantData');
const RestaurantCollection = require('./RestaurantCollection');
const Email = require('./Email');

// Currently hardcoded
let whitelist = ['http://localhost:3000', undefined];

const corsOption = {
    origin: (origin, callback) => {
        const originIsWhitelisted = whitelist.indexOf(origin) != -1;
        callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    }
}

const Index = (app) => {
    const { io } = app;
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    //For all RestaurantData related db transactions
    app.get('/api/GetData', cors(corsOption), RestaurantData(io).GetData);
    app.get('/api/TransformData', cors(corsOption), RestaurantData(io).TransformData);
    //For all RestaurantCollection related db transactions
    app.get('/api/GetRestaurantCollections', cors(corsOption), RestaurantCollection(io).GetRestaurantCollections);
    app.post('/api/CreateRestaurantCollection', cors(corsOption), RestaurantCollection(io).CreateRestaurantCollection);
    app.post('/api/AddToRestaurantCollection', cors(corsOption), RestaurantCollection(io).AddToRestaurantCollection);
    app.post('/api/AddToRestaurantCollections', cors(corsOption), RestaurantCollection(io).AddToRestaurantCollections);
    app.post('/api/RemoveFromRestaurantCollection', cors(corsOption), RestaurantCollection(io).RemoveFromRestaurantCollection);
    app.post('/api/DeleteRestaurantCollection', cors(corsOption), RestaurantCollection(io).DeleteRestaurantCollection);
    //For all email related actions
    app.post('/api/InviteFriends', cors(corsOption), Email.InviteFriends);
}

module.exports = Index;