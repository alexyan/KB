var exec    = require('child_process').exec
    , path  = require("path")
    , fs    = require("fs");

var certDir = path.join(getUserHome(),"/.KB/")
    cwd     = "./shell/";

if(!fs.existsSync(certDir)){
    fs.mkdirSync(certDir);
}

function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var Keyboard = {
    on: function(){
        var cmd = "./enable __user@__host".replace(/__host/,'192.168.2.5').replace(/__user/,'alex');
        exec(cmd, {cwd:cwd}, function(err,stdout,stderr){
            if(err){
                console.log("enable failed");
            }
        });
    },
    off: function(){
        var cmd = "./release __user@__host".replace(/__host/,'192.168.2.5').replace(/__user/,'alex');
        exec(cmd, {cwd:cwd}, function(err,stdout,stderr){
            if(err){
                console.log("disable failed");
            }
        });
    }
};

module.exports = Keyboard;