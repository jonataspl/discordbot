const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("Some title")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true }
  )
  .addFields({
    name: "Inline field title",
    value: "Some value here",
    inline: true,
  });

channel.send({ embeds: [exampleEmbed] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("git")
    .setDescription("Responde com 'Pong!'"),

  async execute(interaction) {
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
