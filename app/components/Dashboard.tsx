import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { 
  sendAndConfirmTransaction, 
  Transaction, 
  TransactionInstruction 
} from "@solana/web3.js";
import { ChangeEvent, FC, useState } from "react";
import { COMMUNITY_TOKEN_MINT, REALM_PROGRAM_ID } from "../helpers/constants";
import { 
  MintMembershipToken,
  GetOrCreateAssociatedTokenAccount,
  CreateTokenOwnerRecord,
  DepositGoverningTokens,
  WithdrawGoverningTokens,
  CreateProposal,
  InsertTransaction,
  SignOffProposal,
 } from '../actions';
import { getNextProposalIndex } from "../helpers/fetchers";

export const Dashboard: FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [depositAmount, setDepositAmount] = useState(0);
  const [compensationAmount, setCompensationAmount] = useState(0);
  const [proposalData, setProposalData] = useState("");

  const createAndSendTx = async (ixs: TransactionInstruction[]) => {
    const tx = new Transaction({
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      feePayer: publicKey,
    });
    ixs.forEach(ix => {
      tx.add(ix);
    });

    const sig = await sendTransaction(tx, connection);

    console.log(sig);

    return sig;
  }
  const becomeMember = async () => {
    const ixs: TransactionInstruction[] = [];

    const tokAcnt = await GetOrCreateAssociatedTokenAccount(
      REALM_PROGRAM_ID,
      connection,
      publicKey,
      ixs,
    );

    await MintMembershipToken(
      REALM_PROGRAM_ID, 
      publicKey,
      tokAcnt,
      ixs,
    );

    await CreateTokenOwnerRecord(
      REALM_PROGRAM_ID,
      publicKey,
      ixs,
    );

    await createAndSendTx(ixs);
  }

  const depositTokens = async () => {
    const ixs: TransactionInstruction[] = [];
    
    const tokAcnt = await GetOrCreateAssociatedTokenAccount(
      REALM_PROGRAM_ID,
      connection,
      publicKey,
      ixs,
    );

    await DepositGoverningTokens(
      REALM_PROGRAM_ID,
      publicKey,
      ixs,
      tokAcnt,
      depositAmount,
    );

    await createAndSendTx(ixs);
  }

  const withdrawTokens = async () => {
    const ixs: TransactionInstruction[] = [];
    
    const tokAcnt = await GetOrCreateAssociatedTokenAccount(
      REALM_PROGRAM_ID,
      connection,
      publicKey,
      ixs,
    );

    await WithdrawGoverningTokens(
      REALM_PROGRAM_ID,
      publicKey,
      ixs,
      tokAcnt,
    );

    await createAndSendTx(ixs);
  }

  const requestCompensation = async () => {
    const ixs: TransactionInstruction[] = [];
    
    const tokAcnt = await GetOrCreateAssociatedTokenAccount(
      REALM_PROGRAM_ID,
      connection,
      publicKey,
      ixs,
    );

    const index = await getNextProposalIndex(
      REALM_PROGRAM_ID,
      connection,
      COMMUNITY_TOKEN_MINT,
    );

    await CreateProposal(
      REALM_PROGRAM_ID,
      publicKey,
      ixs,
      index,
      "Token Mint Request#".concat(index.toString(), "  Recipient: ", publicKey.toString(), "  Amount: ", compensationAmount.toString()),
      proposalData,
    );

    await InsertTransaction(
      REALM_PROGRAM_ID, 
      publicKey,
      tokAcnt,
      ixs,
      index,
      0, 0
    );

    await SignOffProposal(
      REALM_PROGRAM_ID,
      publicKey,
      ixs,
      index,
    );

    await createAndSendTx(ixs);
  }

  return (
    <>
      {!!publicKey && 
        <div>
          <div>
            <input 
              type="text" 
              placeholder="Amount" 
              value={depositAmount.toString()} 
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                let val = Number(event.target.value);
                if(!isNaN(val)){
                  setDepositAmount(val);
                }
              }}
            />
            <button onClick={becomeMember}>join</button>
            <button onClick={depositTokens}>deposit</button>
            <button onClick={withdrawTokens}>withdraw</button>
          </div>
          <div>
          <input 
              type="text" 
              placeholder="Amount" 
              value={compensationAmount.toString()} 
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                let val = Number(event.target.value);
                if(!isNaN(val)){
                  setCompensationAmount(val);
                }
              }}
            />
            <input 
              type="text" 
              placeholder="Data" 
              value={proposalData} 
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                let val = event.target.value;
                setProposalData(val);
              }}
            />
            <button onClick={requestCompensation}>brrr</button>
          </div>
        </div>
      }
    </>
  );
}