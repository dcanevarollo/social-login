import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Env from '@ioc:Adonis/Core/Env';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import User from 'App/Models/User';

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { token: idToken } = request.post();

    const audience = Env.get('GOOGLE_CLIENT_ID') as string;

    const client = new OAuth2Client(audience);

    const ticket = await client.verifyIdToken({ idToken, audience });

    const payload = ticket.getPayload() as TokenPayload;

    const user = await User.firstOrCreate(
      { email: payload.email },
      {
        name: payload.name,
        email: payload.email,
        avatarUrl: payload.picture,
      }
    );

    await user.related('tokens').query().where('type', 'opaque_token').delete();

    const token = await auth.login(user, { expiresIn: '7 days' });

    return response.accepted({ token, user });
  }

  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout();

    return response.ok(null);
  }
}
