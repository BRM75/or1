const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: 's',
	data: new SlashCommandBuilder()
		.setName('fireglitchy')
		.setDescription('NIPE!!!!!!!!!1'),
	async execute(interaction) {
		const fireglitch = require('C:/Users/brm75/OneDrive/Desktop/or1/fg64.json')
        const fireglitchy64 = fireglitch[Math.floor(Math.random() * fireglitch.length)];
		await interaction.reply(fireglitchy64);
	},
};

// hi fireglitchy!!!!