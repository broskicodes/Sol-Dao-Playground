use solana_program::{
  account_info::{next_account_info, AccountInfo},
  entrypoint::ProgramResult,
  program_error::ProgramError,
  pubkey::Pubkey,
  program::invoke_signed,
  msg,
};

use spl_token::{
  instruction::mint_to,
};

pub fn process_mint_community_token(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
) -> ProgramResult {
  let account_info_iter = &mut accounts.iter();

  let realm_info = next_account_info(account_info_iter)?; // 0
  let mint_governance_info = next_account_info(account_info_iter)?; // 1
  let governed_mint_info = next_account_info(account_info_iter)?; // 2
  let user_token_account_info = next_account_info(account_info_iter)?; // 3
  let token_account_owner = next_account_info(account_info_iter)?; // 4
  let token_info = next_account_info(account_info_iter)?; // 5

  if !token_account_owner.is_signer {
    msg!(
        "Owner of token account must sign",
    );
    return Err(ProgramError::MissingRequiredSignature);
  }

  let (mint_auth, bump) = Pubkey::find_program_address(
    &[
      b"mint-governance", 
      realm_info.key.as_ref(), 
      governed_mint_info.key.as_ref()
    ],
    program_id,
  );

  if mint_auth != *mint_governance_info.key {
    msg!(
        "Create account with PDA: {:?} was requested while PDA: {:?} was expected",
        mint_governance_info.key,
        mint_auth,
    );
    return Err(ProgramError::InvalidSeeds);
  }

  let mint_ix = mint_to(
    token_info.key,
    governed_mint_info.key,
    user_token_account_info.key,
    mint_governance_info.key,
    vec![mint_governance_info.key].as_slice(),
    1,
  )?;

  invoke_signed(
    &mint_ix,
    &[
      governed_mint_info.clone(),
      user_token_account_info.clone(),
      token_info.clone(),
      mint_governance_info.clone(),
    ],
    &[&[b"mint-governance", realm_info.key.as_ref(), governed_mint_info.key.as_ref(), &[bump]]],
  )?;

  Ok(())
}