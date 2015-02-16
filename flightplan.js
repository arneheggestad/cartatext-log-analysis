var plan = require('flightplan');

var appName = 'cartatext-log-analysis';
var username = 'deploy';
var startFile = 'index.js';

var tmpDir = appName+'-' + new Date().getTime();

// configuration
plan.target('staging', [
  {
    host: '104.236.87.39',
    username: username,
    agent: process.env.SSH_AUTH_SOCK
  }
]);

plan.target('production', [
  {
    host: '104.236.87.39',
    username: username,
    agent: process.env.SSH_AUTH_SOCK
  },
//add in another server if you have more than one
// {
//   host: '104.236.87.39',
//   username: username,
//   agent: process.env.SSH_AUTH_SOCK
// }
]);

// run commands on localhost
plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');

  // check git status; abort if there are any uncommitted changes or if there are unpushed commits
  local.log('Checking git status');
  var commitStatus = local.exec('git status -b --porcelain', { silent: true });
  if (commitStatus.stdout !== null) {
    if (commitStatus.stdout.search(/\[/) >= 0) {
      plan.abort('Error: Current branch is different from remote repo.')
    }
    if (commitStatus.stdout.search(/(\sM\s|\s\?\?\s)/) >= 0) {
      plan.abort('Error: Uncommitted file changes found.')
    }
    // check branch name
    var branch = commitStatus.stdout.replace(/(\#\#\s)(.*)\.\.\.(.*\n|.*$)*(.*\n|.*$)?/,'$2')
    if (branch !== plan.runtime.target) {
      var input = local.prompt('Warning! Target is different from current branch. Override? [y/n]')
      if (input !== 'y') {
        plan.abort(plan.runtime.target + ' different from ' + branch + '.');
      } else {
        local.log('Overridden: ' + plan.runtime.target + ' different from ' + branch + '.')
      }
    }
  }

  local.log('Copy files to remote hosts');

  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
  remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
  remote.exec('forever start ~/'+appName+'/'+startFile);
});
