const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('s'),
	async execute(interaction) {
		await interaction.reply('or1');
	},
};

/* just built to see if slash commands are working (a non slash version of this was developed in the
first version too but was later removed in version 2) */