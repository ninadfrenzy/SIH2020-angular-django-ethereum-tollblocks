'''

Steps:  
    1. Smart contract is available at https://gist.github.com/rohitnawale/c41fb588932fccf71906f65cb207fe14
    2. Copy the smart contract
    3. Open  https://remix.ethereum.org/
    4. Create new file and paste the copied smart contract
    5. Compile the smart contract and deploy
    6. Copy the ABI (found under Compile Button) and the address where smart contract is deployed

'''
from web3 import Web3
import json
import traceback
import hashlib

ganache_url = "http://127.0.0.1:7545"
#connect to local private blockchain on ganache 
web3 = Web3(Web3.HTTPProvider(ganache_url))
#print(web3.isConnected())

# Wallet address of an account on Ganache.
# This address might not be same. So check and update the wallet address  
wallet_address = "0x248171Ea81F75F27f220019c9C78aF3e0Cd3b629"

# Same for contract address. When you deploy the contract on https://remix.ethereum.org/
# An address is generated. So update this as well
contract_address = "0x686DD1e24e71C81049C8550049242cb794bF3d6C"

if web3.isConnected():
        # load the json data which can be obtained after deploying smart contracts
        abi = json.loads("""
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

        # load the address where smart contracts are deployed
        address = web3.toChecksumAddress(contract_address)


        # establish the connection with blockchain using address and ABI
        contract = web3.eth.contract(address=address, abi = abi)

        print(contract)

else:
	print("Error in establishing connection to ganache.")
	traceback.print_exc()


# Add new road to blockchain
def add_road(road_id, amount):
    try:
            tx_hash = contract.functions.addRoad(road_id, amount).transact({'from':web3.toChecksumAddress(wallet_address), 'gas': 3400000})
         
    except:
        print("Error while creating transaction")
        traceback.print_exc()
        return False
    # wait for the block to be  mined on blockchain
    print("wait for the block to be mined on blockchain")
    web3.eth.waitForTransactionReceipt(tx_hash)
    print("Blocked mined!!!\nRoad has been added.")


# Get the data of given road_id
def get_road(road_id):
    get_data = contract.functions.getRoad(road_id).call()
    print(get_data)
    return get_data


# update new road to blockchain
def update_contract(road_id, amount):
    try:
            tx_hash = contract.functions.updateAmount(road_id, amount).transact({'from':web3.toChecksumAddress(wallet_address), 'gas': 3400000})
         
    except:
        print("Error while creating transaction")
        traceback.print_exc()
        return False
    # wait for the block to be  mined on blockchain
    print("wait for the block to be mined on blockchain")
    web3.eth.waitForTransactionReceipt(tx_hash)
    print("Blocked mined!!!\nRoad contract has been updated.")


#add_road("RD-11", "2323222")
#update_contract("RD-11", "43546")
#get_road("RD-11")
