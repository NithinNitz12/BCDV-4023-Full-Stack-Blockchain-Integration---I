import { ethers } from "ethers";
import contractABI from "./abi";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "0x206E07d25b6948b376D3F4F16911cB88a5ff1E29";
export const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);
export const contractWithSigner = contract.connect(provider.getSigner());
