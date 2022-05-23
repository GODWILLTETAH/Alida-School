const graphql = require('graphql');
//define object types e.g books and author. something like an entity
const _ = require('lodash');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = graphql;

//dummy data
var books = [
    { name: 'book1', genre: 'genre1', id: '1', authorId: '1' },
    { name: 'book2', genre: 'genre2', id: '2', authorId: '2' },
    { name: 'book3', genre: 'genre3', id: '3', authorId: '3' },
    { name: 'book4', genre: 'genre4', id: '4', authorId: '2' },
    { name: 'book5', genre: 'genre5', id: '5', authorId: '3' },
    { name: 'book6', genre: 'genre6', id: '6', authorId: '3' },
];

var authors = [
    { name: 'auth1', age: 44, id: '1' },
    { name: 'auth2', age: 42, id: '2' },
    { name: 'auth3', age: 66, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //like attributes
        // we wrap in a function blc we can add many types later
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, arg){
                //console.log(parent);
                return _.find(authors,{id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({ //like attributes
        // we wrap in a function blc we can add many types later
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});


//set up entry point
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } }, // like book(id: "123"){}
            resolve(parent, args) {
                //code to get data from DB or other source
                //console.log(typeof (args.id));
                return _.find(books, { id: args.id });
            }
        }, //will use this name when performing query
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return _.find(authors, {id:args.id})
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },

        authors: {
            type: new GraphQLList (AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
});