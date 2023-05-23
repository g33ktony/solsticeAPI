const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users API', () => {
  let userId; // To store the ID of a user created during tests
  
  // Run this block of code before the tests start
  before((done) => {
    // Clear the user collection or perform any setup needed
    // Example: mongoose.connection.collections.users.drop()
    done();
  });
  
  describe('POST /users', () => {
    it('should create a new user', (done) => {
      chai
        .request(app)
        .post('/users')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          expect(res.body.name).to.equal('John Doe');
          expect(res.body.email).to.equal('john@example.com');
          userId = res.body._id; // Store the ID for later use
          done();
        });
    });
    
    it('should return an error if required fields are missing', (done) => {
      chai
        .request(app)
        .post('/users')
        .send({ name: 'John Doe' }) // Missing email field
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  
  describe('GET /users', () => {
    it('should return all users', (done) => {
      chai
        .request(app)
        .get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  
  describe('GET /users/:id', () => {
    it('should return a specific user', (done) => {
      chai
        .request(app)
        .get(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('_id', userId);
          expect(res.body.name).to.equal('John Doe');
          expect(res.body.email).to.equal('john@example.com');
          done();
        });
    });
    
    it('should return an error if the user is not found', (done) => {
      chai
        .request(app)
        .get('/users/nonexistentId')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
//   describe('PUT /users/:id', () => {
//     it('should update a specific user', (done) => {
//       const updatedUser = { name: 'Jane Smith', email: 'jane@example.com' };
//       chai
//         .request(app)
//         .put(`/users/${userId}`)
//         .send(updatedUser)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('_id', userId);
//           expect(res.body.name).to.equal(updatedUser.name);
//           expect(res.body.email).to.equal(updatedUser.email);
//           done();
//         });
//     });
//
//     it('should return an error if the user is not found', (done) => {
//       chai
//         .request(app)
//         .put('/users/nonexistentId')
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           expect(res.body).to.have.property('error');
//           done();
//         });
//     });
//   });
//
//   describe('DELETE /users/:id', () => {
//     it('should delete a specific user', (done) => {
//       chai
//         .request(app)
//         .delete(`/users/${userId}`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('_id', userId);
//           done();
//         });
//     });
//
//     it('should return an error if the user is not found', (done) => {
//       chai
//         .request(app)
//         .delete('/users/nonexistentId')
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           expect(res.body).to.have.property('error');
//           done();
//         });
//     });
//   });
// });
