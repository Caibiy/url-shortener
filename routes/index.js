/**
 * Route Inital
 *
 */

module.exports = function(app,db){

		app.get('/new/:url',function(req,res){
		if(validateURL(req.params.url)){
			db.collection('sites').findOne({
				orginal_url:req.params.url
			},function(err,doc){
				if(err){
					console.log('Error: '+err);
				}
				if(doc){
					res.end('已经存在Url,short-url为:'+doc.short_url);
				}else{
					var shortcode=shortGen();
					var ndoc={
						orginal_url:req.params.url,
						short_url:shortcode
					};
					db.collection('sites').insert(ndoc,function(err){
						if(err){
							console.log('Error:'+err);
						}else{
							res.end('Success,short_url: '+shortcode);
						}
						db.close();
					})
				}
			})/*.toArray(function(err,doc){
				if(err){
					console.log('Error: '+err);
				}
				if(doc){
					res.end('已经存在Url,short-url为:'+doc.short_url);
				}else{
					var shortcode=shortGen();
					var ndoc={
						orginal_url:req.params.datestring,
						short_url:shortcode
					};
					db.collection('sites').insert(ndoc,function(err){
						if(err){
							console.log('Error:'+err);
						}else{
							res.end('Success,short_url: '+shortcode);
						}
						db.close();
					})
				}
			})*/
		}
	});
		
	app.get('/:shortUrl',function(req,res){
		console.log('boo');
		db.collection('sites').findOne({
			short_url:{
				$eq:+req.params.shortUrl
			}
		},function(err,doc){
			if(err){
				 console.log('Error:'+err);
			}
			if(doc){
				res.redirect(doc.orginal_url);
			}
			//db.close();
		});
		/*.toArray(function(err,doc){
			if(err){
				console.log('Error:'+err);
			}
			if(res){
				res.redirect(doc.orginal_url);
			}
			db.close();
		})*/
	});


	function validateURL(url){
		var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    	return regex.test(url);
	}

	function shortGen(){
		 var num = Math.floor(100000 + Math.random() * 900000);
    return num.toString().substring(0, 4);
	}
};
