const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('ctb')
		.setDescription('WOW NOW ANT-TÜRKİNG!'),
	async execute(interaction) {
		const ctbquotes = require('C:/Users/brm75/OneDrive/Desktop/or1/ctb.json')
        const ctbresponse = ctbquotes[Math.floor(Math.random() * ctbquotes.length)];
		await interaction.reply(ctbresponse);
	},
};

//littleliggyligmalgm64