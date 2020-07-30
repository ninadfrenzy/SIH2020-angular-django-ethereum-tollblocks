import time
import traceback
from web3 import Web3, HTTPProvider

# Address where contract is deployed 
contract_address     = "0x0c1B0f00099F2fc6891DB746B89254992B0809B1"

# reading the private key of wallet to sign transactions
# fh = open("C:\\Keys\\private_key.txt")
# wallet_private_key   = str(fh.read())
#print(wallet_private_key)

# Ethereum wallet used to perform transactions
# Feel free to send ethers :)
wallet_address       = "0x2195077B499e970269879D2571183D4f1dd3c5D0"

# Connect to Infura which connects to Ropsten network
w3 = Web3(HTTPProvider("https://ropsten.infura.io/v3/608338c1f198402a894d5dcfee8cfd58"))

# Get the current nonce
nonce = w3.eth.getTransactionCount(wallet_address)

# Connect to smart contract
contract = w3.eth.contract(address = contract_address, abi = """
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_road_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contract_amount",
				"type": "string"
			}
		],
		"name": "addRoad",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_road_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contract_amount",
				"type": "string"
			}
		],
		"name": "updateAmount",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_road_id",
				"type": "string"
			}
		],
		"name": "getRoad",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "list_of_roads",
		"outputs": [
			{
				"internalType": "string",
				"name": "road_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contract_amount",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "is_collecting",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
""")

# Add new road to blockchain
def add_road(road_id, amount):
	# create a transaction
    tx = contract.functions.addRoad(road_id, amount).buildTransaction({
			'from':wallet_address,
            'gas': 2000000,
            'gasPrice': w3.toWei('81', 'gwei'),
            'nonce':nonce,
            'chainId': 3})

	# sign the transaction using private key
    signed_tx = w3.eth.account.signTransaction(tx,  private_key="c2245c2dc94056a5feb01fc3f21378d7ea6a03ffb618814fc8aeeebb03668d2e")

	# send the raw transaction to ropsten network
    try:
        txn_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    except:
        traceback.print_exc()
        print("Error while sending transaction.")
        return False
        
    #tx_receipt = w3.eth.getTransactionReceipt(txn_hash)
    # print(tx_receipt)
    print("Transaction sent")

    # # wait for the block to be  mined on blockchain
    txn_receipt = None
    while txn_receipt is None:
        try:
            txn_receipt = w3.eth.getTransactionReceipt(txn_hash)
        except:
            txn_receipt = None
        time.sleep(5)
        print("Mining....")



    print("Blocked mined!!!\nRoad has been added to blockchain: ", road_id)
    
    
# Get the data of given road_id
def get_road(road_id):
    get_data = contract.functions.getRoad(road_id).call()
    print(get_data)
    return get_data
    
def update_contract(road_id, amount):
	# create a transaction
    tx = contract.functions.updateAmount(road_id, amount).buildTransaction({
			'from':wallet_address,
            'gas': 2000000,
            'gasPrice': w3.toWei('81', 'gwei'),
            'nonce':nonce,
            'chainId': 3})

	# sign the transaction using private key
    signed_tx = w3.eth.account.signTransaction(tx,  private_key="c2245c2dc94056a5feb01fc3f21378d7ea6a03ffb618814fc8aeeebb03668d2e")
    try:
        txn_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    except:
        traceback.print_exc()
    #tx_receipt = w3.eth.getTransactionReceipt(txn_hash)
    # print(tx_receipt)
    print("Transaction sent")
    # # wait for the block to be  mined on blockchain
    txn_receipt = None
    while txn_receipt is None:
        try:
            txn_receipt = w3.eth.getTransactionReceipt(txn_hash)
        except:
            txn_receipt = None
        time.sleep(5)
        print("Mining....")



    print("Blocked mined!!!\n Contract has been updated for road: ", road_id)
    
    
    
    
    

# print(contract.functions)
# # add_road("NH-11", "200000")
# # update_contract("NH-10", "55.5")
# get_road("NH-11")