import axios from 'axios';

const HEADERS = {
  Accept: 'application/json',
};

// getInstanceHost accepts a fediverse handle as input and returns the instance domain without path
export function getInstanceHost(fediverseHandle: string): string {
  let url = 'https://';
  if (fediverseHandle != null) {
    fediverseHandle = fediverseHandle.trim();
    const splitString = fediverseHandle.split('@');
    url = `https://${splitString[splitString.length - 1]}`;
  }
  return url;
}

export async function getInstanceInfo(instanceHost: string): Promise<any> {
  const wellknown = await axios.get(`${instanceHost}/.well-known/nodeinfo`, {
    headers: HEADERS,
  });
  if (
    wellknown.data &&
    wellknown.data.links &&
    wellknown.data.links.length > 0
  ) {
    const instanceInfo = await axios.get(wellknown.data.links[0].href);
    return instanceInfo.data;
  }
  return '';
}

export async function getAccountInfo(fediverseHandle: string): Promise<any> {
  // If handle starts with '@' remove it
  if (fediverseHandle.startsWith('@', 0)) {
    fediverseHandle = fediverseHandle.substring(1);
  }

  const instanceHost = getInstanceHost(fediverseHandle);
  const wellknownInfo = await axios.get(
    `${instanceHost}/.well-known/webfinger`,
    {
      params: {
        resource: `acct:${fediverseHandle}`,
      },
      headers: HEADERS,
    }
  );

  var accountInfo = '';
  for (const link of wellknownInfo.data.links) {
    if (link.rel == 'self') {
      const accountResponse = await axios.get(link.href, {
        headers: {
          Accept: link.type,
        },
      });
      accountInfo = accountResponse.data;
    }
  }
  return accountInfo;
}

export async function getOutboxPosts(
  fediverseHandle: string
): Promise<Array<any>> {
  const accountInfo = await getAccountInfo(fediverseHandle);

  const orderedCollection = await axios.get(accountInfo.outbox, {
    headers: HEADERS,
  });

  console.log("DEBUG", orderedCollection.data)

  if (orderedCollection.data.first) {
    const firstOrderedCollectionPage = await axios.get(
      orderedCollection.data.first,
      {
        headers: HEADERS,
      }
    );
    return firstOrderedCollectionPage.data.orderedItems;
  }

  return [];
}
