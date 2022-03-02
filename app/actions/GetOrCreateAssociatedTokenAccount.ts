import { 
  Account,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress, 
  TokenAccountNotFoundError, 
  TokenInvalidAccountOwnerError, 
  TOKEN_PROGRAM_ID 
} from "@solana/spl-token"
import { 
  Connection,
  PublicKey, 
  TransactionInstruction 
} from "@solana/web3.js";
import { COMMUNITY_TOKEN_MINT } from "../helpers/constants";


export const GetOrCreateAssociatedTokenAccount = async (
  programId: PublicKey, 
  connection: Connection,
  user: PublicKey, 
  ixs: TransactionInstruction[], 
) => {
  const associatedAddress = await getAssociatedTokenAddress(
    COMMUNITY_TOKEN_MINT,
    user,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  let account: Account;

  try {
    account = await getAccount(
      connection, associatedAddress, 
      "processed", TOKEN_PROGRAM_ID
    );
  } catch (error: unknown) {
      // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
      // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
      // TokenInvalidAccountOwnerError in this code path.
      if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
          // As this isn't atomic, it's possible others can create associated accounts meanwhile.
        try {
          ixs.push(createAssociatedTokenAccountInstruction(
              user,
              associatedAddress,
              user,
              COMMUNITY_TOKEN_MINT,
              TOKEN_PROGRAM_ID,
              ASSOCIATED_TOKEN_PROGRAM_ID
          ));              
        } catch (error: unknown) {
            // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
            // instruction error if the associated account exists already.
        }
      } else {
        throw error;
      }
  }

  return associatedAddress;
}