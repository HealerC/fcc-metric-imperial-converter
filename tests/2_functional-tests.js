const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);

  suite('Conversions', function() {
    suite('Valid Conversions', function() {
      test('Convert a valid input', function(done) {
        chai
          .request(server)
          .get('/api/convert?input=10L')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.returnNum, 2.64172);
            done();
          });
      });
      test('Convert with no number', function(done) {
        chai
          .request(server)
          .get('/api/convert?input=kg')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.returnNum, 2.20462);
            done();
          });
      });
    })

    suite('Invalid conversions', function(){
      test('Convert an invalid input', function(done) {
        chai
          .request(server)
          .get('/api/convert?input=32g')
          .end(function(err, res) {
            //assert.equal(res.status, 400);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "invalid unit");
            done();
          });
      });
      test('Convert an invalid number', function(done) {
        chai
          .request(server)
          .get('/api/convert?input=3/7.2/4kg')
          .end(function(err, res) {
            //assert.equal(res.status, 400);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "invalid number");
            done();
          });
      });
      test('Convert an invalid number and unit', function(done) {
        chai
          .request(server)
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end(function(err, res) {
            //assert.equal(res.status, 400);
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "invalid number and unit");
            done();
          });
      }); 
    })
  });
});
