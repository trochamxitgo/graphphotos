const fetch = require("node-fetch");


const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  
  type Photo{

     Id: String
     Name: String

  }

  type Query {
    photos: [Photo]
    Name: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    photos: () =>
      fetch('https://services.odata.org/V4/TripPinService/Photos?$format=JSON')
        .then(res => res.json())
        .then(data => data.value),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  onHealthCheck: () => fetch('https://services.odata.org/V4/TripPinService/Photos?$format=JSON'),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});