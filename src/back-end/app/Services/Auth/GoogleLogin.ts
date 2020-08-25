import Env from '@ioc:Adonis/Core/Env';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import User from 'App/Models/User';

export default class GoogleLogin {
  constructor(private token: string) {}

  public async execute() {
    const clientId = Env.getOrFail('GOOGLE_CLIENT_ID') as string;

    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: this.token,
      audience: clientId,
    });

    const payload = ticket.getPayload() as TokenPayload;

    const user = await User.firstOrCreate(
      { email: payload.email },
      {
        name: payload.name,
        email: payload.email,
        avatarUrl: payload.picture,
      }
    );

    return user;
  }
}
