/**
 * Created by Administrator on 2016/12/8.
 */
'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

module.exports = () => {
    co(function*() {
        let projectName = yield prompt('Project name: ');

        let npmType = yield prompt('input 1 or 2 to change type,1 is npm,2 is cnpm: ');
        //npm install -g yo generator-mayako

        let cmdStr = (Number(npmType) == 1) ? `npm install -g yo generator-mayako` : `cnpm install -g yo generator-mayako`;

        let cmdCd = ` mkdir ${projectName}`

        let cmdCd2 = ` cd ${projectName}`

        let cmdCd3 = ` yo mayako`

        console.log(chalk.white('\n Start generating...'))

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }

            exec(cmdCd, function(error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                } else {
                    console.log(chalk.green('\n √ Generation completed!'))
                    console.log(`\n cd ${projectName} && yo mayako \n`)
                    process.exit()
                }

            });


        })


    })
}