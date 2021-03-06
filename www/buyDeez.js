const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
const contractAddress = '0x075c60ee2cd308ff47873b38bd9a0fa5853382c4'
window.addEventListener('load', function() {
    buildInitializeButton();
})
function buildInitializeButton () {
    var initButton = document.createElement("button")
    initButton.id = "initButton"
    var initButtonText = document.createTextNode("Check Browser for Web3 Ethereum Mainnet Access");
    initButton.appendChild(initButtonText);
    initButton.addEventListener('click', function(){
        if (typeof window.web3 !== 'undefined') {
            console.log('Web3 Detected')
            startApp(window.web3);
        } 
        else {
            console.log('Web3 Not Detected')
            showDownload();
        }
        var buyForm = document.getElementById('buyForm')
        buyForm.removeChild(initButton)
    })
    var buyForm = document.getElementById('buyForm')
    buyForm.appendChild(initButton)
}
function startApp(web3) {
    web3.version.getNetwork((err, netId) => {
        if (err) {
            console.log('Ethereum Network Error')
        }
        else if (netId == '1') {
            console.log('Connected to Ethereum Mainnet')
            const eth = new Eth(web3.currentProvider)
            const token = eth.contract(abi).at(contractAddress);
            var account = web3.eth.accounts[0];
            if (account) {
                showForm(token,web3)
            }
            else {
                console.log('Not Logged Into MetaMask')
            }
        }
        else {
            console.log('Not Connected to Ethereum Mainnet')
        }
    })
}
function showForm (deez, web3) {
    var account = web3.eth.accounts[0];
    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== account) {
            account = web3.eth.accounts[0];
            updateUserWallet(account);
        }
    }, 100);
    
    var userWallet = document.createElement("span")
    userWallet.id = "userWallet"
    userWallet.innerHTML = account
    var walletData = document.createElement("div")
    walletData.innerHTML = "Your Wallet: "
    walletData.appendChild(userWallet)

    var inputETH = document.createElement("input")
    inputETH.type = "number"
    inputETH.id = "ethToSpend"
    inputETH.min = "0"
    inputETH.max = "10"
    inputETH.step = "0.000001"
    inputETH.value = "0.010000"
    inputETH.addEventListener('change', function(){
        var newETH = document.getElementById("ethToSpend")
        var newDEEZ = document.getElementById("deezToBuy")
        newDEEZ.value = (newETH.value * 1000000).toFixed(0)
    })
    var inputETHField = document.createElement("div")
    inputETHField.innerHTML = "Spend this much ETH: "
    inputETHField.appendChild(inputETH)

    var inputDEEZ = document.createElement("input")
    inputDEEZ.type = "number"
    inputDEEZ.id = "deezToBuy"
    inputDEEZ.min = "0"
    inputDEEZ.max = "10000000"
    inputDEEZ.step = "1"
    inputDEEZ.value = "10000"
    inputDEEZ.addEventListener('change', function(){
        var newETH = document.getElementById("ethToSpend")
        var newDEEZ = document.getElementById("deezToBuy")
        newETH.value = (newDEEZ.value / 1000000).toFixed(6)
    })
    var inputDEEZField = document.createElement("div")
    inputDEEZField.innerHTML = "Buy this many DEEZ: "
    inputDEEZField.appendChild(inputDEEZ)

    var buyButton = document.createElement("BUTTON");
    var buyButtonText = document.createTextNode("Buy DEEZ!");
    buyButton.appendChild(buyButtonText);
    buyButton.addEventListener('click', function() {
        var etherValue = document.getElementById('ethToSpend')
        var ethInWei = web3.toWei(etherValue.value, 'ether')
        deez.transfer(contractAddress, ethInWei, { from: account })
            .then(function (txHash) {
            console.log('Transaction sent')
            console.dir(txHash)
            waitForTxToBeMined(txHash)
        })
            .catch(console.error)
    })

    var buyForm = document.getElementById('buyForm')
    buyForm.appendChild(walletData)
    buyForm.appendChild(inputETHField)
    buyForm.appendChild(inputDEEZField)
    buyForm.appendChild(buyButton)
}

function updateUserWallet (account) {
    var userWallet = document.getElementById('userWallet')
    userWallet.innerHTML = account
}

function showDownload(){
    var metamaskImg = document.createElement("img")
    metamaskImg.src = "https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask.png"
    metamaskImg.width = "50%"
    var downloadMetamask = document.createElement("a")
    downloadMetamask.href = "https://metamask.io/"
    downloadMetamask.target = "blank"
    downloadMetamask.appendChild(metamaskImg)
    var p = document.createElement("p")
    p.innerHTML = "It looks like your browser is missing a way to interact with the Ethereum Blockchain. The most simple and secure way to make this happen is with MetaMask. Learn more about MetaMask by clicking the image below, or at metamask.io"
    p.appendChild(downloadMetamask)
    var buyForm = document.getElementById('buyForm')
    buyForm.appendChild(p)
}
async function waitForTxToBeMined (txHash) {
    let txReceipt
    while (!txReceipt) {
        try {
            txReceipt = await web3.eth.getTransactionReceipt(txHash)
        } catch (err) {
            return indicateResults(txHash, err)
        }
    }
    indicateResults(txHash)
}
function indicateResults(txHash, err){
    var txStatus = document.getElementById("transactionStatus")
    var linkToTX = document.createElement("a")
    linkToTX.href = "https://etherscan.io/tx/" + txHash
    linkToTX.target = "blank"
    var success = document.createTextNode("DeezNuts are on their way! Check the Status of your Transaction on the blockchain here: ")
    var txText = document.createTextNode(txHash)
    var br = document.createElement("br")
    if (err) {
        console.log(err)
    }
    linkToTX.appendChild(txText)
    txStatus.appendChild(success)
    txStatus.appendChild(br)
    txStatus.appendChild(linkToTX)
    txStatus.appendChild(br)
}