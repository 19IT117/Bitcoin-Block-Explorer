
document.getElementById("Blockchain-form").addEventListener('submit',printData);
document.getElementById("Blockchain-form").addEventListener('keyup',clearDisplay);

function printData(e){
  const blocknunber = document.getElementById("Blocknumber").value;
  if(blocknunber === ''){
    //console.log(blocknunber);
    console.log("Can't fetch data enter number");
  }else{
  fetch(`https://blockchain.info/block-height/${blocknunber}?format=json`)
  .then(response => response.json())
  .then(data => displayData(data))
  .catch(err => console.log("Can't fetch data enter valid number"));
  }
  
  e.preventDefault();
}

function displayData(data){
  //console.log("Hello");
  //console.log(data);
  
  const date = getMiningDateandTime(data.blocks[0].time);
  const blockhash = data.blocks[0].hash;
  const noOfTx = data.blocks[0].n_tx;
  const merkleRoot = data.blocks[0].mrkl_root;
  const nonce = data.blocks[0].nonce;
  const prevhash = data.blocks[0].prev_block;
  const blockreward = data.blocks[0].tx[0].out[0].value/100000000;
  const minerAddress = data.blocks[0].tx[0].out[0].addr;
  let html = `
  <Ul>
    <li> blocknumber = ${data.blocks[0].block_index}</li>
    <li>date minded = ${date}</li>
    <li>blockhash = ${blockhash}</li>
    <li>Number of Transaction= ${noOfTx}</li>
    <li>merkle root = ${merkleRoot}</li>
    <li>nonce = ${nonce}</li>
    <li>previous hash = ${prevhash}</li>
    <li>blockreward = ${blockreward} BTC</li>
    <li>miner address = ${minerAddress}</li>
  <Ul>
  `;
  document.getElementById("Blocknumber").value = '';
  document.querySelector("#blockdetails").innerHTML = html;
};

function getMiningDateandTime(timestamp){
  const unixTimestamp = timestamp;
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString() ;
  return humanDateFormat;
}

function clearDisplay(e){
  document.querySelector("#blockdetails").innerHTML = '';
  e.preventDefault();
}

function showAlert(message , className){
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#Blockchain-form');
  container.insertBefore(div,form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },1000);
}