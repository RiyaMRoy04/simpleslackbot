var Botkit = require('botkit');
var express = require('express');

var middleware = require('botkit-middleware-watson')({
  username: "YOUR_WATSON_CONVERSATION_USERNAME",
  password: "YOUR_WATSON_CONVERSATION_PASSWORD",
  workspace_id: "YOUR_WATSON_CONVERSATION_WORKSPACE_ID",
  version_date: '2016-09-20'
});


// Configure your bot.
var slackController = Botkit.slackbot();
var slackBot = slackController.spawn({
  token: "YOUR_SLACKBOT_API_TOKEN"
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
