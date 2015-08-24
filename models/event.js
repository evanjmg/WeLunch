mongoose = require('mongoose');
/* var Event = mongoose.model('event');*/

var eventSchema = new mongoose.Schema({
  title: String,
  users: String,
  start_time: Date,
  end_time: Date,
  location: String,
  message: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;






/*module.exports = {
Event1 = Event.create({ title: "Teaparty", location: 'Frankies Awesome house', message: 'Linch at mine?', location: 'Supergardens' });
}*/

