/**
 * Extended Data for Blockchain Consensus Explorer
 * Block structures, consensus patterns, cryptocurrency details, workflow animations, and layer definitions.
 * Loaded BEFORE app.js and features.js.
 */

// ============================================================
// 1. BLOCK STRUCTURE DATA PER CONSENSUS ALGORITHM
// ============================================================
const blockStructureData = {
    pow: {
        model: "UTXO (Unspent Transaction Output)",
        blockSize: "1 – 4 MB (SegWit)",
        headerFields: [
            { name: "Version", desc: "Protocol version rules governing block validity" },
            { name: "Previous Block Hash", desc: "SHA-256d hash linking to the parent block" },
            { name: "Merkle Root", desc: "Root hash of all transactions in a binary Merkle tree" },
            { name: "Timestamp", desc: "Unix epoch time when the miner started hashing" },
            { name: "Difficulty Target", desc: "Compact representation of the target hash threshold" },
            { name: "Nonce", desc: "32-bit value miners iterate to find a valid hash" }
        ],
        merkleType: "Binary Merkle Tree (SHA-256d)",
        forkRule: "Longest chain rule — the chain with the most cumulative proof-of-work wins",
        specialNote: "Each transaction references unspent outputs (UTXOs) from prior transactions. Miners pack transactions by fee priority."
    },
    pos: {
        model: "Account-Based (Global State Trie)",
        blockSize: "Variable (~100 KB avg, no hard cap)",
        headerFields: [
            { name: "Slot Number", desc: "Position in the beacon chain timeline (12-sec slots)" },
            { name: "Proposer Index", desc: "Validator ID randomly selected to propose this block" },
            { name: "Parent Root", desc: "Hash of the previous beacon block root" },
            { name: "State Root", desc: "Root of the global Merkle Patricia Trie of accounts" },
            { name: "Body Root", desc: "Merkle root of the block body (attestations, deposits, slashings)" },
            { name: "Randao Reveal", desc: "Verifiable random value seeding future proposer selection" }
        ],
        merkleType: "Merkle Patricia Trie (Keccak-256)",
        forkRule: "LMD-GHOST fork choice + Casper FFG finality checkpoints every 2 epochs",
        specialNote: "Blocks include attestations (validator committee votes) that contribute to finality. Finalized blocks can never be reverted."
    },
    poh: {
        model: "Account-Based (Parallel Execution)",
        blockSize: "Entries streamed in real-time (~1232 bytes per entry batch)",
        headerFields: [
            { name: "Previous Blockhash", desc: "Hash of the prior slot's block" },
            { name: "Slot Number", desc: "Position in the leader schedule rotation" },
            { name: "Leader Identity", desc: "Public key of the scheduled leader validator" },
            { name: "PoH Hash Sequence", desc: "Continuous SHA-256 VDF chain proving passage of time" },
            { name: "Transaction Entries", desc: "Batched transactions embedded within the PoH hash chain" },
            { name: "Tick Count", desc: "Number of SHA-256 iterations between transaction timestamps" }
        ],
        merkleType: "SHA-256 Sequential Hash Chain (Verifiable Delay Function)",
        forkRule: "Tower BFT — PoH-weighted voting with exponential lockout penalties",
        specialNote: "No traditional blocks — transactions are timestamped within a continuous hash chain, eliminating the need for network-wide time synchronization."
    },
    dpos: {
        model: "Account-Based",
        blockSize: "Variable (up to 2 MB on EOS, ~64 KB on Tron)",
        headerFields: [
            { name: "Block Number", desc: "Sequential block height in the chain" },
            { name: "Producer", desc: "Public key of the elected delegate who created this block" },
            { name: "Schedule Version", desc: "Current active delegate schedule iteration number" },
            { name: "Timestamp", desc: "Block creation time (3-second rotation slots)" },
            { name: "Transaction Merkle Root", desc: "Root hash of all included transactions" },
            { name: "Confirmed Count", desc: "Number of delegate confirmations received for irreversibility" }
        ],
        merkleType: "Merkle Tree (SHA-256)",
        forkRule: "Last Irreversible Block (LIB) — finalized after 2/3+1 active delegate confirmations",
        specialNote: "Only elected delegates (e.g., 21 on EOS, 27 on Tron) produce blocks in a deterministic round-robin schedule."
    },
    poa: {
        model: "Account-Based (EVM-compatible)",
        blockSize: "Variable (depends on the blockchain's configured gas/block limit). Example: BNB Chain ≈ 30M gas.",
        headerFields: [
            { name: "Block Number", desc: "Sequential block height" },
            { name: "Validator Signature", desc: "ECDSA signature from the whitelisted authority node" },
            { name: "Parent Hash", desc: "Keccak-256 hash of the previous block header" },
            { name: "State Root", desc: "Root of the account and storage state trie" },
            { name: "Transactions Root", desc: "Root hash of the transaction trie" },
            { name: "Extra Data", desc: "Validator vanity bytes, validator metadata, and validator signature (implementation dependent)." }
        ],
        merkleType: "Transactions (organized using a Merkle Patricia Trie, Keccak-256)",
        forkRule: "Fork choice depends on the PoA implementation. Example (Clique/Parlia): In-turn validators are preferred while out-of-turn blocks may be accepted according to protocol rules.",
        specialNote: "A block is valid only when it is proposed by an authorized validator and satisfies all protocol validation rules."
    },
    pbft: {
        model: "Account-Based (Stellar) / Custom Ledger Model",
        blockSize: "Ledger close data (~100–1,000 transactions per close)",
        headerFields: [
            { name: "Ledger Sequence", desc: "Sequential ledger close number" },
            { name: "Previous Ledger Hash", desc: "Hash of the prior closed ledger" },
            { name: "Transaction Set Hash", desc: "Hash of the agreed-upon transaction set" },
            { name: "SCP Value", desc: "Ballot value agreed upon by the federated quorum" },
            { name: "Close Time", desc: "Consensus-agreed ledger close timestamp" },
            { name: "Base Fee", desc: "Minimum transaction fee for operations in this ledger" }
        ],
        merkleType: "Hash Chain (SHA-256)",
        forkRule: "SCP Ballot Protocol — nomination → prepare → commit → externalize",
        specialNote: "Stellar does not produce 'blocks' — it closes 'ledgers' containing transaction sets agreed upon by overlapping trust-based quorum slices."
    },
    pob: {
        model: "UTXO-Based (Bitcoin-derived)",
        blockSize: "Similar to Bitcoin (implementation dependent)",
        headerFields: [
            { name: "Block Hash", desc: "Unique cryptographic hash identifying the block." },
            { name: "Previous Block Hash", desc: "Hash linking to the parent block in the chain." },
            { name: "Merkle Root", desc: "Root hash of all transactions in the block." },
            { name: "Timestamp", desc: "Unix time of block creation." },
            { name: "Burn Weight", desc: "Generic PoB: The effective burn weight (virtual mining power) of the block producer." },
            { name: "Burn Reference", desc: "Generic PoB: Reference to the participant's historical burn record." },
            { name: "Burn History", desc: "Generic PoB: Ledger record of all past burns determining eligibility." },
            { name: "Nonce (Hybrid PoW Component)", desc: "Slimcoin-specific: Used in Slimcoin's hybrid Proof of Work block generation component." }
        ],
        merkleType: "Binary Merkle Tree (SHA-256d)",
        forkRule: "Longest Chain weighted by Burn Weight",
        specialNote: "Burn transactions permanently destroy coins by sending them to verifiably unspendable addresses. Different Proof of Burn implementations define how burn history influences future block production."
    }
};

