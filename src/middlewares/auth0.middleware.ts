import {expressjwt} from "express-jwt";
import jwksRsa from "jwks-rsa";

const authMiddleware = expressjwt({
  
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-6eq2fak8rsh6n851.us.auth0.com/.well-known/jwks.json`,
  }),
  audience: 'https://api.movie-site-demo.com',
  issuer: `https://dev-6eq2fak8rsh6n851.us.auth0.com/`,
  algorithms: ["RS256"],
});

export default authMiddleware;