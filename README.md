# Fediverse Helper

Typescript/Javascript library that provides basic API calls and utility functions
that are useful to interact with ActivityPub-based Fediverse instances. It
supports also related protocols and specifications such as Webfinger.

## Getting Started

```sh
# Not yet published
$ yarn add @networld-to/fediverse-helper
```

See the following usage example to get started.

```js
import FediverseAccount from '@networld-to/fediverse-helper';

const fediAccount = new FediverseAccount('@user@instance.tld');

console.log(fediProfile.getInstanceHost());
fediProfile.getAccountInfo(this.email).then((profile) => {
  console.log(profile);
});
```

## Functionality

The FediverseAccount class accepts the fediverse handle as input parameter
during the instantiation. Everything else is derived from it by making the
right calls and parsing the right data.

| Function         | Params | Output                 |
| ---------------- | ------ | ---------------------- |
| getInstanceHost  | None   | fediverseHost (String) |
| getWebfingerInfo | None   | webfingerInfo (Object) |
| getInstanceInfo  | None   | instanceInfo (Object)  |
| getAccountInfo   | None   | accountInfo (Object)   |
| getOutboxPosts   | None   | posts (\[Object\])     |

The getHandleHost is an internal helper function that splits the fediverse
handle into two parts and returns the hostname of it. For the instance host
use the getInstanceHost function. The fediverse handle may only be an alias
to the real instance.

## Developers

```sh
# To run ./client/main.js after compiling the library (see ./dist output)
$ yarn run client @username@instance.tld
```

Alternatively run the steps manually.

```sh
# Make your changes in files under ./src/
$ yarn run tsc
# see output under ./dist

# Change code under ./client/main.js and run it
$ node ./client/main.js @username@instance.tld
```
