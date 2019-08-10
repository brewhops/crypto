import { scryptSync, createCipheriv } from 'crypto';
import { json, send } from 'micro';

export default async (req, res) => {
  const { ALGORITHM, KEY, IV } = process.env;
  try {
    const { payload } = await json(req);
    const password = scryptSync(KEY, 'salt', 24);
    const cipher = createCipheriv(ALGORITHM, password, IV);
    cipher.update(payload, 'utf8', 'base64');
    send(res, 200, cipher.final('base64'));
  } catch (error) {
    send(res, 500, error.message);
  }
};