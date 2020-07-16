const knex = require ('knex');
const app = require('../src/app');
const { testArrayPackage } = require ('./bookmarks.fixures');
const supertest = require('supertest');


describe.only('The Bookmarks Endpoint',() => {
  let db; 

  before('make knex instance', () => {
    db = knex({
      client : 'pg',
      connection : process.env.TEST_DB_URL
    });
    app.set('db',db);
  });
  beforeEach('clear the table for the next test', () => db('bookmark_list').truncate());
  
  afterEach('wow it\'s dirty in here', () =>  db('bookmark_list').truncate() );
  
  after('unmount from db', () => db.destroy());

  describe('GET @ /bookmarks', () =>{
    context('given nothing' , () =>{
      it('it should send back an empty array & 200 ', ()=>{
        return supertest(app)
          .get('/bookmarks')
          .expect(200, []);

      });
      context('if bookmarks has content', () =>{
        const testData = testArrayPackage();
        beforeEach('insert data' ,()=> {
          return db.into('bookmark_list').insert(testData);
        });
        it('should do ', ()=> {
          return supertest(app)
            .get('/bookmarks')
            .expect(200,testData);

        });
      });
     
    });
  });

  describe('GET @ /bookmarks/:id', () =>{
    context('if given a wrong id' , () =>{
      it('it should give back a 404 ', ()=>{
        const wrongID = 123456;
        return supertest(app)
          .get(`/bookmarks/${wrongID}`)
          .expect(404, {error :{message : 'sorry i don\'t think we have that one'}} );

      });
      
    }); 
    context('if bookmarks has content', () =>{

      const testData = testArrayPackage();
     
      beforeEach('insert data' ,()=> {
        return db.into('bookmark_list').insert(testData);
      });

      it('i should give back the wright bookmark ', ()=> {
        const test_id = 2;
        const expectedTarget = testData[test_id - 1];
        return supertest(app)
          .get(`/bookmarks/${test_id}`)
          .expect(200, expectedTarget);

      });

    });
  });    
});
