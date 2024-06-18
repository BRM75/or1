const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Dude. No command matching ${interaction.commandName} was found. Wtf r u talking about?`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'L brm pls fix!1!1!!!1!1', ephemeral: true });
			} else {
				await interaction.reply({ content: 'L brm pls fix!1!1!!!1!1', ephemeral: true });
			}
		}
	},
};