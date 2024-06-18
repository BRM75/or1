const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('mm7829')
		.setDescription('Dude.'),
	async execute(interaction) {
        const grammer = require('C:/Users/brm75/OneDrive/Desktop/or1/mmed.json')
        const mm = grammer[Math.floor(Math.random() * grammer.length)];
		await interaction.reply(mm);
	},
};

// why did I get banned 5 times from his server 