import supertest from 'supertest';
import app from '../server';

describe('User Controller Intergration Test', () => {
  const request = supertest(app);
  describe('[POST]/signup', () => {
    it('should sign a user in successfully', async () => {
      const body = { email: 'mytestuser@mail.com', password: 'abcd1234', first_name: 'test', last_name: 'user'}
      const response = await request.post('/api/users/signup').send(body)
      expect(response.status).toEqual(200)
      expect(response.body.token).toBeDefined()
    })
  })
})