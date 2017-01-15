/**
 * 模块依赖
 * 
 */
var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var routes = require('./routes');
var port = process.env.PORT||3000;
/**
 * 环境设置
 */
app.set('view egine','jade');
app.set('views',__dirname+'./tpl');

MongoClient.connect(process.env.MONGOLAB_URI||'mongodb://localhost:27017/url-shortener',function(err,db){
	console.log('*********URL************: '+process.env.MONGOLAB_UR);
	if(err){
		return console.log("Error: "+err);
	}
	routes(app,db);
})

/**
 * route
 */
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'./views/index.html'),function(err){
		if(err){
			console.log('Error: '+err);
		}else{
			console.log('Request Index');
		}
	});
});

app.listen(port,function(err){
	if(err){
		console.log('Error: '+err);
	}else{
		console.log('App listenning on '+port);
	}
});