// ============================================================
// 2. CONSENSUS PATTERN CLASSIFICATION DATA
// ============================================================
const consensusPatternsData = {
    pow: {
        selectionType: "Lottery (Cryptographic Hash Puzzle)",
        communicationType: "Gossip Protocol — flood broadcast to all peers",
        forkResolution: "Longest Chain Rule (most cumulative work)",
        finalityType: "Probabilistic — ~6 confirmations (~60 min for Bitcoin)",
        byzantineTolerance: "50% of total network hash power",
        patternCategory: "Nakamoto Consensus — open competition, permissionless entry",
        energyModel: "High — proportional to hash rate difficulty"
    },
    pos: {
        selectionType: "Weighted Random Lottery (stake-proportional)",
        communicationType: "Gossip + Attestation Committees — subnet-based propagation",
        forkResolution: "LMD-GHOST (Latest Message Driven Greediest Heaviest Observed SubTree) + Casper FFG",
        finalityType: "Deterministic — finalized every 2 epochs (~12.8 min on Ethereum)",
        byzantineTolerance: "33% of total staked value (liveness halt), 51% for full takeover",
        patternCategory: "Chain-Based PoS — validator committees with random rotation",
        energyModel: "Very Low — no hash computation required"
    },
    poh: {
        selectionType: "Leader Schedule (deterministic VDF-based rotation)",
        communicationType: "Pipeline Streaming — fragments broadcast before block completion",
        forkResolution: "Tower BFT — exponential lockout voting weighted by PoH clock",
        finalityType: "Optimistic Deterministic — ~400ms slot time, multi-slot confirmation",
        byzantineTolerance: "33% of total staked value",
        patternCategory: "Leader-Based with Cryptographic Clock — single-threaded VDF ordering",
        energyModel: "Moderate — continuous SHA-256 VDF computation by leader"
    },
    dpos: {
        selectionType: "Democratic Election (token-weighted voting for delegates)",
        communicationType: "Direct Delegate Relay — elected producers communicate directly",
        forkResolution: "Last Irreversible Block (LIB) — 2/3+1 delegate confirmation threshold",
        finalityType: "Near-Instant — finalized after round of delegate confirmations (~3 sec)",
        byzantineTolerance: "50%+1 of elected delegate seats",
        patternCategory: "Representative Democracy — small elected validator set in round-robin",
        energyModel: "Very Low — delegate-only block production"
    },
    poa: {
        selectionType: "Identity-Based (vetted consortium whitelisting)",
        communicationType: "Direct peer-to-peer communication among authorized validators",
        forkResolution: "Depends on the PoA implementation. Example — Clique/Parlia: In-turn validator preference. IBFT/QBFT: BFT voting.",
        finalityType: "Fast finality (implementation dependent). Examples — IBFT/QBFT: Immediate deterministic finality. Clique: Probabilistic confirmation.",
        byzantineTolerance: "Depends on the PoA implementation. IBFT/QBFT: Requires 3f+1 validators and tolerates up to f Byzantine validators. Clique: No formal Byzantine Fault Tolerance guarantee.",
        patternCategory: "Permissioned Authority — reputation-gated, no open participation",
        energyModel: "Negligible — no competition or stake required"
    },
    pbft: {
        selectionType: "Trust-Based (self-selected quorum slices, no global validator list)",
        communicationType: "Quorum Slice Overlap — nodes communicate within overlapping trust circles",
        forkResolution: "SCP Ballot Protocol — nominate → prepare → commit → externalize (no forks)",
        finalityType: "Deterministic — finalized upon quorum agreement (~3–5 sec)",
        byzantineTolerance: "Quorum intersection dependent — tolerates Byzantine failures as long as quorum slices overlap correctly",
        patternCategory: "Federated Byzantine Agreement — decentralized trust without global validator list",
        energyModel: "Negligible — voting-based with minimal computation"
    },
    pob: {
        selectionType: "Weighted selection according to effective Burn Weight.",
        communicationType: "Gossip Protocol — flood broadcast inherited from Bitcoin codebase",
        forkResolution: "Longest Chain weighted by Burn Weight.",
        finalityType: "Probabilistic — increases with successive blocks (~6 confirmations)",
        byzantineTolerance: "Secure while honest participants collectively control the majority of effective burn weight.",
        patternCategory: "Burn-Based Nakamoto Consensus — irreversible capital commitment replaces hash computation",
        energyModel: "Low ongoing energy consumption because irreversible economic commitment replaces computational competition."
    }
};

