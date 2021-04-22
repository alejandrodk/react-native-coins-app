import axios from 'axios';

export default class Http {
  static instance = new Http();

  HttpRequest = async ({url, method, body, options, headers}) => {
    body = typeof body === 'string' ? body : JSON.stringify(body);
    try {
      const {data} = await axios(url, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...options,
      });

      return data;
    } catch (error) {
      console.error('[Error] HttpRequest: ', error);
      throw new Error(error);
    }
  };

  UrlFactory(endpoint, params) {
    const uri = params
      ? Object.entries(params).reduce((acc, [key, value], index) => {
          const and = !index ? '?' : '&';
          acc = `${acc}${and}${key}=${value}`;
          return acc;
        }, endpoint)
      : endpoint;
    return encodeURI(uri);
  }
}
