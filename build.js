var fs = require("fs");
var path = require("path");

function exec(cmd) {
    try {
        var output = String(require("child_process").execSync(cmd)).trim();
        return output;
    } catch (err) {
        console.log(String(err.stdout));
        throw err;
    }
}

function buildProject() {
    exec("tsc -p .");
}

function copy(from, to) {
    
}

function walk(dir) {
    var results = [];
    list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else results.push(file);
    })
    return results;
}

function pushArtifacts(artifacts) {
    makeDir("");
    artifacts.forEach((file) => {
        console.log("Pushing " + file);
        pushFile(file);
    });
}

function deploy(codeOnly) {
    var cordovaDir = "";

    if (!cordovaDir === "cordova") {
        exec("xcopy assets/* " + cordovaDir + "/assets/");
        exec("xcopy lib/* " + cordovaDir + "/lib/");
    } else {
        console.log("Cordova directory not specified, edit in build.js ...");
    }
}

var option = process.argv[2];
var validCommand = true;
if (option) {
    switch (option) {
        case "--build":
            buildProject();
            break;

        default:
            console.log("Invalid Option ...");
            validCommand = false;
            break
        
    }

    if (validCommand) {
        console.log("Done");
    } else {
        console.log("Error");
    }
}