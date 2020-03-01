const bcrypt = require('bcrypt');
const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    email: faker.internet.email(),
                    password: bcrypt.hashSync('123', 10),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
