/**
 * MongoDB.js
 * =============================================================
 * Contains the main logic of database connectivity.
 * All of the api will have reference to this file if needed.
 *
 */

const mongodb = require("mongodb");
const config = require("../config");

// Mongo connection
const mongoObjectId = require("mongodb").ObjectID;
const MongoClient = mongodb.MongoClient;
const mongoUrl =
  process.env.NODE_ENV == "production"
    ? config.mongoCredential.production
    : config.mongoCredential.local;

// Initialize mongo
let db;
MongoClient.connect(
  mongoUrl,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err, client) => {
    if (err) {
      throw new Error(err);
    }
    db = client.db("glints");
  }
);

function timetoSeconds(time) {
  // Convert 1:45PM into 1345
  const AM_PM = time.slice(time.length - 2, time.length + 1).toLowerCase();
  const i = time.indexOf(":");
  let hour;
  let minutes;

  if (i != -1) {
    minutes = time.slice(i + 1, time.length - 2);
    hour = time.slice(0, i);
  } else {
    minutes = "00";
    hour = time.slice(0, time.length - 2);
  }

  if (AM_PM == "am") {
    if (hour == 12) return minutes * 60;
    else return hour * 3600 + minutes * 60;
  } else if (AM_PM == "pm") {
    if (hour != 12) hour = Number(hour) + 12;
    return hour * 3600 + minutes * 60;
  }
}

