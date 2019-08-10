import fs from 'fs';
import { createCipheriv } from 'crypto';
import { json, send } from 'micro';

export default async (req, res) => {
  const { ALGORITHM, KEY, IV } = process.env;
  const { payload } = await json(req);
  const cipher = createCipheriv(ALGORITHM, KEY, IV);
  const encryptedPayload = cipher.update(payload, 'utf-8', 'base-64');
  send(res, 200, encryptedPayload);
};