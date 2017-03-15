const Request  = require('./messages/Request').Request;
const Response = require('./messages/Response').Response;
const PBF      = require('pbf');


module.exports = {
  Response: {
    decode(buffer) {
      const pbf = new PBF(buffer);
      return Response.read(pbf);
    },
    encode(obj) {
      const pbf = new PBF();
      Response.write(obj, pbf);
      return pbf.finish();
    }
  },
  Request: {
    decode(buffer) {
      const pbf = new PBF(buffer);
      return Request.read(pbf);
    },
    encode(obj) {
      const pbf = new PBF();
      Request.write(obj, pbf);
      return pbf.finish();
    }
  }
};