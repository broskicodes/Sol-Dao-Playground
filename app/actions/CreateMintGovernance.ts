import  {
  PublicKey,
  Keypair,
  Connection,
  AccountMeta,
  SystemProgram,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import  {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import BN from "bn.js";
import { serialize } from "borsh";
import { 
  CreateMintGovernanceArgs,
  GovernanceConfig,
  VoteThresholdPercentage,
  VoteTipping,
} from "@solana/spl-governance";
import { COMMUNITY_TOKEN_MINT, REALM_NAME } from "../helpers/constants";

export const CreateMintGovernance = async (
  programId: PublicKey, 
  feePayer: Keypair, 
  ixs: TransactionInstruction[]
) => {
  // const communityMint = new PublicKey(COMMUNITY_TOKEN_MINT);
  // const [realm] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from("governance"),
  //     Buffer.from(REALM_NAME),
  //   ],
  //   programId,
  // );
  // const [mintGov] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from("mint-governance"),
  //     realm.toBuffer(),
  //     communityMint.toBuffer(),
  //   ],
  //   programId,
  // );
  // const [tokenOwnerRecord] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from("governance"),
  //     realm.toBuffer(),
  //     communityMint.toBuffer(),
  //     feePayer.publicKey.toBuffer(),
  //   ],
  //   programId,
  // );
  // const [realmConfig] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from("realm-config"),
  //     realm.toBuffer(),
  //   ],
  //   programId,
  // );

  // const keys = [
  //   <AccountMeta> {
  //     pubkey: realm,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: mintGov,
  //     isSigner: false,
  //     isWritable: true,
  //   },
  //   <AccountMeta> {
  //     pubkey: communityMint,
  //     isSigner: false,
  //     isWritable: true,
  //   },
  //   <AccountMeta> {
  //     pubkey: feePayer.publicKey,
  //     isSigner: true,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: tokenOwnerRecord,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: feePayer.publicKey,
  //     isSigner: true,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: TOKEN_PROGRAM_ID,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: SystemProgram.programId,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   // <AccountMeta> {
  //   //   pubkey: SYSVAR_RENT_PUBKEY,
  //   //   isSigner: false,
  //   //   isWritable: false,
  //   // },
  //   <AccountMeta> {
  //     pubkey: feePayer.publicKey,
  //     isSigner: true,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: realmConfig,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  // ];

  // const schema = new Map<Function, any>([
  //   [
  //     CreateMintGovernanceArgs,
  //     {
  //       kind: 'struct',
  //       fields: [
  //         ['instruction', 'u8'],
  //         ['config', GovernanceConfig],
  //         ['transferMintAuthorities', 'u8', boolMapper],
  //       ],
  //     }
  //   ],
  //   [
  //     GovernanceConfig,
  //     {
  //       kind: 'struct',
  //       fields: [
  //         ['voteThresholdPercentage', VoteThresholdPercentage],
  //         ['minCommunityTokensToCreateProposal', 'u64'],
  //         ['minInstructionHoldUpTime', 'u32'],
  //         ['maxVotingTime', 'u32'],
  //         ['voteTipping', 'u8'],
  //         ['proposalCoolOffTime', 'u32'],
  //         ['minCouncilTokensToCreateProposal', 'u64'],
  //       ],
  //     }
  //   ],
  //   [
  //     VoteThresholdPercentage,
  //     {
  //       kind: 'struct',
  //       fields: [
  //         ['type', 'u8'],
  //         ['value', 'u8'],
  //       ],
  //     }
  //   ],
  // ]);

  // const data = new CreateMintGovernanceArgs({ 
  //   transferMintAuthorities: true, 
  //   config: new GovernanceConfig({
  //     voteThresholdPercentage: new VoteThresholdPercentage({ value: 50 }),
  //     minCommunityTokensToCreateProposal: new BN(1),
  //     minInstructionHoldUpTime: 5,
  //     maxVotingTime: 10 * 60,
  //     voteTipping: VoteTipping.Disabled,
  //     minCouncilTokensToCreateProposal: new BN(1), 
  //   }),
  // });


  // const ix = new TransactionInstruction({
  //   keys,
  //   programId,
  //   data: Buffer.from(serialize(schema, data)),
  // });

  // ixs.push(ix);

  // return mintGov;
}
