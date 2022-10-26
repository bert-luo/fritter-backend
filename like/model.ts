import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';
import type {Freet} from '../freet/model';

/**
 * This file defines the properties stored in a Like
 * DO NOT implement operations here ---> use collection file
 */


// Type definition for Like on the backend
export type Like = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  user: User;
  parentPost:  Freet; 
  dateLiked: Date;
};



// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const LikeSchema = new Schema<Like>({
  // The author userId
  user: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // The parent Freet
  parentPost: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  // The date the freet was liked
  dateLiked: {
    type: Date,
    required: true
  },
});



const LikeModel = model<Like>('Like', LikeSchema);
export default LikeModel;