// ============================================================
// 3. CRYPTOCURRENCY DETAILS & VARIANTS
// ============================================================
const currencyDetailsData = {
    "Bitcoin": {
        symbol: "BTC",
        launchYear: 2009,
        founder: "Satoshi Nakamoto (pseudonymous)",
        maxSupply: "21,000,000 BTC",
        circulatingModel: "Mining rewards halve every ~210,000 blocks (~4 years)",
        currentPhase: "4th Halving Era (April 2024) — 3.125 BTC per block",
        keyMilestones: [
            { year: 2009, event: "Genesis block mined by Satoshi Nakamoto" },
            { year: 2012, event: "1st Halving — reward drops to 25 BTC" },
            { year: 2016, event: "2nd Halving — reward drops to 12.5 BTC" },
            { year: 2017, event: "SegWit activation — block capacity increases to ~4 MB" },
            { year: 2020, event: "3rd Halving — reward drops to 6.25 BTC" },
            { year: 2021, event: "Taproot upgrade — improved privacy and smart contracts" },
            { year: 2024, event: "4th Halving — reward drops to 3.125 BTC" }
        ],
        variants: [
            { name: "Bitcoin Cash (BCH)", forkType: "Hard Fork", year: 2017, reason: "Increased block size to 8 MB (later 32 MB) for higher on-chain throughput. Led by Roger Ver and Jihan Wu." },
            { name: "Bitcoin SV (BSV)", forkType: "Hard Fork", year: 2018, reason: "Forked from BCH. Pushed block size to 128 MB+. Led by Craig Wright claiming Satoshi's original vision." },
            { name: "Bitcoin Gold (BTG)", forkType: "Hard Fork", year: 2017, reason: "Replaced SHA-256 with Equihash algorithm to resist ASIC mining and re-democratize mining with GPUs." },
            { name: "SegWit2x (Cancelled)", forkType: "Proposed Hard Fork", year: 2017, reason: "Proposed doubling the base block size to 2 MB alongside SegWit. Cancelled due to lack of community consensus." }
        ]
    },
    "Litecoin": {
        symbol: "LTC",
        launchYear: 2011,
        founder: "Charlie Lee (former Google engineer)",
        maxSupply: "84,000,000 LTC",
        circulatingModel: "Mining rewards halve every ~840,000 blocks (~4 years)",
        currentPhase: "3rd Halving Era (August 2023) — 6.25 LTC per block",
        keyMilestones: [
            { year: 2011, event: "Launched as a 'silver to Bitcoin's gold' using Scrypt PoW" },
            { year: 2017, event: "SegWit activated before Bitcoin — served as Bitcoin's testbed" },
            { year: 2022, event: "MimbleWimble Extension Blocks (MWEB) privacy upgrade" },
            { year: 2023, event: "3rd Halving — reward drops to 6.25 LTC" }
        ],
        variants: [
            { name: "Litecoin Cash (LCC)", forkType: "Hard Fork", year: 2018, reason: "Changed mining algorithm from Scrypt to SHA-256 for ASIC compatibility. Minor community fork." }
        ]
    },
    "Rootstock": {
        symbol: "RBTC",
        launchYear: 2018,
        founder: "RSK Labs (Diego Gutiérrez Zaldívar)",
        maxSupply: "Pegged 1:1 to BTC (no independent supply)",
        circulatingModel: "RBTC is created by locking BTC via a 2-way peg federation bridge",
        currentPhase: "Active sidechain with EVM-compatible smart contracts secured by merged mining",
        keyMilestones: [
            { year: 2018, event: "Mainnet launch — first EVM-compatible Bitcoin sidechain" },
            { year: 2019, event: "Merged mining reaches 45%+ of Bitcoin's hash rate" },
            { year: 2023, event: "Powpeg federation upgraded for enhanced security" }
        ],
        variants: []
    },
    "Ethereum": {
        symbol: "ETH",
        launchYear: 2015,
        founder: "Vitalik Buterin, Gavin Wood, Joseph Lubin et al.",
        maxSupply: "No fixed cap — EIP-1559 fee burn offsets issuance (net deflationary since The Merge)",
        circulatingModel: "Validator rewards ~3.5% annual issuance, offset by base fee burns",
        currentPhase: "Post-Merge PoS era with active rollup-centric scaling roadmap",
        keyMilestones: [
            { year: 2015, event: "Frontier launch — first Turing-complete blockchain" },
            { year: 2016, event: "The DAO hack and subsequent hard fork creating ETC" },
            { year: 2017, event: "Byzantium upgrade — zk-SNARK support added" },
            { year: 2021, event: "EIP-1559 London upgrade — base fee burn mechanism" },
            { year: 2022, event: "The Merge — transition from PoW to PoS (99.95% energy reduction)" },
            { year: 2023, event: "Shanghai upgrade — staked ETH withdrawals enabled" },
            { year: 2024, event: "Dencun upgrade — Proto-Danksharding (EIP-4844) for L2 cost reduction" }
        ],
        variants: [
            { name: "Ethereum Classic (ETC)", forkType: "Hard Fork", year: 2016, reason: "Preserved the original chain after The DAO hack. Refused to reverse the $60M exploit, upholding 'code is law'." },
            { name: "Ethereum PoW (ETHW)", forkType: "Hard Fork", year: 2022, reason: "Continued the PoW chain after The Merge. Created by miners who refused the transition to Proof of Stake." }
        ]
    },
    "Cardano": {
        symbol: "ADA",
        launchYear: 2017,
        founder: "Charles Hoskinson (Ethereum co-founder), IOHK",
        maxSupply: "45,000,000,000 ADA",
        circulatingModel: "Staking rewards from reserve pool — no minimum lock, liquid delegation",
        currentPhase: "Voltaire era — on-chain governance and treasury voting",
        keyMilestones: [
            { year: 2017, event: "Byron era launch — foundation settlement layer" },
            { year: 2020, event: "Shelley upgrade — decentralized staking and delegation" },
            { year: 2021, event: "Alonzo upgrade — Plutus smart contracts enabled" },
            { year: 2022, event: "Vasil upgrade — improved Plutus performance" },
            { year: 2024, event: "Chang hard fork — constitutional governance framework" }
        ],
        variants: []
    },
    "Arbitrum": {
        symbol: "ARB",
        launchYear: 2021,
        founder: "Offchain Labs (Ed Felten, Steven Goldfeder, Harry Kalodner)",
        maxSupply: "10,000,000,000 ARB (governance token)",
        circulatingModel: "ARB is a governance token — gas fees paid in ETH on Arbitrum",
        currentPhase: "Active L2 rollup with Arbitrum One and Arbitrum Nova chains",
        keyMilestones: [
            { year: 2021, event: "Arbitrum One mainnet launch — optimistic rollup on Ethereum" },
            { year: 2022, event: "Arbitrum Nova launched — AnyTrust chain for gaming/social" },
            { year: 2023, event: "ARB token airdrop and DAO governance launch" },
            { year: 2024, event: "Stylus upgrade — Rust/C++ smart contracts alongside Solidity" }
        ],
        variants: []
    },
    "Solana": {
        symbol: "SOL",
        launchYear: 2020,
        founder: "Anatoly Yakovenko (former Qualcomm engineer)",
        maxSupply: "No fixed cap — inflationary with declining rate (starts at 8%, target 1.5%)",
        circulatingModel: "Staking rewards from inflation — current rate ~5.9% annually",
        currentPhase: "High-throughput L1 with Firedancer validator client by Jump Crypto",
        keyMilestones: [
            { year: 2020, event: "Mainnet Beta launch — PoH + PoS consensus" },
            { year: 2021, event: "DeFi Summer — TVL grows from $1B to $15B" },
            { year: 2022, event: "Multiple network outages highlight centralization concerns" },
            { year: 2023, event: "State compression — reduces NFT minting costs by 99%" },
            { year: 2024, event: "Firedancer validator client enters testing — potential 1M+ TPS" }
        ],
        variants: []
    },
    "Tron": {
        symbol: "TRX",
        launchYear: 2017,
        founder: "Justin Sun",
        maxSupply: "No fixed cap — deflationary via transaction fee burns",
        circulatingModel: "Block rewards (16 TRX/block) + voter partnership rewards to Super Representatives",
        currentPhase: "Active USDT settlement network — largest stablecoin transfer chain",
        keyMilestones: [
            { year: 2017, event: "ERC-20 token launched on Ethereum" },
            { year: 2018, event: "Mainnet Independence Day — migrated to own chain with DPoS" },
            { year: 2019, event: "Acquired BitTorrent — integrated decentralized file sharing" },
            { year: 2021, event: "Became #1 chain for USDT stablecoin transfers" },
            { year: 2022, event: "USDD algorithmic stablecoin launched" }
        ],
        variants: []
    },
    "EOS": {
        symbol: "EOS",
        launchYear: 2018,
        founder: "Dan Larimer, Block.one",
        maxSupply: "No fixed cap — ~1% annual inflation to fund worker proposals",
        circulatingModel: "Inflation rewards distributed to block producers and worker proposals",
        currentPhase: "Rebranded to Antelope under EOS Network Foundation governance",
        keyMilestones: [
            { year: 2017, event: "Year-long ICO raises $4.1B — largest in crypto history" },
            { year: 2018, event: "Mainnet launch with 21 Block Producers DPoS consensus" },
            { year: 2019, event: "Voice social media platform announced" },
            { year: 2021, event: "Block.one controversy — community demands accountability" },
            { year: 2022, event: "EOS Network Foundation takes over governance from Block.one" }
        ],
        variants: [
            { name: "WAX (WAXP)", forkType: "EOSIO Fork", year: 2019, reason: "Purpose-built for NFT trading and gaming. Uses EOSIO/Antelope codebase with DPoS consensus." },
            { name: "Telos (TLOS)", forkType: "EOSIO Fork", year: 2018, reason: "Community-driven fork focused on governance fairness. Reduced token concentration and added worker proposals." }
        ]
    },
    "BNB Chain": {
        symbol: "BNB",
        launchYear: 2019,
        founder: "Changpeng Zhao (CZ), Binance",
        maxSupply: "200,000,000 BNB (reduced via quarterly burns until 100M remains)",
        circulatingModel: "Auto-Burn mechanism — burns BNB based on price and blocks produced",
        currentPhase: "BNB Chain ecosystem with BSC (smart contracts) + opBNB (L2 rollup)",
        keyMilestones: [
            { year: 2017, event: "BNB launched as ERC-20 utility token on Ethereum" },
            { year: 2019, event: "Binance Chain mainnet launch — DEX-focused chain" },
            { year: 2020, event: "Binance Smart Chain (BSC) launch — EVM-compatible PoSA" },
            { year: 2022, event: "Rebranded to BNB Chain (Build N Build)" },
            { year: 2023, event: "opBNB L2 launch — optimistic rollup for scaling" }
        ],
        variants: []
    },
    "VeChain": {
        symbol: "VET",
        launchYear: 2018,
        founder: "Sunny Lu (former Louis Vuitton China CIO)",
        maxSupply: "86,712,634,466 VET",
        circulatingModel: "Dual-token model — VET generates VTHO (gas token) via staking",
        currentPhase: "Enterprise supply chain tracking with sustainability focus",
        keyMilestones: [
            { year: 2015, event: "VeChain founded as supply chain verification platform" },
            { year: 2018, event: "Mainnet launch with PoA consensus and dual-token model" },
            { year: 2022, event: "PoA 2.0 upgrade — VRF-based committee selection" },
            { year: 2023, event: "VeBetter DAO — sustainability-focused governance" }
        ],
        variants: []
    },

    "Stellar": {
        symbol: "XLM",
        launchYear: 2014,
        founder: "Jed McCaleb (Ripple co-founder), Joyce Kim",
        maxSupply: "50,001,806,812 XLM (fixed after 2019 burn)",
        circulatingModel: "No inflation since 2019 — foundation distributes from development fund",
        currentPhase: "Cross-border payments and asset tokenization with Soroban smart contracts",
        keyMilestones: [
            { year: 2014, event: "Stellar forked from Ripple codebase as a non-profit network" },
            { year: 2015, event: "Stellar Consensus Protocol (SCP) whitepaper by David Mazières" },
            { year: 2019, event: "55 billion XLM burned — supply reduced by 50%" },
            { year: 2022, event: "Soroban smart contract platform launched on testnet" },
            { year: 2024, event: "Soroban mainnet — Rust-based smart contracts live" }
        ],
        variants: []
    },
    "Ripple": {
        symbol: "XRP",
        launchYear: 2012,
        founder: "Chris Larsen, Jed McCaleb, Arthur Britto",
        maxSupply: "100,000,000,000 XRP (pre-mined, escrow-released)",
        circulatingModel: "No mining — Ripple Labs releases up to 1B XRP/month from escrow",
        currentPhase: "Enterprise banking settlement with XRPL AMM and sidechain support",
        keyMilestones: [
            { year: 2012, event: "XRP Ledger launched — all 100B tokens pre-mined" },
            { year: 2017, event: "RippleNet global banking payment network launch" },
            { year: 2020, event: "SEC lawsuit filed alleging XRP is an unregistered security" },
            { year: 2023, event: "Partial court victory — programmatic sales are not securities" },
            { year: 2024, event: "XRPL AMM and sidechain EVM compatibility launched" }
        ],
        variants: []
    },
    "Slimcoin": {
        symbol: "SLM",
        launchYear: 2014,
        founder: "slimcoin-project (pseudonymous open-source community)",
        maxSupply: "250,000,000 SLM (soft cap via burn decay)",
        circulatingModel: "Hybrid PoW/PoS/PoB emissions — participants earn virtual mining power by burning coins; burn weight decays over time (Slimcoin-specific)",
        currentPhase: "Active niche network — first blockchain to implement native Proof of Burn consensus in a hybrid PoW/PoS/PoB model",
        description: "Slimcoin pioneered native Proof of Burn consensus through a hybrid PoW/PoS/PoB architecture where burned coins create virtual mining power that gradually decays over time.",
        keyMilestones: [
            { year: 2014, event: "Launched as first cryptocurrency with native Proof of Burn consensus" },
            { year: 2014, event: "Hybrid PoW/PoS/PoB model introduced — all three mechanisms operate simultaneously" },
            { year: 2019, event: "Community revival — codebase updated to modern Bitcoin Core standards" },
            { year: 2022, event: "Burn decay algorithm refined to better balance long-term validator economics" }
        ],
        variants: []
    },
    "Counterparty": {
        symbol: "XCP",
        launchYear: 2014,
        founder: "Robby Dermody, Adam Krellenstein, Evan Wagner",
        maxSupply: "2,648,755 XCP (fixed — created entirely via genesis burn)",
        circulatingModel: "No inflation — all XCP minted in genesis by burning 2,130 BTC to unspendable address",
        currentPhase: "Bitcoin metaprotocol for token issuance, NFTs, and decentralized exchange using OP_RETURN",
        description: "Counterparty introduced a Proof-of-Burn token distribution model during genesis by permanently destroying Bitcoin to issue XCP tokens fairly. Consensus remains secured by Bitcoin.",
        keyMilestones: [
            { year: 2014, event: "Genesis burn — 2,130 BTC permanently destroyed to create XCP supply fairly" },
            { year: 2014, event: "Counterparty DEX launched — first decentralized exchange on Bitcoin" },
            { year: 2016, event: "Rare Pepe NFT trading cards launched on Counterparty" },
            { year: 2021, event: "Dispensers introduced — trustless Bitcoin vending machine contracts" },
            { year: 2023, event: "Bitcoin Ordinals/Stamps integration extends Counterparty functionality" }
        ],
        variants: []
    }
};

