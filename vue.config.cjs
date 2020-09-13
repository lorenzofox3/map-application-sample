const zoneData = require('./data/fixture.json');

module.exports = {
    devServer: {
        before: function (app) {
            app.get('/items', function (req, res) {
                res.json(zoneData);
            });
        }
    }
};
