
var EventEmitter = require('events').EventEmitter;
var util = require('util');
util.inherits(Database, EventEmitter);

module.exports = new Database();

//module.exports = function(onReady){
//};

function Database(){
	var db = null;
	var loki = require('lokijs');
	
	this.loadDatabase = function(){
		console.log('database.loading');
		//var mod = {};
		var that = this;
		//var idbAdapter = new lokiIndexedAdapter('loki');
		db = new loki(__dirname + '/homeAuto.json',{
			autoload: true,
			autoloadCallback : function(){
				console.log('database.onDatabaseReady');
				that.emit('onDatabaseReady',db);
			},
			autosave: true, 
			autosaveInterval: 60000,
			//adapter: idbAdapter
		});	
	};
	this.getCollection = function(sName){
		return db.getCollection(sName);
	}
	this.addCollection = function(sName,oOptions){
		return db.addCollection(sName,oOptions);
	}
	/*
	var temps;
	
	function loadHandler() {
		console.log('database.loadHandler');
		// if database did not exist it will be empty so I will intitialize here
		temps = db.getCollection('temps');
		if (temps===null) {
			temps = db.addCollection('temps',{
				indices: ['date']
			});
		}
	}
	*/
}






	/*


	for (prop in req.body) {
		movie[prop] = req.body[prop];
    }

	
	var lastTempRecord = null;
	mod.addTemperature = function(temp){
		if(temps==null){
			console.log("addTemperature:db not ready");	
		}
		if(lastTempRecord!=null){
			if(lastTempRecord.temperature==temp.temperature&&lastTempRecord.humidity==temp.humidity){
				lastTempRecord.date = new Date();
				temps.update(lastTempRecord)
				//console.log("temp the same:"+temp);
				return;
			}
		}
		var lastTempRecord = temps.insert(temp);
		console.log("inserted:"+temp);
	};
	mod.getRecentTemperatures = function(){
		var date = new Date();
		date.setMinutes(date.getMinutes()-30);
		var results = temps.chain().find({'date': {'$gt': date.toJSON()}}).data();
		//console.log("Recent:"+results.length+',date:'+date.toJSON());
		return results;
	};
	mod.getTemperaturesSummary = function(fromDate,toDate,groupBy){
		var groupByChar = 10;//date
		var dateEndPart = "";
		groupBy="hours";
		
		if(groupBy=="hours"){
			groupByChar = 13;//hours
			dateEndPart = ":00";
		}
		if(groupBy=="mins"){
			groupByChar = 16;//hours
			//dateEndPart = ":00";
		}
		var results = temps.chain().mapReduce(
			function (obj){
				var d = new Date(obj.date);
				return {
					date: (obj.date instanceof Date)?obj.date.toJSON():obj.date,
					//year: d.getFullYear(),
					//month: d.getMonth(),
					//date: d.getDate(),
					//hour: d.getHours(),
					temperature: obj.temperature,
					humidity: obj.humidity
				};
			
			},
			function(data){
				var ot = {};
				for(var i=0;i<data.length;i++){
					var dd = data[i];
					//var s = dd.year +'_'+dd.month+'_'+dd.date;
					var s = dd.date.substring(0, groupByChar)+dateEndPart;
					var obj = ot[s] || {
						date: s,
						temperature:0,
						humidity:0,
						inc:0
					};
					obj.temperature +=dd.temperature;
					obj.humidity +=dd.humidity;
					obj.inc++;
					ot[s] = obj;
				}
				var results = [];
				for(var key in ot){
					var o = ot[key];
					results.push({
						date:o.date,
						temperature:o.temperature/o.inc,
						humidity:o.humidity/o.inc
					});
				}
				return results
			}
		);
		return results;
	}
	return mod;
};
*/