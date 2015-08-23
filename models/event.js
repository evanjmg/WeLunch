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






/*db.SmartBand.insert([{ model: 'Charge SS ', brand: 'FitBid', release: '2014-12-27', price: 99.99, heart_monitor: true, gps: false, reviews: "awesome peace of kit- funcky looks + productivity + control" }])*/
