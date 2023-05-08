import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Db } from '../persistence';


interface JwtPayload {
  sub: string;
  email?: string;
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'aab++112',  // Local secret key
  algorithms: ['HS256'],  // We are using HS256 for local testing,
  jsonWebTokenOptions: {
    ignoreExpiration: false
  }
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
  try {
    const user = await Db.getInstance().findOne(jwtPayload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

jwtStrategy.name = 'jwt';

passport.serializeUser((user, done) => {
  if (user) done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await Db.getInstance().findOne(id);
  done(null, id);
});

export {
  JwtPayload,
  jwtStrategy
}
