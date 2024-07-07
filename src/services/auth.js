import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import UsersCollection from "../models/user.js";
import { EMAIL_VARS, FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';
import { Session } from '../models/session.js';
import {env} from '../utils/env.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';



export const registerUser = async (payload) => {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const user = await UsersCollection.findOne({ email: payload.email });

    if (user) {
      throw createHttpError(
        409,
        'Email in use',
      );
    }
    return await UsersCollection.create({
        
        ...payload,
        password: encryptedPassword,
        status: 201,
        // message: "Successfully registered a user!",
    });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  
  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
 
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    console.log('Session not found'); 
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    console.log('Session token expired');
    throw createHttpError(401, 'Session token expired');
  }
  const newSession = createSession();
  await Session.deleteOne({ _id: sessionId , refreshToken});
 

  
  console.log('New session created:', newSession);

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

 export const requestResetToken = async (email) => {
  console.log(` looking for user email: ${email}`);
const user = await UsersCollection.findOne({ email });
console.log(`find user:${user}`);
if (!user) {
  throw createHttpError(404, 'User not found');
};
  const resetToken = jwt.sign(
    {
    sub: user._id,
    email
  }, 
  env('JWT_SECRET'),
  {
    expiresIn: '5m',
  },
);
try {
  await sendEmail({
    from: env(EMAIL_VARS.SMTP_USER),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
} catch(error){
  console.log(error);
  throw createHttpError(500, 'Problem with sending email');
}



 };