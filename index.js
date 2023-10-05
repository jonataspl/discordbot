const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

// DotEnv
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Criação da Collection
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Importação dos comandos

const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandsFile = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFile) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com "data" ou "execute" ausente.`
    );
  }
}

// Login do bot
client.once(Events.ClientReady, (c) => {
  console.log(`Fechou! O ${c.user.tag} chegou!`);
});

client.login(TOKEN);

// Listener de ações com o bot
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return console.log(interaction);
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado!");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar este comando");
  }
});
