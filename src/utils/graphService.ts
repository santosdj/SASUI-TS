const graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken:string) {
  const client = graph.Client.init({
    authProvider: (done:any) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client
    .api('/me')
    .select('displayName,mail,userPrincipalName,photo')
    .get();

  return user;
}

export async function getUserPhoto(userId : string, accessToken : string) {

  var url = 'https://graph.microsoft.com/v1.0/' + userId + '/photo/$value';

  return fetch(url, {
      method: 'GET',
      headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      },
  });

}