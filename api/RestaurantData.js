const MongoDB = require('../db/MongoDB');

const RestaurantData = io => {
    return {
        // get
        GetData: (request, response) => {
            const { index='', uid=''} = request.body
            MongoDB.GetData()
                .then(result => {
                    response.status(200).send(result)
                })
                .catch(err => {
                    response.status(400).send({ code: 400, message: err});
                    console.log(err);
                });
        },
        // get
        TransformData: (request, response) => {
            MongoDB.TransformData()
                .then(result => {
                    response.status(200).send(result)
                })
                .catch(err => {
                    response.status(400).send({ code: 400, message: err});
                    console.log(err);
                });
        },
    }
} 
module.exports = RestaurantData;