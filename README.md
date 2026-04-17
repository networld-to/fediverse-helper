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
import FediverseAccount from "@networld-to/fediverse-helper";

const fediAccount = new FediverseAccount("@user@instance.tld");

console.log(fediAccount.getInstanceHost());
fediAccount.getAccountInfo().then((profile) => {
  console.log(profile);
});
```

## Functionality

The FediverseAccount class accepts the fediverse handle as input parameter
during the instantiation. Everything else is derived from it by making the
right calls and parsing the right data.

| Function         | Params                                 | Output                 | Caching                |
| ---------------- | -------------------------------------- | ---------------------- | ---------------------- |
| getInstanceHost  | None                                   | fediverseHost (String) | Not needed, local call |
| getWebfingerInfo | forceFetch: boolean = false (optional) | webfingerInfo (Object) | Yes                    |
| getInstanceInfo  | forceFetch: boolean = false (optional) | instanceInfo (Object)  | Yes                    |
| getAccountInfo   | forceFetch: boolean = false (optional) | accountInfo (Object)   | Yes                    |
| getOutboxPosts   | None                                   | posts (\[Object\])     | No                     |

The getHandleHost is an internal helper function that splits the fediverse
handle into two parts and returns the hostname of it. For the instance host
use the getInstanceHost function. The fediverse handle may only be an alias
to the real instance.

## Developers

> [!TIP]
> If you have [Nix](https://nixos.org) installed make sure to use either direnv,
> via `direnv allow` (first time afterwards it will switch you automatically
> into the environment) or `nix develop` to switch to the development
> environment to have the right tools.

```sh
$ yarn install
# To run ./client/main.js after compiling the library (see ./dist output)
$ yarn run client @username@instance.tld
```

Alternatively run the steps manually.

```sh
$ yarn install

# Make your changes in files under ./src/
$ yarn build
# see output under ./dist

# Change code under ./client/main.js and run it
$ node ./client/main.js @username@instance.tld
```

To update the development dependencies, such as node, yarn and typescript run `nix flake update`.
