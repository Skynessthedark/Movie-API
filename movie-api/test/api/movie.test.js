const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies get token test', ()=>{
    before((done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({username: "Skyness10", password: 123456789})
        .end((err, res)=>{
            token = res.body.token;
            console.log(token);
            done();
        });
    });
});

/* describe('/GET all movies', ()=>{

}); */