import { Db } from "./persistence";


export const bootstrap = async () => {
  // must be called first
  await Db.init();
  // Manually create some users
  await Db.getInstance().createManual(
    {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@acme.com',
      phone: '123456'
  });
  await Db.getInstance().createManual({
    id: '456',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@acme.com',
    phone: '654321'
  });
  // also create random 100 users
  await Db.getInstance().createRandom(100);
};
