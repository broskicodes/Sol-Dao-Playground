import  {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import BN from "bn.js";
import { 
  AccountMetaData,
  InstructionData,
  PROGRAM_VERSION_V2,
  TOKEN_PROGRAM_ID,
  withExecuteTransaction
} from "@solana/spl-governance";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getMintGovernancePDA,
  getProposalAccountPDA,
  getProposalTransactionAccontPDA,
  getRealmPDA 
} from "../helpers/pdas";

export const ExecuteTransaction = async (
  programId: PublicKey, 
  // feePayer: Keypair, 
  ixs: TransactionInstruction[], 
  proposalIndex: number,
  optionIndex: number,
  transactionIndex: number,
) => {  
  const realm = await getRealmPDA(programId);
  const mintGov = await getMintGovernancePDA(
    programId,
    realm,
    COMMUNITY_TOKEN_MINT,
  );
  const propAcnt = await getProposalAccountPDA(
    programId,
    mintGov,
    COMMUNITY_TOKEN_MINT,
    proposalIndex,
  );
  const propTxAcnt = await getProposalTransactionAccontPDA(
    programId,
    propAcnt,
    optionIndex,
    transactionIndex,
  );

  const tokAcnt = new PublicKey(process.env.COMM_TOKEN_ACCOUNT);
  const ixData: InstructionData[] = [];

  const accounts: AccountMetaData[] = [
    new AccountMetaData({ 
      pubkey: COMMUNITY_TOKEN_MINT,
      isSigner: false,
      isWritable: true, 
    }),
    new AccountMetaData({
      pubkey: tokAcnt,
      isSigner: false,
      isWritable: true,
    }),
    new AccountMetaData({ 
      pubkey: mintGov,
      isSigner: true,
      isWritable: false, 
    }),
  ];

  const mintToIx = new InstructionData({
    programId: TOKEN_PROGRAM_ID,
    accounts: accounts,
    data: Buffer.concat([
      Buffer.from(new Uint8Array([7])), 
      Buffer.from(new BN(10).toArray("le", 8)),
    ]),
  });

  ixData.push(mintToIx);

  await withExecuteTransaction(
    ixs, programId, PROGRAM_VERSION_V2, mintGov,
    propAcnt, propTxAcnt, ixData
  );
}
