var Botkit = require('botkit');
var express = require('express');

var middleware = require('botkit-middleware-watson')({
  username: "38993956-e2c7-44ef-9f47-8c919fabfb2d",
  password: "6BwipxfifYuD",
  workspace_id: "b9eb1349-d216-4658-b7d1-e23b68ccd310",
  version_date: '2016-09-20'
});


// Configure your bot.
var slackController = Botkit.slackbot();
var slackBot = slackController.spawn({
  token: "xoxb-187333742785-JZIXnGbVCAOhCbWh5mNeSEU7"
});

slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  slackController.log('Slack message received');
  middleware.interpret(bot, message, function(err) {
    if (!err)
		  bot.reply(message, message.watsonData.output.text.join('\n'));
	});
    
});

slackBot.startRTM();

// Create an Express app
var app = express();
var port = process.env.PORT || 5000;
app.set('port', port);
app.listen(port, function() {
  console.log('Client server listening on port ' + port);
});
