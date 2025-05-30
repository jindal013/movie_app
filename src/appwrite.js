import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  // 1. use appwrite SDK to check if the search term exists in the database
  try {
   const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal('searchTerm', searchTerm)
   ]) 

   // 2. if it does, update the count
   if (result.documents.length > 0){
    const doc = result.documents[0];

    await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
      count: doc.count + 1,
    })
  // 3. if it doesn't, create a new document with the search term and count as 1
  } else{
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      searchTerm: searchTerm,
      count: 1,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      movie_id: movie.id
    })

   } 

  } catch (error) {
    console.error(error);
  }
}

export const getTrendingMovies = async () => {
  // does not take any paramters because it's just the top movies by count list
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ]);

    // console.log(result.documents)

    return result.documents;
    
  } catch (error) {
    console.error(error);
  }
}