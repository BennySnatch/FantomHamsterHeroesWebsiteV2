import { BigNumber, ethers } from "ethers";
import { STAKING_ADDRESS } from "../contracts/HamContract";

export const stakeHams = async function (contract: any, ids: any) {
  let transaction = await contract.deposit(ids);
  let tx = await transaction.wait();

  return tx.transactionHash;
};
export const unstakeHams = async function (contract: any, ids: any) {
  let transaction = await contract.withdraw(ids);
  let tx = await transaction.wait();

  return tx.transactionHash;
};
export const approveAll = async function (contract: any) {
  let transaction = await contract.setApprovalForAll(STAKING_ADDRESS, true);
  let tx = await transaction.wait();
  return tx.transactionHash;
};

export const getStaked = async function (contract: any, addr: string) {
  let ids = await contract.depositsOf(addr);
  const ownedIds = ids.map((id: any) => BigNumber.from(id).toNumber());
  return ownedIds;
};
export const getTimer = async function (contract: any, id: any) {
  let time = await contract.timer(id);
  return BigNumber.from(time).toNumber();
};

export const checkApproved = async function (contract: any, addr: any) {
  let isApproved = await contract.isApprovedForAll(addr, STAKING_ADDRESS);
  return isApproved;
};
