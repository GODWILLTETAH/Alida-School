const graphql = require('graphql');
//define object types e.g books and author. something like an entity
const _ = require('lodash');
const Book = require ('../model/book');
const Author = require ('../model/author')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// //dummy data
// var books = [
//     { name: 'book1', genre: 'genre1', id: '1', authorId: '1' },
//     { name: 'book2', genre: 'genre2', id: '2', authorId: '2' },
//     { name: 'book3', genre: 'genre3', id: '3', authorId: '3' },
//     { name: 'book4', genre: 'genre4', id: '4', authorId: '2' },
//     { name: 'book5', genre: 'genre5', id: '5', authorId: '3' },
//     { name: 'book6', genre: 'genre6', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'auth1', age: 44, id: '1' },
//     { name: 'auth2', age: 42, id: '2' },
//     { name: 'auth3', age: 66, id: '3' },
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //like attributes
        // we wrap in a function blc we can add many types later
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, arg){
                console.log(parent);
                //return _.find(authors,{id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({ //like attributes
        // we wrap in a function blc we can add many types later
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, {authorId: parent.id})
                return Book.findById({authorId: parent.Id});
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
            args: { id: { type: GraphQLID } }, // like book(id: "123"){}
            resolve(parent, args) {
                //code to get data from DB or other source
                //console.log(typeof (args.id));
               // return _.find(books, { id: args.id });
               return Book.findById(args.id)
            }
        }, //will use this name when performing query
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
               // return _.find(authors, {id:args.id})
               return Author.findById(args.id)
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books
                return Book.find({})
            }
        },

        authors: {
            type: new GraphQLList (AuthorType),
            resolve(parent, args){
                //return authors
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, args){
                //new DB data
                let author = new Author({
                    name: args.name,
                    age: args.age
                });

                return author.save()
            }
        },

        addBook: {
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString) },
                genre:{type:new GraphQLNonNull (GraphQLString) },
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name : args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});