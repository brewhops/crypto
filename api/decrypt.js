import { createDecipheriv } from 'crypto';
import { json, send } from 'micro';

export default async (req, res) => {
  try {
    const { payload } = await json(req);
    const { ALGORITHM, KEY, IV } = process.env;
    const decipher = createDecipheriv(ALGORITHM, KEY, IV);
    decipher.setAutoPadding(false);
    let decrypted = decipher.update(payload, 'base64', 'utf8') + decipher.final('utf8');
    send(res, 200, decrypted);
  } catch (error) {
    send(res, 500, error.message);
  }
};