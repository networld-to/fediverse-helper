import FediverseAccount from '../dist/index.es.js';

const args = process.argv;

// Accepts as input parameter the fedivese handle in the form @username@instance.tld or username@instance.tld
if (args[2] != null) {
  // main(args[2]);
  developmentTest(args[2]);
} else {
  console.log('Usage:');
  console.log('  yarn run client @username@instance.tld');
}

async function main(fedihandle) {
  const obj = new FediverseAccount(fedihandle);

  console.log('CONFIGURED :: Fediverse Handle :: ', fedihandle);
  console.log();

  const instanceHost = await obj.getInstanceHost(fedihandle);
  console.log('QUERIED    :: Instance Host    :: ', instanceHost);

  const instanceInfo = await obj.getInstanceInfo();
  console.log('QUERIED    :: Instance Info    :: ', instanceInfo);
  console.log();

  const accountInfo = await obj.getAccountInfo();
  console.log('QUERIED    :: Account Info     :: ', accountInfo);
  console.log();

  const posts = await obj.getOutboxPosts();
  console.log('QUERIED    :: Outbox Posts     :: ', posts);
}

async function developmentTest(fedihandle) {
  const obj = new FediverseAccount(fedihandle);

  console.log('CONFIGURED :: Fediverse Handle :: ', fedihandle);
  console.log();

  console.log('API call       ', (await obj.getWebfingerInfo()).subject);
  console.log('Cached         ', (await obj.getWebfingerInfo()).subject);
  console.log('Forced API call', (await obj.getWebfingerInfo(true)).subject);
}