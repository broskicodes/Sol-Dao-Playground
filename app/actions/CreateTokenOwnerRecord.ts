import  {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { 
  withCreateTokenOwnerRecord,
} from "@solana/spl-governance";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getRealmPDA, 
  getTokenOwnerRecordPDA 
} from "../helpers/pdas";

export const CreateTokenOwnerRecord = async (
  programId: PublicKey, 
  user: PublicKey, 
  ixs: TransactionInstruction[]
) => {  
  const realm = await getRealmPDA(programId);
  const tokenOwnerRecord = await getTokenOwnerRecordPDA(
    programId,
    realm,
    COMMUNITY_TOKEN_MINT,
    user,
  );

  await withCreateTokenOwnerRecord(
    ixs, programId, realm, user,
    COMMUNITY_TOKEN_MINT, user,
  );

  return tokenOwnerRecord;
}
