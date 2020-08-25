import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserValidator from 'App/Validators/UserValidator';
import User from 'App/Models/User';

export default class UsersController {
  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(UserValidator);

    const user = await User.firstOrCreate({ email: data.email }, data);

    const token = await auth.login(user, { expiresIn: '7 days' });

    return response.created({ token, user });
  }
}