const MongoDB = {
  GetData: () => {
    return new Promise(async (resolve, reject) => {
      const restaurantDataCollection = db.collection("RestaurantData");
      try {
        const restaurantData = await restaurantDataCollection.find().toArray();
        resolve(restaurantData);
      } catch (err) {
        reject(err);
      }
    });
  },
  GetRestaurantCollections: collectionIds => {
    return new Promise(async (resolve, reject) => {
      const restaurantCollectionsCollection = db.collection(
        "RestaurantCollections"
      );
      const mongoCollectionIds = collectionIds.map(id => mongoObjectId(id));
      try {
        restaurantCollections = restaurantCollectionsCollection
          .find({ _id: { $in: mongoCollectionIds } })
          .toArray();
        resolve(restaurantCollections);
      } catch (err) {
        reject(err);
      }
    });
  },
  CreateRestaurantCollection: (name, restaurantId) => {
    return new Promise(async (resolve, reject) => {
      const restaurantCollectionsCollection = db.collection(
        "RestaurantCollections"
      );
      let restaurant;
      if (restaurantId) {
        const restaurantDataCollection = db.collection("RestaurantData");
        restaurant = await restaurantDataCollection.findOne({
          _id: mongoObjectId(restaurantId)
        });
      }
      try {
        restaurantCollectionsCollection.insertOne(
          {
            name: name,
            restaurants: restaurant ? [restaurant] : []
          },
          function(err, result) {
            if (err) throw err;
            resolve({
              _id: result.insertedId,
              name: name,
              restaurants: restaurant ? [restaurant] : []
            });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  },
  AddToRestaurantCollection: (collectionId, restaurantId) => {
    return new Promise(async (resolve, reject) => {
      const restaurantCollectionsCollection = db.collection(
        "RestaurantCollections"
      );
      const restaurantDataCollection = db.collection("RestaurantData");
      try {
        const restaurant = await restaurantDataCollection.findOne({
          _id: mongoObjectId(restaurantId)
        });
        const { restaurants } = await restaurantCollectionsCollection.findOne({
          _id: mongoObjectId(collectionId)
        });
        // If the restaurant does not exist in the collection, add it
        if (!restaurants.some(doc => doc._id == restaurantId)) {
          restaurantCollectionsCollection.updateOne(
            { _id: mongoObjectId(collectionId) },
            { $push: { restaurants: restaurant } },
            function(err, result) {
              if (err) reject(err);
              resolve(restaurant);
            }
          );
        } else {
          resolve(false);
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteRestaurantCollection: collectionId => {
    return new Promise(async (resolve, reject) => {
      const restaurantCollectionsCollection = db.collection(
        "RestaurantCollections"
      );
      restaurantCollectionsCollection.deleteOne(
        { _id: mongoObjectId(collectionId) },
        function(err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  RenameRestaurantCollection: (collectionId, name) => {
    return new Promise(async (resolve, reject) => {
      const restaurantCollectionsCollection = db.collection(
        "RestaurantCollections"
      );
      restaurantCollectionsCollection.updateOne(
        { _id: mongoObjectId(collectionId) },
        { $set: {name}},
        function(err, result) {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
  RemoveFromRestaurantCollection: (collectionId, restaurantId) => {
    return new Promise(async (resolve, reject) => {
      const restaurantCollectionsCollection = db.collection(
        "RestaurantCollections"
      );
      restaurantCollectionsCollection.updateOne(
        { _id: mongoObjectId(collectionId) },
        { $pull: { restaurants: { _id: mongoObjectId(restaurantId) } } },
        function(err, result) {
          if (err) reject(err);
          resolve({
            collectionId,
            restaurantId
          }); // Could do the deletion on the client side probably
        }
      );
    });
  },
  // One time endpoint used to transform the initial data from the CSV into a format that can be more easily filtered by day and time
  TransformData: () => {
    return new Promise(async (resolve, reject) => {
      const restaurantDataCollection = db.collection("RestaurantData");
      try {
        const restaurantData = await restaurantDataCollection.find().toArray();
        restaurantData.forEach(doc => {
          const { _id, name, openingHours } = doc;
          let block = openingHours;
          block = block.replace(/ /g, "");
          let blocks = block.split("/");
          const dayRegex = /[a-zA-Z]{3}-{0,1}[a-zA-Z]{0,3}/;
          let timeRegex = /\d{1,2}:{0,1}\d{0,2}[ap]m-\d{1,2}:{0,1}\d{0,2}[ap]m/;
          const time = {
            mon: {
              start: null,
              end: null
            },
            tue: {
              start: null,
              end: null
            },
            wed: {
              start: null,
              end: null
            },
            thu: {
              start: null,
              end: null
            },
            fri: {
              start: null,
              end: null
            },
            sat: {
              start: null,
              end: null
            },
            sun: {
              start: null,
              end: null
            }
          };
          const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

          blocks.forEach(block => {
            // const dayBlock = block.match(dayRegex);
            const timeOpen = block.match(timeRegex)[0].split("-");

            const start = timetoSeconds(timeOpen[0]);
            const end = timetoSeconds(timeOpen[1]);
            // dayBlock =
            let dayBlock = block.slice(0, block.match(timeRegex).index);
            dayBlock = dayBlock.split(",");
            dayBlock.forEach(day => {
              let startDay = day.split("-")[0].toLowerCase();
              let endDay = day.split("-")[1];
              let allDays = [];
              if (endDay) {
                // If endDay is less than startDay, i.e. something like Sun - Mon,
                let startDayIndex = days.indexOf(startDay);
                let endDayIndex = days.indexOf(endDay.toLowerCase());
                if (endDayIndex < startDayIndex) {
                  let endToStart = days.slice(endDayIndex, days.length);
                  let startToEnd = days.slice(0, startDayIndex + 1);
                  allDays = endToStart.concat(startToEnd);
                  // allDays = days.slice(days.indexOf(startDay), (days.indexOf(endDay.toLowerCase()))+1);
                } else {
                  allDays = days.slice(startDayIndex, endDayIndex + 1);
                }
                allDays.forEach(day => {
                  time[day] = {
                    start,
                    end
                  };
                });
              } else {
                time[startDay] = {
                  start,
                  end
                };
              }
            });
          });
          restaurantDataCollection.updateOne(
            { _id: mongoObjectId(_id) },
            { $set: { name: String(name), time: time } },
            function(err, result) {
              if (err) throw err;
              // console.log(result);
            }
          );
        });
      } catch (err) {
        reject(err);
      }
    });
  }
};

module.exports = MongoDB;
