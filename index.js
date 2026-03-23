const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  ActivityType
} = require('discord.js');

const token = 'MTQ4NTY4NDQxOTM1NTM0OTAzMg.GEqDH7.UoOcHGcRCeW4ywZpu_mKEMh39_m4Wek5d9CD_s';
const clientId = '1485684419355349032';
const guildId = '1483283623430848623';

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Testa o bot'),

  new SlashCommandBuilder()
    .setName('oi')
    .setDescription('O bot te dá um oi'),

  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Mostra o nome do servidor'),

  new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Mostra seu avatar')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Registrando comandos no servidor...');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log('✅ Slash commands registrados no servidor!');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`✅ Bot online como ${client.user.tag}`);

  client.user.setActivity({
    name: 'GhostSys ⚡',
    type: ActivityType.Playing
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
  }

  if (interaction.commandName === 'oi') {
    await interaction.reply(`Salve ${interaction.user.username} 😎`);
  }

  if (interaction.commandName === 'server') {
    await interaction.reply(`Servidor: ${interaction.guild.name}`);
  }

  if (interaction.commandName === 'avatar') {
    await interaction.reply(interaction.user.displayAvatarURL({ size: 1024 }));
  }
});

client.login(token);