import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Profile } from 'passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'https://true-foundry-two.vercel.app/auth/github/callback',
      scope: ['user:email', 'public_repo']
    });
  }

  // Validate the user's authentication and return the user object
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { username, displayName, emails } = profile;
    const user = {
      email: emails ? emails[0].value : null,
      displayName,
      username,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
