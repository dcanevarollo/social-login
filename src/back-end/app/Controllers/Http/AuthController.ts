import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async store({ request, response }: HttpContextContract) {
    const { token } = request.post();

    return response.ok(null);
  }

  public async delete({ response, auth }: HttpContextContract) {
    await auth.logout();

    return response.ok(null);
  }
}
