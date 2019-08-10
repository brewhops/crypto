import { createCipheriv } from 'crypto';
import { json, send } from 'micro';

export default async (req, res) => {
  try {
    const { payload } = await json(req);
    const { ALGORITHM, KEY, IV } = process.env;
    const cipher = createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(payload, 'utf8', 'base64') + cipher.final('base64');
    send(res, 200, encrypted);
  } catch (error) {
    send(res, 500, error.message);
  }
};