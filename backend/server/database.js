const mongoose = require('mongoose');

const URI = 'mongodb://localhost/sportFields';

mongoose.set('useFindAndModify', false);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;