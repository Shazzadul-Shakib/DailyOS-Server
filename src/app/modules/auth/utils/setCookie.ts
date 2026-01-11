import { Response } from 'express';
import { envConfig } from '../../../config';

interface ITokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setCookie = (res: Response, tokens: ITokens) => {
  if (tokens.accessToken) {
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: envConfig.node_env === 'production' ? 'none' : 'lax',
    });
  }

  if (tokens.refreshToken) {
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: envConfig.node_env === 'production' ? 'none' : 'lax',
    });
  }
};
