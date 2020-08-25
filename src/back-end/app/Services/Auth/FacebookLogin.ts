import axios from 'axios';
import User from 'App/Models/User';

interface FacebookProfile {
  name: string;
  email: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export default class FacebookLogin {
  constructor(private token: string) {}

  public async execute() {
    const { data } = await axios.get<FacebookProfile>(
      'https://graph.facebook.com/me',
      {
        params: {
          fields: 'name,email,picture',
          access_token: this.token,
        },
      }
    );

    const user = await User.firstOrCreate(
      { email: data.email },
      {
        name: data.name,
        email: data.email,
        avatarUrl: data.picture?.data.url,
      }
    );

    return user;
  }
}
