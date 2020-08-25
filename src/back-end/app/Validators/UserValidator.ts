import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({}, [rules.email({ sanitize: true })]),
    password: schema.string.optional({}, [
      rules.minLength(4),
      rules.requiredIfNotExists('remember_me_token'),
    ]),
    remember_me_token: schema.string.optional({}, [
      rules.requiredIfNotExists('password'),
    ]),
    avatar_url: schema.string.optional(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: 'The {{ field }} is required to sign up',
    requiredIfNotExists: 'The {{ options.otherField }} requires {{ field }}',
    email: 'Please, provide a valid e-mail address',
    'password.minLength': 'The password should have, at least, 4 characters',
  };
}
