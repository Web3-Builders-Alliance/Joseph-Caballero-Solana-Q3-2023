use anchor_lang::prelude::*;

declare_id!("7b69427tSXuZH9TsB6oT2i7vvkxrqxPa8WNhSdYrFeNx");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
