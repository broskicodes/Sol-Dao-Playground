import  {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { 
  PROGRAM_VERSION_V2,
  Vote,
  VoteChoice,
  VoteKind,
  withCastVote
} from "@solana/spl-governance";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getMintGovernancePDA, 
  getProposalAccountPDA, 
  getRealmPDA, 
  getTokenOwnerRecordPDA
} from "../helpers/pdas";

export const CastVote = async (
  programId: PublicKey, 
  user: PublicKey, 
  ixs: TransactionInstruction[], 
  proposalIndex: number
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

  await withCastVote(
    ixs, programId, PROGRAM_VERSION_V2, realm, mintGov,
    propAcnt, tokenOwnerRecord, tokenOwnerRecord,
    user, COMMUNITY_TOKEN_MINT,
    new Vote({
      voteType: VoteKind.Approve,
      approveChoices: [
        new VoteChoice({
          rank: 0,
          weightPercentage: 100,
        }),
      ],
      deny: undefined
    }), user, 
  );
}

