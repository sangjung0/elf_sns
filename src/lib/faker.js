import { faker } from '@faker-js/faker';

const randomName = () => faker.person.fullName();

export default randomName;