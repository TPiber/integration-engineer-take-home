import { Document, MongoClient } from "mongodb";

export class MongoDatabase {
  private client: MongoClient;

  constructor() {
    /* Typically, environment variables are used to store the connection string for security reasons. However, for this test, it will be exposed since the database will be deleted later. */
    this.client = new MongoClient(
      "mongodb+srv://admin:admin@cluster0.kfnwdny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  }

  // Method to establish a connection to the MongoDB client
  async connect() {
    await this.client.connect();
  }

  // Method to close the connection to the MongoDB client
  async disconnect() {
    await this.client.close();
  }

  // Retrieves a specific collection from the database by its name
  getCollection(collectionName: string) {
    return this.client.db("mydb").collection(collectionName);
  }

  // Creates a new document in the specified collection
  async create(collectionName: string, insert: Document) {
    const result = await this.getCollection(collectionName).insertOne(insert);
    return result.insertedId; // Returns the ID of the inserted document
  }

  // Fetches all documents from a specified collection
  async getDocuments(collectionName: string) {
    return await this.getCollection(collectionName).find().toArray();
  }

  // Deletes a document from a specified collection by its ID
  async delete(collectionName: string, id: Uint8Array) {
    return await this.getCollection(collectionName).deleteOne({ _id: id });
  }

  // Updates a document in a specified collection by its ID
  async update(collectionName: string, id: Uint8Array, update: Document) {
    return await this.getCollection(collectionName).updateOne(
      { _id: id },
      { $set: update } // Uses the $set operator to update the document
    );
  }
}
