import type {HydratedDocument, Types} from 'mongoose';
import FollowModel from './model';
import type {Follow} from './model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

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
class FollowCollection {

  /**
   * Add a Follow to the collection
   *
   * @param {string} freetId - The id of the author of the freet
   * @param {string} userId - The id of the content of the freet
   * @return {Promise<HydratedDocument<Like>>} - The newly created freet
   */
  static async addOne(followerId: Types.ObjectId | string, followingId: string): Promise<HydratedDocument<Follow>> {
    const follower = await UserCollection.findOneByUserId(followerId);
    const following = await UserCollection.findOneByUserId(followingId);
    const date = new Date();

    const follow = new FollowModel({
        follower,
        following,
        date
    });
    await follow.save(); // Saves freet to MongoDB
    return follow.populate(['follower','following']);
  }

  /**
   * Unfollow a user with given userId
   *
   * @param {string} followerId - The ID of the user following 
   * @param {string} followingId - The ID of user getting unfollowed
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */

   static async deleteOne(followerId: Types.ObjectId | string, followingId: Types.ObjectId | string): Promise<boolean> {
    const follower = await UserCollection.findOneByUserId(followerId);
    const following = await UserCollection.findOneByUserId(followingId);
    
    const unfollow = await FollowModel.deleteOne({follower: follower, following: following});
    return unfollow !== null;
  }


  /**
   * Find a follow by followerId and followingId
   *
   * @param {string} followId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
   static async findOne(followerId: Types.ObjectId | string, followingId: Types.ObjectId | string): Promise<HydratedDocument<Follow>> {
    const follower = await UserCollection.findOneByUserId(followerId);
    const following = await UserCollection.findOneByUserId(followingId);
    return (await FollowModel.findOne({follower: follower, following: following}));
  }


}

export default FollowCollection;
