import  {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { 
 withWithdrawGoverningTokens,
} from "@solana/spl-governance";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getRealmPDA, 
} from "../helpers/pdas";

export const WithdrawGoverningTokens = async (
  programId: PublicKey, 
  user: PublicKey, 
  ixs: TransactionInstruction[],
  tokAcnt: PublicKey,
) => {
  const realm = await getRealmPDA(programId);

  await withWithdrawGoverningTokens(
    ixs, programId, realm, 
    tokAcnt, COMMUNITY_TOKEN_MINT, 
    user,
  );

}
