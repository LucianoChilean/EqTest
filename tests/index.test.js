const supertest  = require('supertest')
const app = require('../routes/usuarios')

const request = supertest(app)

describe('GET /api/usuarios', () =>{

    test('responds to /', async () => {
        const response = await request.get('/');
        console.log(request)
        
        expect(response.status).toBe(200);
  
      });
})


