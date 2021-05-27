const c = require('./const');

module.exports = ({ cidade, estado, local }) => {
  return {
    url: c.URL_FOURSQUARE,
    method: "GET",
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      near: cidade + ", " + estado,
      query: local,
      v: c.FOURSQUARE_API_VERSION,
      radius: 100,
      limit: 1
    }
  };
};