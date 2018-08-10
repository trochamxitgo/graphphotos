const fetch = require("node-fetch");


const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  
  type Photo{

     Id: String
     Name: String

  }

  type Query {
    photos(parameter:String): [Photo]
    Name: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    photos: (parent, args) =>
      fetch('https://services.odata.org/V4/TripPinService/Photos?$format=JSON&$filter=Id%20eq%20' + args.parameter)
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
