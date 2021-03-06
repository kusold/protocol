const assert = require('chai').assert;
const Protocol = require('../index');


describe('protocol', function () {
  describe('response', function(){
    it('should be able to encode/decode a take response', function () {
      const encoded = Protocol.Response.encode({
        request_id: 'abcdefg',
        'take': {
          conformant: false,
          remaining: 10,
          reset: 20,
          limit: 30
        }
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Response.decode(encoded);

      assert.deepEqual(decoded.request_id, 'abcdefg');
      assert.deepEqual(decoded.body, 'take');
      assert.deepEqual(decoded.take.conformant, false);
      assert.deepEqual(decoded.take.remaining, 10);
      assert.deepEqual(decoded.take.reset, 20);
      assert.deepEqual(decoded.take.limit, 30);
    });

    it('should be able to encode/decode a pong response', function () {
      const encoded = Protocol.Response.encode({
        request_id: 'abcdefg',
        'pong': {
          protocol_version: 3
        }
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Response.decode(encoded);

      assert.deepEqual(decoded.request_id, 'abcdefg');
      assert.deepEqual(decoded.body, 'pong');
      assert.deepEqual(decoded.pong.protocol_version, 3);
    });

    it('should be able to encode/decode a take response with numeric request_id', function () {
      const encoded = Protocol.Response.encode({
        request_id: 123,
        'take': {
          conformant: false,
          remaining: 10,
          reset: 20,
          limit: 30
        }
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Response.decode(encoded);

      assert.deepEqual(decoded.request_id, 123);
      assert.deepEqual(decoded.body, 'take');
      assert.deepEqual(decoded.take.conformant, false);
      assert.deepEqual(decoded.take.remaining, 10);
      assert.deepEqual(decoded.take.reset, 20);
      assert.deepEqual(decoded.take.limit, 30);
    });

    it('should be able to encode/decode an error response', function () {
      const encoded = Protocol.Response.encode({
        request_id: 'abcdefg',
        'error': {
          type: 'UNKNOWN_BUCKET_TYPE'
        }
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Response.decode(encoded);

      assert.deepEqual(decoded.request_id, 'abcdefg');
      assert.deepEqual(decoded.body, 'error');
      assert.deepEqual(decoded.error.type, 'UNKNOWN_BUCKET_TYPE');
    });
  });

  describe('request', function(){
    it('should be able to encode/decode TAKE', function () {
      const encoded = Protocol.Request.encode({
        id: '1233',
        method: 'TAKE',
        type: 'foo',
        key: 'bar',
        count: 2
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Request.decode(encoded);

      assert.deepEqual(decoded.id, '1233');
      assert.deepEqual(decoded.method, 'TAKE');
      assert.deepEqual(decoded.type, 'foo');
      assert.deepEqual(decoded.key, 'bar');
      assert.deepEqual(decoded.count, 2);
      assert.deepEqual(decoded.skipResponse, false);
    });

    it('should be able to encode/decode TAKE with integer id', function () {
      const encoded = Protocol.Request.encode({
        id:     1233,
        method: 'TAKE',
        type:   'foo',
        key:    'bar',
        count:  2,
        skipResponse: true
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Request.decode(encoded);

      assert.deepEqual(decoded.id, 1233);
      assert.deepEqual(decoded.method, 'TAKE');
      assert.deepEqual(decoded.type, 'foo');
      assert.deepEqual(decoded.key, 'bar');
      assert.deepEqual(decoded.count, 2);
      assert.deepEqual(decoded.skipResponse, true);
    });

    it('should be able to encode/decode a PUT', function () {
      const encoded = Protocol.Request.encode({
        id:     'abcdefg',
        method: 'PUT',
        type:   'foo',
        key:    'bar',
        count:  2
      });

      assert.instanceOf(encoded, Buffer);

      const decoded = Protocol.Request.decode(encoded);

      assert.deepEqual(decoded.id,     'abcdefg');
      assert.deepEqual(decoded.method, 'PUT');
      assert.deepEqual(decoded.type,   'foo');
      assert.deepEqual(decoded.key,    'bar');
      assert.deepEqual(decoded.count,  2);
    });
  });
});
