const db = require('../database/dbConfig');
const Users = require('./auth-model');

describe('auth model', () => {
    describe('add()', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('should add 2 users', async () => {
            await Users.add({ username: 'DJ', password: "lambdaschool" });
            await Users.add({ username: 'Krystel', password: "ilovelambda" });

            const users = await db('users');
            expect(users).toHaveLength(2);
        })
    })

    describe('find()', () => {
        it('should return a list of users', async () => {
            const users = await Users.find();
            expect(users).toHaveLength(2);
        })
    })

    describe('findBy()', () => {
        it('should return a user', async () => {
            const user = await Users.findBy({ username: 'DJ'});
            expect(user).toHaveLenth(1);
        })
    })
    describe('findById()', () => {
        it('should return a user with a specific id', async () => {
            const user = await Users.findById(2);
            expect(user).toEqual({ id:2, username: 'Krystel', password: "ilovelambda"});
        })
    })
})