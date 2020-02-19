/* Core */
const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

/* Instruments */
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const resolvers = require('./resolvers');

const store = createStore();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources() {
        return {
            launchAPI: new LaunchAPI(),
            userAPI: new UserAPI({ store }),
        };
    },
    context: async ({ req }) => {
        // simple auth check on every request
        const auth = (req.headers && req.headers.authorization) || '';

        const email = Buffer.from(auth, 'base64').toString('ascii');

        if (!isEmail.validate(email)) return { user: null };

        // find a user by their email
        const users = await store.users.findOrCreate({ where: { email } });
        const user = (users && users[0]) || null;

        return { user: { ...user.dataValues } };
    },
    engine: {
        apiKey: 'service:space-explorer-47:K45qI35StoiUFK6x2MA_9g',
    },
});

(async () => {
    const result = await server.listen();
    console.log(`🚀 Server ready at ${result.url}`);
})();
