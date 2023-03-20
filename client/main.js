const fedihelper = require('../dist');

var FEDIVERSE_HANDLE = '';

async function main() {
  console.log('CONFIGURED :: Fediverse Handle :: ', FEDIVERSE_HANDLE);
  console.log();

  const instanceHost = fedihelper.getInstanceHost(FEDIVERSE_HANDLE);
  console.log('DERIVED    :: Instance Host    :: ', instanceHost);

  const instanceInfo = await fedihelper.getInstanceInfo(instanceHost);
  console.log('QUERIED    :: Instance Info    :: ', instanceInfo);
  console.log();

  const accountInfo = await fedihelper.getAccountInfo(FEDIVERSE_HANDLE);
  console.log('QUERIED    :: Account Info     :: ', accountInfo);
  console.log();

  const posts = await fedihelper.getOutboxPosts(FEDIVERSE_HANDLE);
  console.log('QUERIED    :: Outbox Posts     :: ', posts);
}

const args = process.argv;
console.log(args[2]);

if (args[2] != null) {
  FEDIVERSE_HANDLE = args[2];
  main();
} else {
  console.log('Usage:');
  console.log('  yarn run client @username@instance.tld');
}
