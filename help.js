const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('totally helpful description seriously why would this command even need one'),
	async execute(interaction) {
await interaction.reply('https://sites.google.com/view/brm75socials/or1-help');
	},
};

// L:OL