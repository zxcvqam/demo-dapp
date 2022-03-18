import { ethers, utils } from 'ethers';

// Contract Address
const contractAddress = '0xfbdadb4c61e09629f8901d8b98d2957d5b9898c4'

export async function getTotalCollections() {
  try {
    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const abi = new utils.Interface([
        'function balanceOf(address owner) view returns (uint256)',
      ]);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const res = contract.balanceOf(accounts[0]);
      return parseInt(await res);
    } else {
      throw new Error('No injected web3 found');
    }
  } catch (e) {
    throw Error(e.message);
  }
}