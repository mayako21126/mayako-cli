/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2019-08-07 13:47:04
 * @LastEditors: mayako
 * @LastEditTime: 2019-12-10 15:08:47
 */
/**
 * Created by Administrator on 2016/12/8.
 */
'use strict'
const exec = require('child_process').exec
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const execSync = require('child_process').execSync
const fs = require('fs')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

module.exports = () => {
  co(function* () {
    let projectName = yield prompt('Project name: ');

    let npmType = yield prompt('input 1 or 2 to change type,1 is npm,2 is cnpm: ');

    let installN = yield prompt('input 1 or 2 to need install,1 is yes,2 is no: ');

    let cmdStr = (Number(npmType) == 1) ? `npm install -g yo generator-mayako -d ` : `cnpm install -g yo generator-mayako --by=npm -d `;

    let childProcess = ''
    console.log(chalk.white('\n Start generating...'))
    if (installN == 1) {
      childProcess = exec(cmdStr, {
        env: process.env,
        maxBuffer: 20 * 1024 * 1024
      }, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
          process.exit()
        }
        spawnSync('mkdir', [projectName]);
        spawnSync('cd', [projectName]);
        spawnSync('yo', ['mayako'], {
          cwd: projectName,
          stdio: 'inherit',
          shell: process.platform === 'win32'
        });
        process.exit()
      })
    } else {
      spawnSync('mkdir', [projectName]);
      spawnSync('cd', [projectName]);
      spawnSync('yo', ['mayako'], {
        cwd: projectName,
        stdio: 'inherit',
        shell: process.platform === 'win32'
      });
      process.exit()
    }
    var stdoutStream = fs.createWriteStream('out.txt');
    childProcess.stdout.pipe(stdoutStream, {
      end: false
    });
    childProcess.stderr.pipe(stdoutStream, {
      end: false
    });
    // 使用node的后压机制
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    var stdoutEnded = false,
      stderrEnded = false;

    function tryClosing() {
      if (stdoutEnded && stderrEnded) {
        stdoutStream.end();
      }
    }
    childProcess.stdout.on('end', function () {
      stdoutEnded = true;
      tryClosing();
    });
    childProcess.stderr.on('end', function () {
      stderrEnded = true;
      tryClosing();
    });

  })
}