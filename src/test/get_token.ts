import jwt from 'jsonwebtoken';

const payload = {
  sub: '123',  // This should match the id of a user in your database
  email: 'john.doe@acme.com'
  // Additional claims...
};

const secret: jwt.Secret = 'mypassword';

const token = jwt.sign(payload, secret, 
  { 
    expiresIn: '1h', 
    algorithm: 'HS256'
  });

console.log(token);  // You can use this token for testing
