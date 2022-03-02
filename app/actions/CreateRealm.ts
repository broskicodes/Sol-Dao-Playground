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
  createMint,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import BN from "bn.js";
import { serialize } from "borsh";
import { 
  withCreateRealm,
} from "@solana/spl-governance";
import { REALM_NAME, REALM_PROGRAM_ID } from "../helpers/constants";

export const CreateRealm = async (
  programId: PublicKey, 
  authority: Keypair, 
  connection: Connection, 
  ixs: TransactionInstruction[]
) => {
  // const communityMint = await createMint(connection, authority, authority.publicKey, null, 0);
  
  // const [realm] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from("governance"),
  //     Buffer.from(REALM_NAME),
  //   ],
  //   programId,
  // );
  // const [commTokAcnt] = await PublicKey.findProgramAddress(
  //   [
  //     Buffer.from("governance"),
  //     realm.toBuffer(),
  //     communityMint.toBuffer(),
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

  // await withCreateRealm(
  //   ixs, REALM_PROGRAM_ID
  // );
  // console.log('realm:', realm.toString(), 'realm config:', realmConfig.toString(),'comm mint:', communityMint.toString());

  // const keys = [
  //   <AccountMeta> {
  //     pubkey: realm,
  //     isSigner: false,
  //     isWritable: true,
  //   },
  //   <AccountMeta> {
  //     pubkey: authority.publicKey,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: communityMint,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: commTokAcnt,
  //     isSigner: false,
  //     isWritable: true,
  //   },
  //   <AccountMeta> {
  //     pubkey: authority.publicKey,
  //     isSigner: true,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: SystemProgram.programId,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: TOKEN_PROGRAM_ID,
  //     isSigner: false,
  //     isWritable: false,
  //   },
  //   <AccountMeta> {
  //     pubkey: SYSVAR_RENT_PUBKEY,
  //     isSigner: false,
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
  //     CreateRealmArgs,
  //     {
  //       kind: 'struct',
  //       fields: [
  //         ['instruction', 'u8'],
  //         ['name', 'string'],
  //         ['configArgs', RealmConfigArgs],
  //       ],
  //     }
  //   ],
  //   [ 
  //     RealmConfigArgs, 
  //     { 
  //       kind: 'struct', 
  //       fields: [
  //         ['useCouncilMint', 'u8', boolMapper], 
  //         ['minCommunityTokensToCreateGovernance', 'u64'], 
  //         ['communityMintMaxVoteWeightSource', MintMaxVoteWeightSource], 
  //         ['useCommunityVoterWeightAddin', 'u8', boolMapper],
  //         ['useMaxCommunityVoterWeightAddin', 'u8', boolMapper],
  //       ] 
  //     }
  //   ],
  //   [ 
  //     MintMaxVoteWeightSource, 
  //     { 
  //       kind: 'struct', 
  //       fields: [
  //         ['type', 'u8'],
  //         ['value', 'u64'], 
  //       ] 
  //     }
  //   ],
  // ]);

  // const data = new CreateRealmArgs({ 
  //   name: process.env.REALM_NAME, 
  //   configArgs: new RealmConfigArgs({
  //     useCommunityVoterWeightAddin: false,
  //     useCouncilMint: false,
  //     useMaxCommunityVoterWeightAddin: false,
  //     minCommunityTokensToCreateGovernance: new BN(1),
  //     communityMintMaxVoteWeightSource: new MintMaxVoteWeightSource({ value: new BN(1000000) }),
  //   }),
  // });


  // const ix = new TransactionInstruction({
  //   keys,
  //   programId,
  //   data: Buffer.from(serialize(schema, data)),
  // });

  // ixs.push(ix);
  // return realm;
}
