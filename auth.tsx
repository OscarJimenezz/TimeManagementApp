import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

interface IUser {
  id: number;
  username: string;
  password: string;
}

let users: IUser[] = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdQ7Xqomi', 
  },
];

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const registerUser = async (username: string, password: string): Promise<IUser | null> => {
  const hashedPassword = await hashPassword(password);
  const newUser: IUser = {
    id: users.length + 1, 
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await verifyPassword(password, user.password))) {
    res.status(401).send('Invalid username or password');
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token });
};

export const validateSession = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
};