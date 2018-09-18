var mongodb = require("mongodb").MongoClient;
var setting =require("./setting")
function connectDB(callback){
    var url = setting.url;
    mongodb.connect(url,function(err,db){
        //var dbBase = db.db("test");
        if(err){
            callback(err,null)
        }
        callback(err,db)
    })
}
//insert
//insert({},function(){})
exports.add=function(dbk,collection,json,callback){
    connectDB(function(err,db){
        var dbBase = db.db(dbk)
        dbBase.collection(collection).insertOne(json,function(err,data){
            console.log("插入成功");
            db.close()
        })
    })
};

exports.del=function(dbk,collection,json,callback){
    connectDB(function(err,db){
        var dbBase = db.db(dbk)
        dbBase.collection(collection).deleteMany(json,function(err,data){
            console.log("删除成功");
            db.close()
        })
    })
};

exports.new=function(dbk,collection,json,json1,callback){
    connectDB(function(err,db){
        var dbBase = db.db(dbk)
        dbBase.collection(collection).update(json,{$set:json1},function(err,data){
            console.log("更新成功");
            db.close()
        })
    })
};

exports.search=function(dbk,collection,json,callback){
    connectDB(function(err,db){
        var dbBase = db.db(dbk)
        dbBase.collection(collection).find(json).toArray(function(err,data){
            console.log("查询成功");
            db.close()
        })
    })
};