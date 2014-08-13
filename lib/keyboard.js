var exec        = require('child_process').exec
    , path      = require("path")
    , fs        = require("fs")
    , prompt    = require('cli-prompt');

var certDir = path.join(getUserHome(),"/.KB/")
    cwd     = "./shell/";

function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var Keyboard = {
    setup: function(){
        prompt.multi([
            {
                key:'user',
                label:'user'
            },{
                key:'host',
                label:'host'
            }
        ],function(result) {
            var data = {
                user: result.user,
                host: result.host
            };
            if(!fs.existsSync(certDir)){
                fs.mkdirSync(certDir);
            }

            fs.writeFile(certDir + 'config.json', JSON.stringify(data), function (err) {
                if (err) throw err;
                //console.log(JSON.stringify(data));
            });
        });
    },
    on: function(){
        fs.exists(certDir + 'config.json', function (exists) {
            if(exists){
                fs.readFile(certDir + 'config.json', function (err, data) {
                    if (err) throw err;
                    data = JSON.parse(data.toString());
                    var cmd = "./enable __user@__host".replace(/__host/,data.host).replace(/__user/,data.user);
                    exec(cmd, {cwd:cwd}, function(err,stdout,stderr){
                        if(err){
                            console.log("enable failed");
                        }
                    });
                });
            }else{
                console.log('请先执行KB setup');
            }
        });

    },
    off: function(){
        fs.exists(certDir + 'config.json', function (exists) {
            if(exists){
                fs.readFile(certDir + 'config.json', function (err, data) {
                    data = JSON.parse(data.toString());
                    var cmd = "./release __user@__host".replace(/__host/,data.host).replace(/__user/,data.user);
                    exec(cmd, {cwd:cwd}, function(err,stdout,stderr){
                        if(err){
                            console.log("disable failed");
                        }
                    });
                });
            }else{
                console.log('请先执行KB setup');
            }
        });
    }
};

module.exports = Keyboard;