// ============================================================
// 4. WORKFLOW ANIMATION FRAMES PER ALGORITHM
// ============================================================
const workflowAnimationData = {
    pow: {
        title: "Proof of Work Mining Race",
        frames: [
            { icon: "📡", label: "Broadcast", desc: "User signs a transaction and broadcasts it to the peer-to-peer mempool.", duration: 2000 },
            { icon: "⛏️", label: "Mining Race", desc: "Thousands of miners simultaneously hash block headers with different nonce values.", duration: 3000 },
            { icon: "🔢", label: "Nonce Discovery", desc: "A miner finds a nonce that produces a hash below the target difficulty threshold.", duration: 2500 },
            { icon: "📢", label: "Block Propagation", desc: "The winning miner broadcasts the solved block across the gossip network.", duration: 2000 },
            { icon: "✅", label: "Verification", desc: "Nodes verify: valid hash? valid transactions? No double-spend? Single hash check confirms.", duration: 2000 },
            { icon: "⛓️", label: "Chain Extension", desc: "Verified block is appended. Miner receives block reward + fees. Next race begins.", duration: 2000 }
        ]
    },
    pos: {
        title: "Proof of Stake Validator Attestation",
        frames: [
            { icon: "🔒", label: "Stake Lockup", desc: "Validators deposit 32 ETH into the staking deposit contract to register.", duration: 2000 },
            { icon: "🎲", label: "Proposer Selection", desc: "RANDAO beacon selects a validator to propose the next block for this 12-sec slot.", duration: 2500 },
            { icon: "📦", label: "Block Proposal", desc: "Selected proposer bundles pending transactions and attestations into a new block.", duration: 2000 },
            { icon: "🗳️", label: "Committee Attestation", desc: "A random committee of validators verifies and votes (attests) on the proposed block.", duration: 3000 },
            { icon: "🏛️", label: "Supermajority Check", desc: "System checks: do 2/3 of active validators agree? If yes, block reaches justification.", duration: 2500 },
            { icon: "🔗", label: "Finalization", desc: "After two justified epochs, the block is finalized — permanently irreversible.", duration: 2000 }
        ]
    },
    poh: {
        title: "Proof of History Pipeline",
        frames: [
            { icon: "⏱️", label: "VDF Clock", desc: "Leader node runs continuous SHA-256 hashing — each output feeds as input to the next.", duration: 2000 },
            { icon: "📝", label: "Timestamping", desc: "Incoming transactions are interleaved into the hash chain, fixing their sequential position.", duration: 2500 },
            { icon: "📡", label: "Pipeline Stream", desc: "Transaction fragments are streamed to validators before the block is even complete.", duration: 2000 },
            { icon: "🖥️", label: "GPU Verification", desc: "Validators use multi-core GPUs to verify VDF proofs in parallel — faster than generation.", duration: 2500 },
            { icon: "🗳️", label: "Tower BFT Vote", desc: "Validators execute weighted PoS votes with exponential lockout commitments.", duration: 2000 },
            { icon: "⚡", label: "Sub-Second Finality", desc: "Block finalized in ~400ms. Next leader rotation begins immediately.", duration: 2000 }
        ]
    },
    dpos: {
        title: "DPoS Delegate Block Production",
        frames: [
            { icon: "🗳️", label: "Token Voting", desc: "Token holders lock tokens to vote for delegate candidates. 1 token = 1 vote weight.", duration: 2000 },
            { icon: "🏆", label: "Delegate Election", desc: "Votes tallied — top N candidates (e.g., 27 on Tron) become active block producers.", duration: 2500 },
            { icon: "🔄", label: "Round-Robin", desc: "Scheduler assigns 3-second block slots to delegates in a rotating sequence.", duration: 2000 },
            { icon: "📦", label: "Block Creation", desc: "Active delegate bundles transactions, signs the block with their private key.", duration: 2000 },
            { icon: "✅", label: "Rapid Confirmation", desc: "Remaining delegates verify and co-sign. Block is confirmed in a single round.", duration: 2000 },
            { icon: "🔁", label: "Accountability", desc: "If a delegate goes offline, voters withdraw support — replaced next epoch.", duration: 2000 }
        ]
    },
    poa: {
        title: "PoA Authority Block Signing",
        frames: [
            { icon: "🪪", label: "Vetting", desc: "Individuals or organizations undergo identity, reputation, governance, and technical evaluation before becoming validator candidates.", duration: 2000 },
            { icon: "📋", label: "Whitelisting", desc: "Approved validator public keys are added to the active validator set through the blockchain's governance process.", duration: 2000 },
            { icon: "🔄", label: "Block Proposal", desc: "An authorized validator is selected according to the blockchain's PoA protocol to propose the next block.", duration: 2500 },
            { icon: "🔐", label: "Validation", desc: "Authorized validators verify the proposed block's digital signature, transactions, state transition, parent hash, timestamp, and all protocol validation rules.", duration: 2000 },
            { icon: "🔍", label: "Consensus", desc: "Validators accept and append the block to the blockchain after full validation.", duration: 2000 },
            { icon: "⚖️", label: "Governance", desc: "If a validator behaves maliciously or violates governance rules, its authority can be revoked and it is removed from the validator set.", duration: 2000 }
        ]
    },
    pbft: {
        title: "SCP Consensus Lifecycle",
        frames: [
            { icon: "🤝", label: "Trust Config", desc: "Each node defines its own 'quorum slice' — a subset of trusted peers. Overlapping slices form network-wide quorums.", duration: 2000 },
            { icon: "📝", label: "Nominate", desc: "Nodes propose candidate transaction sets for the current ledger slot and broadcast nominations to quorum slice peers.", duration: 2500 },
            { icon: "🗳️", label: "Prepare", desc: "SCP ballot protocol begins. Nodes vote to prepare a ballot. A ballot is prepared when a quorum of peers agrees.", duration: 2500 },
            { icon: "🔒", label: "Commit", desc: "Nodes vote to commit the prepared ballot. Once a quorum confirms, the value is locked and cannot be rolled back.", duration: 2000 },
            { icon: "📤", label: "Externalize", desc: "The committed value is externalized — the transaction set is applied. All agreeing nodes close the ledger simultaneously.", duration: 2000 },
            { icon: "📒", label: "Ledger Close", desc: "Ledger updated atomically with deterministic finality. No possibility of rollback or fork.", duration: 2000 }
        ]
    },
    pob: {
        title: "Proof of Burn Block Selection",
        frames: [
            { icon: "💰", label: "Token Acquisition", desc: "Participants acquire native cryptocurrency through exchanges, mining rewards, or previous ownership before participating in the burn process.", duration: 2000 },
            { icon: "🔥", label: "Burn Transaction", desc: "Participants permanently destroy coins by sending them to a verifiably unspendable (burn) address. The burn transaction is permanently recorded on the blockchain.", duration: 2500 },
            { icon: "⚖️", label: "Burn Weight", desc: "The protocol converts burned coins into burn weight (also called virtual mining power or burn score depending on the implementation), increasing the participant's probability of creating future blocks.", duration: 2000 },
            { icon: "🎲", label: "Block Selection", desc: "The protocol selects the next block producer according to each participant's effective burn weight. Selection is probabilistic — higher burn weight increases but does not guarantee selection.", duration: 2500 },
            { icon: "📦", label: "Block Creation", desc: "The selected participant assembles pending transactions, signs the block, and broadcasts it to the network.", duration: 2000 },
            { icon: "♻️", label: "Reward", desc: "The selected participant receives block rewards. Depending on the implementation, burn influence may remain permanent or gradually decay over time (burn decay is Slimcoin-specific).", duration: 2000 }
        ]
    }
};

