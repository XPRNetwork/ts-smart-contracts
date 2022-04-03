import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export const privateKey = crypto.createPrivateKey({
  key: fs.readFileSync(path.resolve(__dirname, './private.pem')),
  format: 'pem',
  type: 'pkcs1'
})

export const publicKey = crypto.createPublicKey({
  key: fs.readFileSync(path.resolve(__dirname, './public.pem')),
  format: 'pem',
  type: 'pkcs1'
})

export const sign = (data: string) => {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  sign.end();
  return sign.sign(privateKey).toString('hex');
}

export const pubKeyData = {
  exponent: '10001',
  modulus: publicKey.export({ type: 'pkcs1', format: 'der' }).toString('hex').slice(18, -10)
}