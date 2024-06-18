const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('liggy')
		.setDescription('smocking:'),
	async execute(interaction) {
		const littleresponses = require('C:/Users/brm75/OneDrive/Desktop/or1/liggy.json')
        const littlelist = littleresponses[Math.floor(Math.random() * littleresponses.length)];
		await interaction.reply(littlelist);
	},
};

//littleliggyligmalgm64