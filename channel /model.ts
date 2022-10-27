import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Follow
 * DO NOT implement operations here ---> use collection file
 */


// Type definition for Follow on the backend
export type Channel = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  owner: User, 
  name: String;
  account: User; 
};



// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ChannelSchema = new Schema<Channel>({
    // The channel owner
    owner: {
        // Use Types.ObjectId outside of the schema
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
    // channel name 
    name: {
      // Use Types.ObjectId outside of the schema
      type: String,
      required: true,
    },
    
    // account belonging to the channel 
    account: {
      type: Schema.Types.ObjectId,
      required: true, 
      ref: "User"
    },
  });
  
  
  
  const ChannelModel = model<Channel>('Channel', ChannelSchema);
  export default ChannelModel;
  