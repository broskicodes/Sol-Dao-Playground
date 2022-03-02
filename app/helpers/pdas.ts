import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { REALM_NAME } from "./constants";

export const getRealmPDA = async (programId: PublicKey) => {
  const [realm] = await PublicKey.findProgramAddress(
    [
      Buffer.from("governance"),
      Buffer.from(REALM_NAME),
    ],
    programId,
  );

  return realm;
}

export const getMintGovernancePDA = async (
  programId: PublicKey,
  realm: PublicKey,
  mint: PublicKey,
) => {
  const [mintGov] = await PublicKey.findProgramAddress(
    [
      Buffer.from("mint-governance"),
      realm.toBuffer(),
      mint.toBuffer(),
    ],
    programId,
  );

  return mintGov;
}

export const getTokenOwnerRecordPDA = async (
  programId: PublicKey,
  realm: PublicKey,
  mint: PublicKey,
  user: PublicKey,
) => {
  const [tokenOwnerRecord] = await PublicKey.findProgramAddress(
    [
      Buffer.from("governance"),
      realm.toBuffer(),
      mint.toBuffer(),
      user.toBuffer(),
    ],
    programId,
  );

  return tokenOwnerRecord;
}

export const getTokenHoldingAccountPDA = async (
  programId: PublicKey,
  realm: PublicKey,
  mint: PublicKey,
) => {
  const [tokHoldAcnt] = await PublicKey.findProgramAddress(
    [
      Buffer.from("governance"),
      realm.toBuffer(),
      mint.toBuffer(),
    ],
    programId,
  );

  return tokHoldAcnt;
}

export const getProposalAccountPDA = async (
  programId: PublicKey,
  governance: PublicKey,
  mint: PublicKey,
  index: number,
) => {
  const [propAcnt] = await PublicKey.findProgramAddress(
    [
      Buffer.from("governance"),
      governance.toBuffer(),
      mint.toBuffer(),
      Buffer.from(new Uint8Array(new BN(index).toArray("le", 4))),
    ],
    programId,
  );

  return propAcnt;
}

export const getProposalTransactionAccontPDA = async (
  programId: PublicKey,
  propAcnt: PublicKey,
  optionIndex: number,
  transactionIndex: number,
) => {
  const [propTxAcnt] = await PublicKey.findProgramAddress(
    [
      Buffer.from("governance"),
      propAcnt.toBuffer(),
      Buffer.from(new Uint8Array(new BN(optionIndex).toArray("le", 1))),
      Buffer.from(new Uint8Array(new BN(transactionIndex).toArray("le", 2))),
    ],
    programId,
  );

  return propTxAcnt;
}