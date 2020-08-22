# disca

A Discord.JS Project Builder

### Installation

```bash
npm i disca -g
```

### Usage

#### Creating A Project

```bash
disca
```

And complete the following prompts.

#### TypeScript

Disca does support TypeScript, but it requires the NPM package "typescript" to be installed globally

```bash
npm i typescript -g
```

### Documentation

#### Command Handler

##### Basic Example

```js
const commands = new CommandHandler(client);

commands.RegisterCommand({
  name: "ping",
  aliases: [],
  permissions: {
    bot: ["SEND_MESSSAGES"],
    user: [],
  },
  execute: (message, client, args) => {
    message.channel.send("Pong!");
  },
});
```
