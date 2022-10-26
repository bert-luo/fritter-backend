import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import LikeCollection from './collection';

/**
 * Checks if a freet with freetId is req.params exists
 */
const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  const freet = await FreetCollection.findOne(req.params.freetId);
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.params.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};



/**
 * Checks if user has liked a Freet
 */
const isFreetLiked = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserCollection.findOneByUserId(req.session.userId);
  const userId = user._id;

  const freet = await FreetCollection.findOne(req.params.freetId);
  const freetId = freet._id; 

  const like = await LikeCollection.findOne(freetId, userId);
  if (!like) {
    res.status(404).json({
      error: 'Cannot unlike a Freet that has not been liked'
    });
    return;
  }

  next();
};

/**
 * Checks if user has not yet liked a Freet
 */
 const isFreetNotLiked = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserCollection.findOneByUserId(req.session.userId);
  const userId = user._id;

  const freet = await FreetCollection.findOne(req.params.freetId);
  const freetId = freet._id; 

  const like = await LikeCollection.findOne(freetId, userId);
  if (like) {
    res.status(404).json({
      error: 'Cannot like a Freet that has already been liked'
    });
    return;
  }

  next();
};


export {
  isFreetExists,
  isFreetLiked, 
  isFreetNotLiked
};
