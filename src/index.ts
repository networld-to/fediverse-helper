import axios from 'axios';

const HEADERS = {
  Accept: 'application/json',
};

export default class FediverseAccount {
  handle: string;

  // BEGIN cached data elements
  webfingerInfo: any;
  instanceInfo: any;
  accountInfo: any;
  // END cached data elements

  constructor(handle: string) {
    if (handle == null || handle == '') {
      throw new Error('No fediverse handle provided!');
    }
    this.handle = handle;
  }

  // getHandleHost accepts a fediverse handle and returns the host after the last @
  public getHandleHost(): string {
    let url = 'https://';
    if (this.handle != null) {
      this.handle = this.handle.trim();
      const splitString = this.handle.split('@');
      url = `https://${splitString[splitString.length - 1]}`;
      return url;
    }
    return '';
  }

  // getWebfingerInfo uses the host extracted via getHandleHost and makes a call to the well-known webfinger endpoint
  async getWebfingerInfo(forceFetch: boolean = false): Promise<any> {
    if (this.webfingerInfo && !forceFetch) {
      return this.webfingerInfo;
    }
    // If handle starts with '@' remove it
    if (this.handle.startsWith('@', 0)) {
      this.handle = this.handle.substring(1);
    }

    const instanceHost = this.getHandleHost();
    const wellknownInfo = await axios.get(
      `${instanceHost}/.well-known/webfinger`,
      {
        params: {
          resource: `acct:${this.handle}`,
        },
        headers: HEADERS,
      }
    );
    this.webfingerInfo = wellknownInfo.data;
    return this.webfingerInfo;
  }

  // getInstanceHost uses the received well-known webfinger data to extract the instance host
  async getInstanceHost(): Promise<string> {
    const wellknownInfo = await this.getWebfingerInfo();
    for (const link of wellknownInfo.links) {
      if (link.rel == 'self') {
        const url = new URL(link.href);
        const host = `${url.protocol}//${url.host}`;
        return host;
      }
    }
    return '';
  }

  async getInstanceInfo(forceFetch: boolean = false): Promise<any> {
    if (this.instanceInfo && !forceFetch) {
      return this.instanceInfo;
    }
    const instanceHost = await this.getInstanceHost();
    const wellknown = await axios.get(`${instanceHost}/.well-known/nodeinfo`, {
      headers: HEADERS,
    });
    if (
      wellknown.data &&
      wellknown.data.links &&
      wellknown.data.links.length > 0
    ) {
      const instanceInfoResponse = await axios.get(
        wellknown.data.links[0].href
      );
      this.instanceInfo = instanceInfoResponse.data;
      return this.instanceInfo;
    }
    return '';
  }

  async getAccountInfo(forceFetch: boolean = false): Promise<any> {
    if (this.accountInfo && !forceFetch) {
      return this.accountInfo;
    }
    const wellknownInfo = await this.getWebfingerInfo();

    for (const link of wellknownInfo.links) {
      if (link.rel == 'self') {
        const accountResponse = await axios.get(link.href, {
          headers: {
            Accept: link.type,
          },
        });
        // XXX: Will be overwritten by the last entry with 'rel' == 'self'
        this.accountInfo = accountResponse.data;
      }
    }
    return this.accountInfo;
  }

  async getOutboxPosts(): Promise<Array<any>> {
    const accountInfo = await this.getAccountInfo();

    const orderedCollection = await axios.get(accountInfo.outbox, {
      headers: HEADERS,
    });

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
}
