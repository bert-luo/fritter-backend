import type {HydratedDocument, Types} from 'mongoose';
import ChannelModel from './model';
import { Channel } from './model';
import UserCollection from '../user/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 * 
 * Actions: 
 *  add new like 
 *  find by Like ID
 *  delete like by ID
 * 
 *  find all freet likes 
 *  
 */
class ChannelCollection {

  /**
   * Add an account to a Channel
   *
   * @param {string} ownerId - The ID of the channel owner
   * @param {string} accountId - The ID of account being removed from the channel
   * @return {Promise<HydratedDocument<Channel>>} - The newly created Channel
   */
  static async addOne(ownerId: Types.ObjectId | string, name: string,  accountId: string): Promise<HydratedDocument<Follow>> {
    const owner = await UserCollection.findOneByUserId(ownerId);
    const account = await UserCollection.findOneByUserId(accountId);
    const channel = new ChannelModel({
        owner,
        name,
        account
    });
    await channel.save(); // Saves freet to MongoDB
    return channel.populate(['owner','name', 'account']);
  }

  /**
   * remove a user from an account
   *
   * @param {string} ownerId - The ID of the channel owner
   * @param {string} name - The name of the channel 
   * @param {string} accountId - The ID of account being removed from the channel
   */

   static async deleteOne(ownerId: Types.ObjectId | string, name: string,  accountId: string): Promise<boolean> {
    const owner = await UserCollection.findOneByUserId(ownerId);
    const account = await UserCollection.findOneByUserId(accountId);
    const remove = await FollowModel.deleteOne({owner: owner, name: name, account: account});
    return remove !== null;
  }


  /**
   * Find all accounts under a certain channel by name and owner
   *
   * @param {string} ownerId - The ID of the channel owner
   * @param {string} name - The name of the channel 
   */
   static async findAll(ownerId: Types.ObjectId | string, name: string,): Promise<HydratedDocument<Channel>> {
    const owner = await UserCollection.findOneByUserId(ownerId);
    return ChannelModel.find({owner: owner, name: name}).populate(['owner', 'name', 'account']);
  }


}

export default ChannelCollection;
