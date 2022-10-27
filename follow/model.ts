import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

/**
 * This file defines the properties stored in a Follow
 * DO NOT implement operations here ---> use collection file
 */


// Type definition for Follow on the backend
export type Follow = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  follower: User;
  following:  User; 
  dateFollowed: Date;
};



// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const FollowSchema = new Schema<Follow>({
    // The author userId
    follower: {
      // Use Types.ObjectId outside of the schema
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    // The parent Freet
    following: {
      // Use Types.ObjectId outside of the schema
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    // The date the freet was liked
    dateFollowed: {
      type: Date,
      required: true
    },
  });
  
  
  
  const LikeModel = model<Follow>('Follow', FollowSchema);
  export default LikeModel;
  