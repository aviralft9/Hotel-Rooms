var express = require('express');
var app = express();
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/hotel');

//app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Room = mongoose.model('Room', {
	roomNo:{
		type: String,
		required: true
	},
	bed:{
		type: String,
		required: true
	}
});

app.get('/api/rooms', function(req, res){
	Room.find(function(err, rooms){
     	 if (err)
            res.send(err);

        res.json(rooms);
	});
});

app.post('/api/rooms', function(req, res){
	
	var room = new Room();
	room.roomNo = req.body.roomNo;
	room.bed = req.body.bed;

	room.save(function(err){
		if(err)
			res.send(err);

		res.json(room);
	});

});

app.get('/api/rooms/:room_id', function(req, res){
	Room.findById(req.params.room_id, function(err, room){
		if(err)
			res.send(err);

		res.json(room);
	});
});

app.put('/api/rooms/:room_id', function(req, res){
	Room.findById(req.params.room_id, function(err, room){
		if(err)
			res.send(err);


		room.roomNo = req.body.roomNo;
		room.bed = req.body.bed;

		room.save(function(err){
			if(err)
				res.send(err);

			res.json(room);
		});
	});
});





app.delete('/api/rooms/:room_id', function(req, res){
	

	Room.findByIdAndRemove({_id : req.params.room_id}, function(err, room){
		if(err)
			res.send(err);

		res.json(room);

	});
});


app.use('/api', router);
app.listen(3000);
console.log('listen on port no: 3000');