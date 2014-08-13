#!/usr/bin/env node

var commander       = require('commander')
    , conf          = require('../package.json')
    , Keyboard      = require('../lib/keyboard');

commander
    .version(conf.version)
    .parse(process.argv);

commander
    .command('on')
    .description("Enable bluetooth keyboard")
    .action(function(){
        Keyboard.on();
    });

commander
    .command('off')
    .description("Disable bluetooth keyboard")
    .action(function(){
        Keyboard.off();
    });

commander
    .command('setup')
    .description("setup")
    .action(function(){
        Keyboard.setup();
    });

commander.parse(process.argv);
var args = process.argv.slice(3);
var subcmd = commander.args[0];
if (!subcmd) {
    process.stdout.write(commander.helpInformation());
    commander.emit('--help');
    process.exit();
}


