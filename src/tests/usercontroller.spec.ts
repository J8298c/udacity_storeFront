import supertest from 'supertest';
import app from '../server';

describe('User Controller Intergration Test', () => {
  const request = supertest(app);
  describe('[POST]/signup', () => {
    describe('successful signup', () => {
      it('should sign a user in successfully', async () => {
        const body = { email: 'mytestuser@mail.com', password: 'abcd1234', first_name: 'test', last_name: 'user'}
        const response = await request.post('/api/users/signup').send(body)
        expect(response.status).toEqual(200)
        expect(response.body.token).toBeDefined()
      })
    })

    describe('unsuccessful user signup', () => {
      it('should fail if missing required parameter and return 400', async () => {
        const body = { email: 'baduser@mail.com', password: '1234', last_name: 'bad request'}
        const response = await request.post('/api/users/signup').send(body)
        expect(response.status).toEqual(400)
      })
      it('should fail if a malformed email is sent in body', async () => {
        const body = { email: 'mytestuser.mail.com', password: 'abcd1234', first_name: 'test', last_name: 'user'}
        const response = await request.post('/api/users/signup').send(body)
        expect(response.status).toEqual(400)
      })
    })
  })

  describe('[POST]/login', () => {
    describe('should log in user successfully', () => {
      const goodUser = { email: 'mytestuser@mail.com', password: 'abcd1234' };
      it('should log user in and return a token', async () => {
        const response = await request.post('/api/users/login').send(goodUser)
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeDefined();
      })
    })
    describe('bad password login', () => {
      it('should fail if password is wrong', async () => {
        const badUser = { email: 'mytestuser@mail.com', password: 'abcd1' };
        const response = await request.post('/api/users/login').send(badUser)
        expect(response.status).toEqual(400)
      })
    })
  })
})