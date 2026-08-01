import { auth } from '../utils/auth.js';

// Protect routes - Verify Better Auth Session
export const protect = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      res.status(401);
      return next(new Error('Not authorized, no session found'));
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    res.status(401);
    next(new Error('Not authorized, session validation failed'));
  }
};

// Admin middleware - Restrict access to admin users
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    next(new Error('Not authorized as an admin'));
  }
};
