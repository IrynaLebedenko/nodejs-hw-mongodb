import { registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";
import { THIRTY_DAY } from "../constants/index.js";
import { refreshUsersSession } from "../services/auth.js";
import { logoutUser } from "../services/auth.js";
import createHttpError from "http-errors";

export const registerUserController = async (req, res, next) => {
    
  try{
    const user = await registerUser(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

  const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAY),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAY),
    });
  };

export const loginUserController = async (req, res, next) => {
    try { 
    const session = await loginUser(req.body);

  setupSession(res, session);

  res.json ({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    }
});
} catch (error) {
     next (error);
}
};

export const logoutUserController = async (req, res, next) => {
    try {
      const { sessionId, refreshToken } = req.cookies;
  if (!sessionId || !refreshToken) {
   throw createHttpError(400, 'Session ID and refresh token are required');
  }
  await logoutUser(sessionId);

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
} catch (error) {
     next(error);
}
};



export const refreshUserSessionController = async (req, res, next) => {
    try {
      const { sessionId, refreshToken } = req.cookies;
      if (!sessionId || !refreshToken) {
        throw createHttpError(400, 'Session ID and refresh token are required');
      }
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
} catch (error) {
    next (error);
}
};