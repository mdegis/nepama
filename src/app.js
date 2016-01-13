var dummyToForceIncludeForBundle = false;
    if (dummyToForceIncludeForBundle) {
        require('node-persist');
        require('crypto-js');
        require('readline-sync');
    }

var storage = require('node-persist');
var crypto = require('crypto-js');
var readlineSync = require('readline-sync');

storage.initSync();
var argv = require('yargs')
    .demand(1)
    .command('create', 'Greets the user', function (yargs) {
        yargs.options({
            name:{
                demand: true,
                alias: 'n',
                description: 'Name of your account',
                type: 'string'
            },
            username:{
                demand: true,
                alias: 'u',
                description: 'Username of your account',
                type: 'string'
            },
            password:{
                demand: true,
                alias: 'p',
                description: 'Password of your account',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .command('get', 'Get the account', function (yargs) {
        yargs.options({
            name:{
                demand: true,
                alias: 'n',
                description: 'Name of your account',
                type: 'string'
            }
        }).help('help');
    })
    .help('help')
    .argv;

var command = argv._[0];

function getAccounts(masterPassword) {
    var encryptedAccounts = storage.getItemSync('accounts');
    accounts = [];
    if (typeof encryptedAccounts !== 'undefined') {
        var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }
    return accounts;

}

function saveAccounts(accounts, masterPassword) {
    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword)
    storage.setItemSync('accounts', encryptedAccounts.toString());
    return accounts;
}

function createAccount(account, masterPassword){
    var accounts = getAccounts(masterPassword);
    accounts.push(account);
    saveAccounts(accounts, masterPassword);
    return account;
}

function getAccount(accountName, masterPassword){
    var accounts = getAccounts(masterPassword);
    var matchedAccount = [];
    accounts.forEach(function (acc) {
        if (acc.name === accountName) {
            matchedAccount.push(acc);
        }
    });
    return matchedAccount;
}

// createAccount({
//     name: 'facebook',
//     username: 'test@gmail.com',
//     password: '123456'
// });

if (command === 'get') {
    try {
        password = readlineSync.question('PASSWORD: ', {hideEchoBack: true});
        var fetched = getAccount(argv.name, password);
        if (fetched.length < 1) {
            console.log("Account could not found.");
        } else{
            console.log("Account found:");
            console.log(fetched);
        }
    } catch (e) {
        console.log('Unable to get account');
    }

} else if (command === 'create') {
    try {
        password = readlineSync.question('PASSWORD: ', {hideEchoBack: true});
        var created = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
        }, password);
        console.log('Account created');
        console.log(created);
    } catch (e) {
        console.log('Unable to create account');
    }
} else if (command === 'reset') {
    storage.clearSync();
    console.log('Everything is wiped...');
}
