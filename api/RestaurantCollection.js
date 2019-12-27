const MongoDB = require('../db/MongoDB');

const RestaurantData = app => {
    let { io, mobileSockets } = app;
    return {
        // get 
        GetRestaurantCollections: (request, response) => {
            let { collectionIds } = request.query;
            collectionIds = JSON.parse(collectionIds);
            MongoDB.GetRestaurantCollections(collectionIds)
                .then(result => {
                    response.status(200).send(result)
                })
                .catch(err => {
                    response.status(400).send({ code: 400, message: err});
                })
        },
        // post
        CreateRestaurantCollection: (request, response) => {
            const { name , restaurantId=""} = request.body;
            MongoDB.CreateRestaurantCollection(name, restaurantId)
                .then(result => {
                    response.status(200).send(result)
                })
                .catch(err => {
                    response.status(400).send({ code: 400, message: err});
                })
        },
        // post
        AddToRestaurantCollection: (request, response) => {
            const { collectionId, restaurantId } = request.body;
            MongoDB.AddToRestaurantCollection(collectionId, restaurantId)
                .then(result => {
                    response.status(200).send('result')
                })
                .catch(err => {
                    console.log(err)
                    response.status(400).send({ code: 400, message: err});
                })
        },
        // post
        // to add to multiple collections with only 1 network request
        AddToRestaurantCollections: (request, response) => {
            console.log(mobileSockets);
            let { collectionIds, restaurantId } = request.body;
            collectionIds = JSON.parse(collectionIds);
            let promises = [];
            collectionIds.forEach(async collectionId=>{
                let promise;
                try {
                    promise = MongoDB.AddToRestaurantCollection(collectionId, restaurantId)
                    promises.push(promise);
                } catch(err) {
                    console.log(err)
                    response.status(400).send({ code: 400, message: err});
                }          
            })
            Promise.all(promises).then(result=>{
                const emitRecipients = mobileSockets[]
                collectionIds.forEach(id=>{
                    const emitRecipients = mobileSockets[id];
                    emitRecipients.forEach(socketId=>{
                        io.to(socketId).emit('restaurantAdded', {
                            restaurant: result[0],
                            collectionId: id
                        });
                    })
                })
                // io.emit('restaurantAdded',{
                //     restaurant: result[0],
                //     collectionIds,
                // });
                response.status(200).send(result[0])
            }).catch(err=>{
                response.status(400).send({ code: 400, message: err});
            })

        },
        //post
        RemoveFromRestaurantCollection: (request, response) => {
            let {collectionId, restaurantId} = request.body;
            MongoDB.RemoveFromRestaurantCollection(collectionId, restaurantId)
                .then(result => {
                    console.log(result);
                    response.status(200).send(result)
                })
                .catch(err => {
                    console.log(err)
                    response.status(400).send({ code: 400, message: err});
                })
        },
        //post
        DeleteRestaurantCollection: (request, response) => {
            let {collectionId} = request.body
            MongoDB.DeleteRestaurantCollection(collectionId)
                .then(result => {
                    console.log(result);
                    response.status(200).send(result)
                })
                .catch(err => {
                    console.log(err)
                    response.status(400).send({ code: 400, message: err});
                })
        }        
    }
}

module.exports = RestaurantData;