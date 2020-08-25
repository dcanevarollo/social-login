import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';
import GoogleLogin from 'App/Services/Auth/GoogleLogin';
import FacebookLogin from 'App/Services/Auth/FacebookLogin';

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(LoginValidator);

    let service: GoogleLogin | FacebookLogin;

    if (data.type === 'google') service = new GoogleLogin(data.token);
    else service = new FacebookLogin(data.token);

    const user = await service.execute();

    await user.related('tokens').query().where('type', 'opaque_token').delete();

    const token = await auth.login(user, { expiresIn: '7 days' });

    return response.accepted({ token, user });
  }

  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout();

    return response.ok(null);
  }
}
