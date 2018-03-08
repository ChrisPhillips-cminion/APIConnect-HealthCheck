var Client = require('ssh2').Client;
var inquirer = require("inquirer");
var conn = new Client();

var fet = require('foreachthen');
var fs = require('fs');
var i = 0;
var p = [];
var q = [];

const {
    StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');


var inquirer = require('inquirer');

var questions = [{
        type: 'input',
        name: 'server',
        message: "API Manager Host exposing port 22",
        default: function() {
            return 'apimdev2017';
        }
    },
    {
        type: 'password',
        name: 'password',
        message: 'Admin user\'s Password',
        default: function() {
            return '!n0r1t5@C';
        }
    }

];


inquirer.prompt(questions).then(answers => {
    // console.log(JSON.stringify(answers, null, '  '));

    outPutDir = answers.out;

    var config = {
        host: answers.server,
        port: 22,
        username: 'admin',
        password: answers.password
    };



    connect(config, q, outPutDir);


});

function connect(config, q, outPutDir) {
    var conn = new Client()

    conn.on('ready', function() {

        captureFile(conn, outPutDir, function(message) {
            var array = message.split(/\n/);
            var key = undefined;
            var result = {};
            for (var i = 0; i < array.length; i++) {

                switch (array[i]) {
                    case "":
                        break;
                    case "DISK USAGE:":
                        key = "DISKUSAGE"
                        result[key] = [];
                        break;
                    case "MEMORY USAGE (MB):":
                        key = "MEMORYUSAGE"
                        result[key] = [];
                        break;
                    case "UPTIME:":
                        key = "UPTIME"
                        result[key] = [];
                        break;
                    case "ACTIVE PROCESSES:":
                        key = "ACTIVE_PROCESSES"
                        result[key] = [];
                        break;
                    default:

                        result[key].push(array[i]);

                }
            }
            // console.log(result)
            diskSpaceProcess(result.DISKUSAGE);
            memorysUsageProcess(result.MEMORYUSAGE)
            uptimeProcess(result.UPTIME)
            activeProcess(result['ACTIVE_PROCESSES']);

        });

        return conn;
    }).connect(config);
}

function diskSpaceProcess(array) {
    array.forEach(function(l) {
        var e = l.split(/ +/);
        if (e[4].replace('%','')>39) {
            console.log("ALERT: DiskSpace over 40% \t" +e)
        }

    })
}
function memorysUsageProcess(array) {
    array.forEach(function(l) {
        var e = l.split(/ +/);
        var perc = e[2] / e[1];
        if ( perc > .60) {
            console.log("ALERT: Memory over 60% \t\t" +e+" ("+perc*100+"%)")
        }

    })
}
//   [ ' 11:03:21 up 11 days, 13:01,  1 user,  load average: 0.14, 0.12, 0.09' ],

function uptimeProcess(array) {
    console.log("Up for "+array[0].split(/\,+/)[0]);
}

function activeProcess(array) {
  console.log("Number of Active Processess:\t" +array.length)
  array.forEach(function(e) {
    var memA = e.split(/ +/)
    var mem = memA[9];
    if (mem >= 1) {
      console.log("Processes using more then 1% of memory \t"+memA[10])
    }
  });
}
function captureFile(conn, outPutDir, cb) {
    var toReturn = "";
    conn.exec('stat show  all', function(err, stream) {
        if (err) {
            throw err;
        }
        stream.on('close', function(code, signal) {
            // console.log('Stream :: close ::  code: ' + code + ', signal: ' + signal);
            conn.end();
            cb(toReturn);
        }).on('data', function(data) {
            toReturn = toReturn + data.toString();
        }).stderr.on('data', function(data) {
            console.error("ERROR")
        });
    });
}
