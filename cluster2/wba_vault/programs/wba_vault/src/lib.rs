use anchor_lang::prelude::*;

declare_id!("EzdvFHcekYLwsqmZqADXwN6mv4BWea5aEdBojY5359rZ");

#[program]
pub mod wba_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
