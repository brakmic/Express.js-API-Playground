// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const jwtAuthMiddleware = (exclusions?: string[]) => {
  return function(req: Request, res: Response, next: NextFunction) {
    if (exclusions && exclusions.some(exclusion => req.url === exclusion || req.url.startsWith(`${exclusion}/`))) {
      // Allow access to excluded paths without authentication
      return next();
    }

    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
}

export {
  jwtAuthMiddleware
}
