const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk')


const login = async (mongouri) => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green('Connected to MongoDB ✅'));
  } catch (error) {
    console.error(chalk.red('Failed to connect to MongoDB:'), error);
  }
};


module.exports = {
  login,
};
