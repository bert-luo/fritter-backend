import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FollowCollection from './collection';
import UserCollection from '../user/collection';

/**
 * Checks if a follow exists based on follower and following id's
 */
 const isFollowExists = async (req: Request, res: Response, next: NextFunction) => {
    const follower = await UserCollection.findOneByUserId(req.session.userId);
    const following = await UserCollection.findOneByUsername(req.body.username);
    const follow = await FollowCollection.findOne(follower._id, following._id);
    if (!follow) {
      res.status(404).json({
        error: {
          followNotFound: `haven't followed this user yet, can't unfollow.`
        }
      });
      return;
    }
  
    next();
  };

  /**
 * Checks if a follow does not exists based on follower and following id's
 */
 const isFollowNotExists = async (req: Request, res: Response, next: NextFunction) => {
    const follower = await UserCollection.findOneByUserId(req.session.userId);
    const following = await UserCollection.findOneByUsername(req.body.username);
    const follow = await FollowCollection.findOne(follower._id, following._id);
    if (follow) {
      res.status(404).json({
        error: {
          followNotFound: `already following this user.`
        }
      });
      return;
    }
  
    next();
  };

  const isFollowSelf = async (req: Request, res: Response, next: NextFunction) => {
    const followerId = await UserCollection.findOneByUserId(req.session.userId);
    const followingId = req.body.username; 
    if (followerId == followingId) {
      res.status(405).json({
        error: {
          followNotFound: `can't follow yourself`
        }
      });
      return;
    }
  
    next();
  };

  const isFollowingUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const following = await UserCollection.findOneByUsername(req.body.username); 
    if (following) {
      res.status(404).json({
        error: {
          followNotFound: `user doesn't exist`
        }
      });
      return;
    }
  
    next();
  };

  export {
    isFollowExists,
    isFollowNotExists,
    isFollowSelf, 
    isFollowingUserExists
  };