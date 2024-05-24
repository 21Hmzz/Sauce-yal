import jwt from 'jsonwebtoken';

export const APP_SECRET = 'your-app-secret';

interface JwtPayload {
  userId: string;
}

export function getUserId(context: any): string {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = jwt.verify(token, APP_SECRET) as JwtPayload;
    return verifiedToken.userId;
  }

  throw new Error('Not authenticated');
}
