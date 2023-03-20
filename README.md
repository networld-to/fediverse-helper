# Fediverse Helper

Typescript/Javascript library that provides basic API calls and utility functions
that are useful to interact with ActivityPub-based Fediverse instances. It
supports also related protocols and specifications such as Webfinger.

## Getting Started

```sh
# Not yet published
$ yarn add @networld-to/fediverse-helper
```

## Functionality

| Function        | Params                   | Output                 |
| --------------- | ------------------------ | ---------------------- |
| getInstanceHost | fediverseHandle (String) | fediverseHost (String) |
| getInstanceInfo | instanceHost (String)    | instanceInfo (Object)  |
| getAccountInfo  | fediverseHandle (String) | accountInfo (Object)   |
| getOutboxPosts  | fediverseHandle (String) | posts (\[Object\])  |

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
