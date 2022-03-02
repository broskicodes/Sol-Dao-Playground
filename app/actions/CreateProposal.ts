import  {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { 
  PROGRAM_VERSION_V2,
  VoteType,
  withCreateProposal
} from "@solana/spl-governance";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getMintGovernancePDA,
  getProposalAccountPDA, 
  getRealmPDA, 
  getTokenOwnerRecordPDA 
} from "../helpers/pdas";

export const CreateProposal = async (
  programId: PublicKey,
  user: PublicKey, 
  ixs: TransactionInstruction[], 
  proposalIndex: number,
  title: string,
  propsalData: string,
) => {
  const realm = await getRealmPDA(programId);
  const mintGov = await getMintGovernancePDA(
    programId,
    realm,
    COMMUNITY_TOKEN_MINT,
  );
  const tokenOwnerRecord = await getTokenOwnerRecordPDA(
    programId,
    realm,
    COMMUNITY_TOKEN_MINT,
    user,
  );
  const propAcnt = await getProposalAccountPDA(
    programId,
    mintGov,
    COMMUNITY_TOKEN_MINT,
    proposalIndex,
  );

  await withCreateProposal(
    ixs, programId, PROGRAM_VERSION_V2, realm, mintGov, 
    tokenOwnerRecord, title, propsalData,
    COMMUNITY_TOKEN_MINT, user,
    proposalIndex, VoteType.SINGLE_CHOICE, ["Approve"],
    true, user,
  );

  return propAcnt;
}
