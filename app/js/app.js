const appName = "arcus";
const fs = require("fs");
const uname = require("username");
const con = require('electron').remote.getGlobal('console');
const {dialog} = require('electron').remote;
let username;
// get username
(async () => {
  username = await uname();
  if (process.platform === "linux") {
    const dir = `/home/${username}/.local/share`;
    con.log(fs.readdirSync(dir));
    if (!fs.existsSync(`${dir}/${appName}`)) {
      con.log('First time setup');
      fs.mkdirSync(`${dir}/${appName}`);
      let selectedFolder = dialog.showOpenDialogSync({ properties: ['openDirectory']})[0];
      let someObject = {
        skyrim: selectedFolder
      }  
      fs.writeFile(`${dir}/${appName}/config.json`, JSON.stringify(someObject), (err) => {
        if (err) throw err
        con.log('The file has been saved!')
        const conf = fs.readFileSync(`${dir}/${appName}/config.json`, 'utf8');
        con.log(JSON.parse(conf));

      })
    }
  }
})();