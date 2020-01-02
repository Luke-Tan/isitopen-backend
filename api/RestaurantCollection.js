const MongoDB = require("../db/MongoDB");

const RestaurantData = io => {
  return {
    // get
    GetRestaurantCollections: (request, response) => {
      let { collectionIds } = request.query;
      collectionIds = JSON.parse(collectionIds);
      MongoDB.GetRestaurantCollections(collectionIds)
        .then(result => {
          response.status(200).send(result);
        })
        .catch(err => {
          response.status(400).send({ code: 400, message: err });
        });
    },
    // post
    CreateRestaurantCollection: (request, response) => {
      const { name, restaurantId = "" } = request.body;
      MongoDB.CreateRestaurantCollection(name, restaurantId)
        .then(result => {
          response.status(200).send(result);
        })
        .catch(err => {
          response.status(400).send({ code: 400, message: err });
        });
    },
    // post
    AddToRestaurantCollection: (request, response) => {
      const { collectionId, restaurantId } = request.body;
      MongoDB.AddToRestaurantCollection(collectionId, restaurantId)
        .then(result => {
          response.status(200).send("result");
        })
        .catch(err => {
          console.log(err);
          response.status(400).send({ code: 400, message: err });
        });
    },
    // post
    // to add to multiple collections with only 1 network request
    AddToRestaurantCollections: (request, response) => {
      let { collectionIds, restaurantId } = request.body;
      collectionIds = JSON.parse(collectionIds);
      let promises = [];
      collectionIds.forEach(async collectionId => {
        let promise;
        try {
          promise = MongoDB.AddToRestaurantCollection(
            collectionId,
            restaurantId
          );
          promises.push(promise);
        } catch (err) {
          console.log(err);
          response.status(400).send({ code: 400, message: err });
        }
      });
      Promise.all(promises)
        .then(result => {
          collectionIds.forEach(id => {
            console.log(id);
            io.in(id).emit("restaurantAdded", {
              restaurant: result[0],
              collectionId: id
            });
          });
          response.status(200).send(result[0]);
        })
        .catch(err => {
          response.status(400).send({ code: 400, message: err });
        });
    },
    //post
    RemoveFromRestaurantCollection: (request, response) => {
      const { collectionId, restaurantId } = request.body;
      MongoDB.RemoveFromRestaurantCollection(collectionId, restaurantId)
        .then(result => {
          const { collectionId, restaurantId} = result;

          io.in(collectionId).emit("restaurantRemoved", {
            collectionId,
            restaurantId
          });
          response.status(200).send(result);
        })
        .catch(err => {
          console.log(err);
          response.status(400).send({ code: 400, message: err });
        });
    },
    //post
    DeleteRestaurantCollection: (request, response) => {
      const { collectionId } = request.body;
      MongoDB.DeleteRestaurantCollection(collectionId)
        .then(result => {
          io.in(collectionId).emit("collectionDeleted", {
            collectionId
          });
          response.status(200).send(result);
        })
        .catch(err => {
          console.log(err);
          response.status(400).send({ code: 400, message: err });
        });
    },
    //post
    RenameRestaurantCollection: (request, response) => {
      const { collectionId, name} = request.body;
      MongoDB.RenameRestaurantCollection(collectionId, name)
        .then(result => {
          io.in(collectionId).emit("collectionRenamed", {
            collectionId,
            name
          });
          response.status(200).send(result);
        })
        .catch(err => {
          console.log(err);
          response.status(400).send({ code: 400, message: err });
        });
    }
  };
};

module.exports = RestaurantData;