// ============================================================
// 5. LAYER DEFINITIONS (L0 through L3)
// ============================================================
const layerDefinitions = [
    {
        layer: "Layer 0",
        tag: "L0",
        name: "Network & Transport Infrastructure",
        color: "#718096",
        description: "The foundational network layer that enables communication between different blockchains. Provides cross-chain interoperability, shared security, and underlying transport protocols.",
        examples: [
            { name: "Polkadot", role: "Relay chain connecting parachains with shared security" },
            { name: "Cosmos (IBC)", role: "Inter-Blockchain Communication protocol for sovereign chains" },
            { name: "Avalanche Primary Network", role: "Subnet architecture for custom blockchain deployment" },
            { name: "LayerZero", role: "Omnichain messaging protocol for cross-chain communication" }
        ]
    },
    {
        layer: "Layer 1",
        tag: "L1",
        name: "Base Consensus & Settlement",
        color: "#00f2fe",
        description: "The primary blockchain that achieves consensus independently, processes transactions, settles state, and provides the ultimate source of truth and security for the ecosystem.",
        examples: [
            { name: "Bitcoin", role: "PoW — original decentralized settlement layer" },
            { name: "Litecoin", role: "PoW (Scrypt) — fast-confirming 'silver to Bitcoin's gold'" },
            { name: "Ethereum", role: "PoS — programmable settlement with smart contracts" },
            { name: "Cardano", role: "PoS (Ouroboros) — peer-reviewed formal verification" },
            { name: "Solana", role: "PoH+PoS — high-throughput single-layer execution" },
            { name: "Tron", role: "DPoS — 27 Super Representatives for high-volume stablecoin transfers" },
            { name: "EOS", role: "DPoS — 21 Block Producers for fee-less enterprise dApps" },
            { name: "BNB Chain", role: "PoSA — fast EVM-compatible execution" },
            { name: "VeChain", role: "PoA 2.0 — enterprise supply chain and sustainability" },
            { name: "Stellar", role: "FBA (SCP) — cross-border payments with deterministic finality" },
            { name: "Ripple", role: "RPCA (UNL) — enterprise banking settlement network" },
            { name: "Slimcoin", role: "PoB/PoW/PoS hybrid — first native Proof of Burn blockchain" }
        ]
    },
    {
        layer: "Layer 2",
        tag: "L2",
        name: "Scaling & Execution",
        color: "#a55eea",
        description: "Secondary frameworks built on top of Layer 1 to increase throughput. L2s process transactions off-chain and batch-settle compressed proofs or state roots back to the base layer, inheriting its security.",
        examples: [
            { name: "Arbitrum", role: "Optimistic rollup — settles fraud proofs on Ethereum" },
            { name: "Base", role: "OP Stack rollup — Coinbase-operated sequencer on Ethereum" },
            { name: "Lightning Network", role: "Payment channels for instant Bitcoin micropayments" },
            { name: "Rootstock (RSK)", role: "Merged-mining sidechain with EVM on Bitcoin" },
            { name: "Counterparty", role: "Bitcoin metaprotocol — PoB genesis token distribution on Bitcoin" },
            { name: "zkSync Era", role: "ZK rollup — validity proofs for instant L1 finality" }
        ]
    },
    {
        layer: "Layer 3",
        tag: "L3",
        name: "Application & Protocol",
        color: "#ff9f43",
        description: "The user-facing application layer where decentralized protocols, dApps, and services operate. These protocols interact with L1/L2 smart contracts to deliver specific functionality to end users.",
        examples: [
            { name: "Uniswap", role: "Decentralized exchange (DEX) — automated market maker protocol" },
            { name: "Aave", role: "Decentralized lending and borrowing protocol" },
            { name: "OpenSea", role: "NFT marketplace operating across multiple chains" },
            { name: "Chainlink", role: "Decentralized oracle network providing off-chain data feeds" },
            { name: "Lido", role: "Liquid staking protocol — stETH derivative for staked ETH" }
        ]
    }
];

// ============================================================
// 6. WORKFLOW ANIMATION STATE
// ============================================================
let animationIntervalId = null;
let currentAnimFrame = 0;
let isAnimationPlaying = false;
