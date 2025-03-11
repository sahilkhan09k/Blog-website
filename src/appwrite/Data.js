import conf from "../conf/Conf.js";

import { Client, Databases, ID, Storage, Query } from "appwrite";

export class DataService{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    createdAt: new Date().getTime()
                }
            )
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
           try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    updatedAt: new Date().getTime()
                }
            )
           } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
           }
    }


    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            ) 
            return true;
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
        }
    }

    async getActivePosts(queries = [
        Query.equal("status", "active"),
    ]) {
       try {
        return await this.database.listDocuments(
            conf.appwriteDatabaseId, 
            conf.appwriteCollectionId, 
            queries
        )
       } catch (error) {
        console.error("Appwrite service :: getActivePosts :: error", error);
       }
    }


    //file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
        }
    }

    async deletefile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const dataServices = new DataService();

export default dataServices;