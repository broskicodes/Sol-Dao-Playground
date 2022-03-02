import  {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { 
 PROGRAM_VERSION_V2, 
 withDepositGoverningTokens,
} from "@solana/spl-governance";
import BN from "bn.js";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";
import { 
  getRealmPDA, 
} from "../helpers/pdas";

export const DepositGoverningTokens = async (
  programId: PublicKey, 
  user: PublicKey, 
  ixs: TransactionInstruction[],
  tokAcnt: PublicKey,
  amount: number,
) => {
  const realm = await getRealmPDA(programId);

  await withDepositGoverningTokens(
    ixs, programId, PROGRAM_VERSION_V2,
    realm, tokAcnt, COMMUNITY_TOKEN_MINT, 
    user, user, user,
    new BN(amount),
  );

}
