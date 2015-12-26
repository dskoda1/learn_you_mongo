/* Find - all parrots w/ age > arg passed
var mongo = require('mongodb').MongoClient
var age = process.argv[2]

var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {
  if (err) throw err
  var parrots = db.collection('parrots')
  parrots.find({
    age: {
      $gt: +age
    }
  }).toArray(function(err, docs) {
    if (err) throw err
    console.log(docs)
    db.close()
  })
})

*/
/* Find Projection 

var mongo = require('mongodb').MongoClient;
var a = process.argv[2];
var url = 'mongodb://localhost:27017/learnyoumongo'
mongo.connect(url, function(err, db){
  
  if(err) throw err
  var parrots = db.collection('parrots');
  parrots.find({
    //object to filter collection
    age: {
      $gt: +a
    }
  },{
    //Object to filter columns wanted
    age: 1,
    name : 1,
    _id: 0
  }).toArray(function(err, docs) {
    if (err) throw err
    console.log(docs)
    db.close()
  })
})
*/

/* Insert 
var mongo = require('mongodb').MongoClient;
var fn = process.argv[2];
var ln = process.argv[3];
var doc = {
  firstName: fn,
  lastName: ln
};
var url = 'mongodb://localhost:27017/learnyoumongo'
mongo.connect(url, function(err, db){
  
  if(err) throw err
  var collection = db.collection('docs');
  collection.insert(doc, function(err, data){
    if(err) throw err
    
    console.log(JSON.stringify(doc));
    db.close();
  });
 
  
})
*/
/* update 
var mongo = require('mongodb').MongoClient
var database = process.argv[2]
var url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, function(err, db) {

  if (err) throw err

  var collection = db.collection('users')
  collection.update({
    "username": "tinatime"
    }, {
      $set: {
        'age': 40
      }
    },function(err, data) {
    if (err) throw err
    console.log(data)
    db.close()
  })
})
*/

/* Delete
var mongo = require("mongodb").MongoClient;
var dbName = process.argv[2];
var collName = process.argv[3];
var id = process.argv[4];
var url = 'mongodb://localhost:27017/' + dbName

mongo.connect(url, function(err, db){
  if(err) throw err
  
  var collection = db.collection(collName);
  collection.remove({
    _id: id
  }, function(err, data){
    db.close();
  })
})
 */
 
 /* Count 
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var age = process.argv[2];

mongo.connect(url, function(err, db){
  
  if(err) throw err
  
  var collection = db.collection('parrots');
  
  collection.count({
    age: {
      $gt: +age
    }
  }, function(err, count){
    console.log(count);
    db.close();
  });
});
 */
 
/* Aggregate 
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var size = process.argv[2];

mongo.connect(url, function(err, db) {
  if (err) throw err
  var prices = db.collection('prices')
  prices.aggregate([
    { $match: {
      size: +size
    }}
  , { $group: {
      _id: 'total'
    , total: {
        $avg: '$price'
      }
    }}
  ]).toArray(function(err, results) {
    if (err) throw err
    if (!results.length) {
      throw new Error('No results found')
    }
    var o = results[0]
    console.log(Number(o.total).toFixed(2))
    db.close()
  })
})
 */
 
