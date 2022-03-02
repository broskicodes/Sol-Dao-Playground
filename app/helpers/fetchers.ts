import { Connection, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { getMintGovernancePDA, getRealmPDA, getTokenOwnerRecordPDA } from "../helpers/pdas";

export const getNextProposalIndex = async (
  programId: PublicKey,
  connection: Connection,
  mint: PublicKey,
) => {
  const tknOwnrRecAddress = await getMintGovernancePDA(
    programId,
    (await getRealmPDA(programId)),
    mint,
  );
  const tknOwnerRec = await connection.getAccountInfo(tknOwnrRecAddress);

  let start = 1 + 32 + 32;
  const idx = (new DataView(tknOwnerRec.data.buffer)).getUint32(start, true);

  console.log(idx);
  
  return idx;
}
