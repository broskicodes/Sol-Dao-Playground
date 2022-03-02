import  {
  PublicKey,
  AccountMeta,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token"
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getMintGovernancePDA, 
  getRealmPDA 
} from "../helpers/pdas";

export const MintMembershipToken = async (
  programId: PublicKey, 
  user: PublicKey,
  tokAcnt: PublicKey,
  ixs: TransactionInstruction[]
) => {
  const realm = await getRealmPDA(programId);
  const mintGov = await getMintGovernancePDA(
    programId,
    realm,
    COMMUNITY_TOKEN_MINT,
  );

  const keys = [
    <AccountMeta> {
      pubkey: realm,
      isSigner: false,
      isWritable: false,
    },
    <AccountMeta> {
      pubkey: mintGov,
      isSigner: false,
      isWritable: false,
    },
    <AccountMeta> {
      pubkey: COMMUNITY_TOKEN_MINT,
      isSigner: false,
      isWritable: true,
    },
    <AccountMeta> {
      pubkey: tokAcnt,
      isSigner: false,
      isWritable: true,
    },
    <AccountMeta> {
      pubkey: user,
      isSigner: true,
      isWritable: false,
    },
    <AccountMeta> {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ];

  const ix = new TransactionInstruction({
    keys,
    programId,
    data: Buffer.concat([Buffer.from(new Uint8Array([26]))]),
  });

  ixs.push(ix);
}
