/**
 * Consensus Algorithms in Blockchain — Immersive Website
 * Complete Application Logic with Canvas Mimicking Animations
 */

// ==========================================================================
// 1. DATA DEFINITIONS (PRESERVED)
// ==========================================================================
const algorithmsData = {
    pow: {
        id: "pow",
        name: "Proof of Work",
        acronym: "PoW",
        tagline: "Security through physical energy expenditure",
        description: "Proof of Work is the pioneering consensus mechanism where nodes (miners) compete to solve computationally intensive mathematical puzzles (using cryptographic hashing functions like SHA-256). The first miner to find a valid solution (a hash below a certain target difficulty) earns the right to add the new block of transactions to the ledger and receives a block reward. This makes altering historical records prohibitively expensive, as an attacker would have to re-compute all work from the altered block forward.",
        scores: { scalability: 2.0, security: 9.5, decentralisation: 8.5 },
        specs: {
            blockTime: "10 mins (Bitcoin)",
            tps: "7 - 15 TPS",
            nodes: "~15,000+ (Bitcoin)",
            stake: "ASIC hardware + heavy electricity cost"
        },
        steps: [
            { title: "Transaction Broadcast", desc: "Users sign and submit transactions. These are broadcast to the peer-to-peer network and wait in a temporary storage pool (mempool)." },
            { title: "Puzzle Competition", desc: "Mining nodes aggregate transactions into a candidate block. They repeatedly hash the block header with a changing variable ('nonce') trying to get an output below the target threshold." },
            { title: "Block Broadcast", desc: "The first miner to find a valid nonce instantly broadcasts their solution and candidate block to the rest of the network." },
            { title: "Consensus Verification", desc: "Other nodes receive the block, verify that all transactions are valid (no double-spend), and run a single hash to verify the miner's work proof." },
            { title: "Reward & Confirmation", desc: "If verified, nodes add the block to their local chain and start mining the next block. The miner receives native block rewards and fees. Finality increases with each added block." }
        ],
        blockchains: [
            { name: "Bitcoin", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Bitcoin values absolute decentralisation and censorship resistance above speed. PoW's heavy capital and energy expenditures make the network highly secure and resistant to nation-state level tampering.", languages: ["Bitcoin Script (Non-Turing complete stack language)"] },
            { name: "Litecoin", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses the Scrypt PoW algorithm. Litecoin was designed as a 'silver' complement to Bitcoin, offering 2.5-minute block times for quicker retail transactions.", languages: ["Bitcoin Script"] },
            { name: "Rootstock", layer: "Layer 2 (Bitcoin Scaling)", layerType: "L2", rationale: "A sidechain providing EVM-compatible smart contracts. It uses 'Merged Mining' PoW, allowing Bitcoin miners to validate Rootstock blocks simultaneously without additional energy consumption.", languages: ["Solidity", "Vyper", "Yul"] }
        ]
    },
    pos: {
        id: "pos",
        name: "Proof of Stake",
        acronym: "PoS",
        tagline: "Security through economic alignment and capital lockup",
        description: "Proof of Stake replaces energy-hungry mining with native capital staking. Validators lock up a specific amount of cryptocurrency as collateral to be randomly selected to propose and validate blocks. If they behave honestly, they earn transaction fees and newly minted coins; if they attempt to double-sign or validate invalid transactions, a portion of their staked collateral is slashed (destroyed).",
        scores: { scalability: 6.5, security: 8.5, decentralisation: 7.5 },
        specs: {
            blockTime: "12 secs (Ethereum)",
            tps: "15 - 30 TPS (L1) / 10,000+ (L2)",
            nodes: "~1,000,000+ validators (Ethereum)",
            stake: "32 ETH (Ethereum) / 0.1 ADA (Cardano)"
        },
        steps: [
            { title: "Collateral Registration", desc: "Users deposit and lock native currency into a smart contract (e.g. 32 ETH) to register as validator nodes in the network." },
            { title: "Proposer Selection", desc: "At the start of each time slot, an on-chain randomizer selects a validator to propose the next block. Probability scales with total stake value." },
            { title: "Attestation Phase", desc: "A randomly selected committee of other validators verifies the proposed block and 'attests' (votes) that it is valid and belongs to the canonical chain." },
            { title: "Consensus & Settlement", desc: "When a supermajority (2/3 of active stake) attestations are gathered, the block is finalized and settled permanently into the ledger." },
            { title: "Yield & Slashing", desc: "Honest validators earn staking yields (issuance + fees). Violators who sign conflicting blocks have their stake slashed and are ejected." }
        ],
        blockchains: [
            { name: "Ethereum", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Transitioned from PoW to PoS (The Merge) in 2022 to decrease energy consumption by 99.95%, support decentralized liquid staking, and secure settlement for Layer 2 rollups.", languages: ["Solidity", "Vyper", "Yul"] },
            { name: "Cardano", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses the Ouroboros PoS protocol. Cardano uses a liquid staking model where users can delegate voting weight without locking up their native ADA tokens, promoting open delegation.", languages: ["Plutus (Haskell-based)", "Aiken", "Marlowe"] },
            { name: "Arbitrum", layer: "Layer 2 (Ethereum Rollup)", layerType: "L2", rationale: "An optimistic rollup that processes computations off-chain, then settles data batches directly to Ethereum L1, inheriting Ethereum's robust PoS security model.", languages: ["Solidity", "Vyper"] }
        ]
    },
    poh: {
        id: "poh",
        name: "Proof of History",
        acronym: "PoH + PoS",
        tagline: "Security through cryptographic time-sequencing",
        description: "Proof of History is not a standalone consensus mechanism, but a cryptographic helper that works alongside Proof of Stake. It uses a Verifiable Delay Function (VDF) to create a continuous, cryptographically verifiable record of time. By timestamping transactions inside a historical sequence, validator nodes can agree on the order of events without waiting for network communication, dramatically boosting processing speed.",
        scores: { scalability: 9.5, security: 7.5, decentralisation: 5.5 },
        specs: {
            blockTime: "400 ms (Solana)",
            tps: "50,000 - 65,000 TPS",
            nodes: "~1,800 validators (Solana)",
            stake: "High hardware requirements + voting gas fee"
        },
        steps: [
            { title: "Sequential VDF Hashing", desc: "A leader node runs a continuous SHA-256 loop. Because it is single-threaded, it provides a reliable, cryptographically verifiable 'clock'." },
            { title: "Transaction Timestamping", desc: "As transactions arrive at the leader node, they are combined with the current VDF hash, fixing their exact sequential position in time." },
            { title: "Pipelined Distribution", desc: "The leader broadcasts the transaction stream in fragments to other validators before the block is even fully created." },
            { title: "Parallel Verification", desc: "Validators use multi-core GPUs to verify the VDF proofs in parallel, validating the timing sequence faster than it took to generate." },
            { title: "Tower BFT Agreement", desc: "Validators execute a modified PBFT vote (Tower BFT) backed by PoS weights to lock in and finalize the sequenced ledger." }
        ],
        blockchains: [
            { name: "Solana", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Solana couples PoH with PoS to eliminate block time coordination overhead, facilitating high-frequency trading and sub-second transaction settle speeds directly on Layer 1.", languages: ["Rust", "C", "C++ (using Anchor framework)"] }
        ]
    },
    dpos: {
        id: "dpos",
        name: "Delegated Proof of Stake",
        acronym: "DPoS",
        tagline: "Security through democratic node representation",
        description: "Delegated Proof of Stake introduces a representative democracy. Token holders vote in real-time to elect a small, fixed number of trusted delegates (often called block producers or super representatives, e.g., 21 or 27). These elected delegates are solely responsible for verifying transactions, creating blocks, and maintaining network consensus. This concentration of power enables sub-second confirmations.",
        scores: { scalability: 8.0, security: 6.5, decentralisation: 3.5 },
        specs: {
            blockTime: "3 secs (Tron)",
            tps: "2,000 - 10,000 TPS",
            nodes: "21 - 100 elected delegates",
            stake: "No minimum to vote; high backing required to be elected"
        },
        steps: [
            { title: "Continuous Voting", desc: "Token holders vote for delegate candidates by locking up their native tokens. One token equals one vote weight." },
            { title: "Representative Selection", desc: "The votes are tallied. The top-ranking nodes (e.g. 27 on Tron) are designated as the active block producers." },
            { title: "Round-Robin Scheduling", desc: "A slot scheduler assigns block creation duties to the active delegates in a rotating sequence." },
            { title: "Rapid Attestation", desc: "The assigned delegate bundles transactions and signs the block. The remaining active delegates verify and approve the block rapidly." },
            { title: "Democratic Demotion", desc: "If a delegate goes offline or signs fraudulent data, voters withdraw votes, automatically replacing them with an honest candidate in the next epoch." }
        ],
        blockchains: [
            { name: "Tron", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses 27 Super Representatives. The high-speed turn rotation allows Tron to process high volumes of USDT stablecoin transfers with negligible network fees.", languages: ["Solidity (Tron Virtual Machine - TVM)"] },
            { name: "EOS", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Relies on 21 Block Producers. EOS targets enterprise application scaling, using DPoS to offer account creation and fee-less smart contract interactions.", languages: ["C++"] }
        ]
    },
    poa: {
        id: "poa",
        name: "Proof of Authority",
        acronym: "PoA",
        tagline: "Security through identity, reputation, and vetting",
        description: "Proof of Authority is a reputation-based consensus mechanism where validator identities are pre-vetted and approved by a central governing body. Validators are not required to spend computational energy or stake capital; their motivation to act honestly is tied to their real-world reputation and legal liability. This is highly suited for private or consortium blockchains.",
        scores: { scalability: 9.5, security: 7.0, decentralisation: 1.5 },
        specs: {
            blockTime: "3 secs (BNB Chain - PoSA)",
            tps: "2,200 - 5,000 TPS",
            nodes: "21 - 40 validators",
            stake: "Governance vetting + professional hardware hosting"
        },
        steps: [
            { title: "Vetting & KYC Check", desc: "Individuals or organizations undergo rigorous identity, background, and legal checks to establish accountability." },
            { title: "Authority Whitelisting", desc: "The governing council adds the approved node's cryptographic key to the active validator whitelist." },
            { title: "Block Generation", desc: "Validators take turns proposing blocks in a deterministic rotation, reducing latency and communication overhead." },
            { title: "Signature Authentication", desc: "Consensus is achieved when other whitelisted nodes verify the proposer's digital signature and append the block." },
            { title: "Council Revocation", desc: "If a validator acts maliciously, the governing council revokes their credentials and keys, instantly removing them from consensus." }
        ],
        blockchains: [
            { name: "BNB Chain", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses a hybrid Proof of Staked Authority (PoSA). BNB Chain relies on a small validator set (currently ~40) to offer fast, cheap EVM-compatible execution.", languages: ["Solidity", "Vyper"] },
            { name: "VeChain", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses PoA 2.0. VeChain tracks global supply chains and requires predictable enterprise transaction fees, secured by vetted Authority Masternodes.", languages: ["Solidity"] },
            { name: "Base", layer: "Layer 2 (Ethereum Rollup)", layerType: "L2", rationale: "An optimistic rollup operated by Coinbase. It initially relies on a centralized PoA sequencer to execute and batch transactions before decentralizing.", languages: ["Solidity"] }
        ]
    },
    pbft: {
        id: "pbft",
        name: "Federated Byzantine Agreement",
        acronym: "FBA / PBFT",
        tagline: "Security through quorum consensus slices",
        description: "Federated Byzantine Agreement (FBA) and PBFT solve consensus through direct communication and quorum voting among nodes, without mining or token staking. In FBA, nodes do not need a globally centralized list of validators; instead, they choose a set of other nodes they trust (a 'quorum slice'). When these slices overlap, they form a network-wide consensus, resolving double-spend issues within seconds.",
        scores: { scalability: 9.0, security: 7.5, decentralisation: 4.5 },
        specs: {
            blockTime: "2 - 5 secs (Stellar)",
            tps: "1,000 - 4,000 TPS",
            nodes: "~100 - 150 validators (Stellar)",
            stake: "Low hardware + peer trust inclusion"
        },
        steps: [
            { title: "Trust Configuration", desc: "Each node defines its own subset of trusted peers (a 'Quorum Slice'). Nodes build decentralized networks of trust." },
            { title: "Nomination Phase", desc: "Nodes propose candidate transactions for a ledger slot and broadcast their choices to peers in their quorum slices." },
            { title: "Ballot Selection", desc: "Nodes vote on candidates, checking if a quorum of peers agrees. If a consensus slice matches, the ballot is prepared." },
            { title: "Commit Phase", desc: "Nodes commit to the agreed-upon ballot and verify that their trusted peers have committed to the same ledger modifications." },
            { title: "Final Externalization", desc: "The transaction set is finalized. Once a node's quorum slice reaches agreement, it updates its local ledger instantly." }
        ],
        blockchains: [
            { name: "Stellar", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses the Stellar Consensus Protocol (SCP) — an FBA model. Stellar targets cross-border asset tokenization and remittance, requiring sub-second finality.", languages: ["Rust (Soroban Smart Contracts)", "JavaScript", "Python", "Go (SDKs)"] },
            { name: "Ripple", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "Uses the Ripple Protocol Consensus Algorithm (RPCA). It relies on a Unique Node List (UNL) of trusted validators to settle global banking payments.", languages: ["C++ (XRPL Hooks)"] }
        ]
    },
    pob: {
        id: "pob",
        name: "Proof of Burn",
        acronym: "PoB",
        tagline: "Security through provable token destruction",
        description: "Proof of Burn is a consensus mechanism where validators demonstrate commitment by permanently destroying (burning) cryptocurrency tokens by sending them to a verifiably unspendable address. The more tokens a validator burns, the higher their probability of being selected to mine the next block. This creates a long-term economic commitment without the energy waste of PoW, as the burned tokens represent 'virtual mining rigs' that cannot be recovered.",
        scores: { scalability: 5.0, security: 6.5, decentralisation: 6.0 },
        specs: {
            blockTime: "10 mins (Slimcoin)",
            tps: "10 - 50 TPS",
            nodes: "~50 - 200 validators",
            stake: "Permanent token burn (irreversible cost)"
        },
        steps: [
            { title: "Token Acquisition", desc: "Participants acquire native tokens from the open market or through prior mining/staking rewards." },
            { title: "Burn Transaction", desc: "Validators send tokens to a provably unspendable address (e.g., 0x000...dead). The transaction is recorded on-chain as proof of burn." },
            { title: "Virtual Mining Power", desc: "The protocol assigns virtual mining power proportional to the amount of tokens burned. More burns = higher probability of block selection." },
            { title: "Block Selection", desc: "A weighted random selection picks the next block producer based on cumulative burn history and a decay function over time." },
            { title: "Reward & Decay", desc: "The selected validator creates the block and earns rewards. Burn power gradually decays, requiring periodic re-burning to maintain position." }
        ],
        blockchains: [
            { name: "Slimcoin", layer: "Layer 1 (Base Chain)", layerType: "L1", rationale: "The first cryptocurrency to implement Proof of Burn. Uses a hybrid PoW/PoS/PoB model where burning coins creates long-term virtual mining power.", languages: ["C++ (Bitcoin Core fork)"] },
            { name: "Counterparty", layer: "Layer 2 (Bitcoin Metaprotocol)", layerType: "L2", rationale: "Used PoB in its genesis — 2,130 BTC were permanently burned to create XCP tokens, ensuring a fair distribution with no pre-mine.", languages: ["Python", "Bitcoin Script (OP_RETURN)"] }
        ]
    }
};

// Compatibility Heatmap Dataset
const blockchainsList = ["Bitcoin", "Litecoin", "Ethereum", "Cardano", "Solana", "BNB Chain", "Stellar", "Arbitrum"];
const compatibilityMap = {
    "Bitcoin": {
        "Bitcoin": { status: "Compatible", detail: "Same protocol (PoW). Self-compatible." },
        "Litecoin": { status: "Compatible", detail: "Both use Proof of Work (PoW). Bridges can verify hash proofs directly, enabling atomic swaps." },
        "Ethereum": { status: "Incompatible", detail: "PoW vs PoS. Requires custodial/wrapped assets (e.g. WBTC) or multi-signature bridging bridges." },
        "Cardano": { status: "Incompatible", detail: "PoW vs PoS. Different consensus structures; trustless bridging requires zero-knowledge proofs (e.g. NiPoPoWs)." },
        "Solana": { status: "Incompatible", detail: "PoW vs PoH+PoS. Different timing architectures; requires trust-assumed multi-sig validators (e.g. Wormhole)." },
        "BNB Chain": { status: "Incompatible", detail: "PoW vs PoA. BNB uses authority nodes; Bitcoin uses mining hash power. Incompatible at protocol level." },
        "Stellar": { status: "Incompatible", detail: "PoW vs FBA. Stellar relies on quorum slices; Bitcoin relies on hash power. Bridges must rely on validators." },
        "Arbitrum": { status: "Incompatible", detail: "PoW vs L2 Rollup. Arbitrum settles state roots directly on Ethereum's PoS, making direct Bitcoin bridging incompatible." }
    },
    "Litecoin": {
        "Bitcoin": { status: "Compatible", detail: "Both use Proof of Work (PoW). Allows trustless atomic swaps and light client relay validation." },
        "Litecoin": { status: "Compatible", detail: "Same protocol (PoW). Self-compatible." },
        "Ethereum": { status: "Incompatible", detail: "PoW vs PoS. Requires wrapper assets or validator-based bridge relays." },
        "Cardano": { status: "Incompatible", detail: "PoW vs PoS. Incompatible at consensus level. Bridging must rely on central wrapping services." },
        "Solana": { status: "Incompatible", detail: "PoW vs PoH+PoS. Requires multi-sig oracle bridges to verify cross-chain transactions." },
        "BNB Chain": { status: "Incompatible", detail: "PoW vs PoA. Incompatible at protocol level. Interoperability requires trusted bridge pools." },
        "Stellar": { status: "Incompatible", detail: "PoW vs FBA. Requires multi-signature anchors to bridge assets between Litecoin and Stellar." },
        "Arbitrum": { status: "Incompatible", detail: "PoW vs L2 Rollup. Litecoin lacks smart contracts to verify rollup fraud proofs natively." }
    },
    "Ethereum": {
        "Bitcoin": { status: "Incompatible", detail: "PoS vs PoW. Bridging requires wrapped assets (e.g. WBTC) verified by custodian nodes." },
        "Litecoin": { status: "Incompatible", detail: "PoS vs PoW. Bridging requires collateralized wrapper vaults." },
        "Ethereum": { status: "Compatible", detail: "Same protocol (PoS). Self-compatible." },
        "Cardano": { status: "Compatible", detail: "Both use Proof of Stake (PoS). Can construct trustless light client bridges (like Mithril) to check validator signatures." },
        "Solana": { status: "Incompatible", detail: "PoS vs PoH+PoS. Different clock finalities; bridged via multi-sig networks or ZK state proof relays." },
        "BNB Chain": { status: "Compatible", detail: "Both use Staking/Authority consensus with EVM support. Interoperability is highly compatible via trustless state relays." },
        "Stellar": { status: "Incompatible", detail: "PoS vs FBA. Requires trusted institutional portals or anchors to bridge assets." },
        "Arbitrum": { status: "Compatible", detail: "Native Layer 1 to Layer 2 relation. Arbitrum posts transaction state batches directly to Ethereum's PoS consensus." }
    },
    "Cardano": {
        "Bitcoin": { status: "Incompatible", detail: "PoS vs PoW. Direct bridging is impossible without wrapped or federated assets." },
        "Litecoin": { status: "Incompatible", detail: "PoS vs PoW. Requires federated bridge multi-signatures." },
        "Ethereum": { status: "Compatible", detail: "Both use Proof of Stake (PoS). Validator signatures can be read to build decentralized bridges." },
        "Cardano": { status: "Compatible", detail: "Same protocol (PoS). Self-compatible." },
        "Solana": { status: "Incompatible", detail: "PoS vs PoH+PoS. Requires cross-chain oracle nodes to relay state data." },
        "BNB Chain": { status: "Compatible", detail: "PoSA vs PoS. Staking architectures align; requires relayers to map Cardano's UTXO and BNB's Account models." },
        "Stellar": { status: "Incompatible", detail: "PoS vs FBA. Requires external bridge portals." },
        "Arbitrum": { status: "Incompatible", detail: "Cardano (PoS L1) cannot natively read Arbitrum's Ethereum L2 optimistic rollup batches." }
    },
    "Solana": {
        "Bitcoin": { status: "Incompatible", detail: "PoH+PoS vs PoW. Direct bridging requires custodian wrappers (e.g. tBTC)." },
        "Litecoin": { status: "Incompatible", detail: "PoH+PoS vs PoW. Bridging is routed via tokenized wrappers." },
        "Ethereum": { status: "Incompatible", detail: "PoH+PoS vs PoS. Bridged via decentralized oracle clusters (e.g. Wormhole) or zk-SNARK state proof verifiers." },
        "Cardano": { status: "Incompatible", detail: "PoH+PoS vs PoS. Requires external relayers to verify and sign cross-chain transactions." },
        "Solana": { status: "Compatible", detail: "Same protocol (PoH+PoS). Self-compatible." },
        "BNB Chain": { status: "Incompatible", detail: "PoH+PoS vs PoA/PoSA. Different execution times; bridged via validator consensus relays." },
        "Stellar": { status: "Incompatible", detail: "PoH+PoS vs FBA. Requires centralized or federated gateways to bridge assets." },
        "Arbitrum": { status: "Incompatible", detail: "Requires L1 Ethereum bridge as an intermediary to connect Solana to Arbitrum L2 rollup." }
    },
    "BNB Chain": {
        "Bitcoin": { status: "Incompatible", detail: "PoA vs PoW. Requires centralized or federated custodian wrapping." },
        "Litecoin": { status: "Incompatible", detail: "PoA vs PoW. Assets must be bridged through custodian pools." },
        "Ethereum": { status: "Compatible", detail: "Both use validator-based consensus (PoS/PoSA) and EVM, allowing clean smart contract relay bridges." },
        "Cardano": { status: "Compatible", detail: "PoSA vs PoS. Staking frameworks enable cross-chain validation contracts." },
        "Solana": { status: "Incompatible", detail: "PoA vs PoH+PoS. Requires multi-signature validator bridge nodes." },
        "BNB Chain": { status: "Compatible", detail: "Same protocol (PoA/PoSA). Self-compatible." },
        "Stellar": { status: "Incompatible", detail: "PoA vs FBA. Requires anchor networks or third-party wrappers." },
        "Arbitrum": { status: "Compatible", detail: "Both run EVM architectures, enabling smooth token bridges (via liquidity pool relays like Stargate)." }
    },
    "Stellar": {
        "Bitcoin": { status: "Incompatible", detail: "FBA vs PoW. Stellar uses native 'Anchors' (vetted gateways) to lock BTC and issue wrapped assets on Stellar." },
        "Litecoin": { status: "Incompatible", detail: "FBA vs PoW. Utilizes institutional gateways/anchors." },
        "Ethereum": { status: "Incompatible", detail: "FBA vs PoS. Interoperable via Stellar's smart contracts (Soroban) or multi-sig portals." },
        "Cardano": { status: "Incompatible", detail: "FBA vs PoS. Requires specialized bridge validators." },
        "Solana": { status: "Incompatible", detail: "FBA vs PoH+PoS. Bridged via federated node integrations." },
        "BNB Chain": { status: "Incompatible", detail: "FBA vs PoA. Requires institutional anchors to bridge tokens." },
        "Stellar": { status: "Compatible", detail: "Same protocol (FBA). Self-compatible." },
        "Arbitrum": { status: "Incompatible", detail: "FBA vs L2 Rollup. Incompatible at protocol level; requires bridging to L1 Ethereum first." }
    },
    "Arbitrum": {
        "Bitcoin": { status: "Incompatible", detail: "L2 Rollup vs PoW. Requires bridging through Ethereum L1 or centralized wrapping hubs." },
        "Litecoin": { status: "Incompatible", detail: "L2 Rollup vs PoW. Incompatible natively." },
        "Ethereum": { status: "Compatible", detail: "Native Layer 1 to Layer 2 relationship. Arbitrum settles directly to Ethereum's consensus." },
        "Cardano": { status: "Incompatible", detail: "Arbitrum is an Ethereum L2 and cannot settle or bridge natively to Cardano's PoS." },
        "Solana": { status: "Incompatible", detail: "Requires L1 bridge relays or cross-chain messaging routers." },
        "BNB Chain": { status: "Compatible", detail: "Both share EVM foundations, enabling highly efficient bridge contracts." },
        "Stellar": { status: "Incompatible", detail: "Incompatible at consensus level. Must route assets through L1 gateways." },
        "Arbitrum": { status: "Compatible", detail: "Same protocol (L2 Rollup). Self-compatible." }
    }
};

// ==========================================================================
// 2. APPLICATION STATE
// ==========================================================================
let activeAlgoId = "pow";
let simTimeoutId = null;
let heroAnimFrame = null;
let consensusAnimFrame = null;

// Accent color map
const accentColors = {
    pow: { hex: "#ff9f43", rgb: [255, 159, 67] },
    pos: { hex: "#1dd1a1", rgb: [29, 209, 161] },
    poh: { hex: "#a55eea", rgb: [165, 94, 234] },
    dpos: { hex: "#48dbfb", rgb: [72, 219, 251] },
    poa: { hex: "#ff6b6b", rgb: [255, 107, 107] },
    pbft: { hex: "#00d2d3", rgb: [0, 210, 211] },
    pob: { hex: "#f368e0", rgb: [243, 104, 224] }
};

const animLabels = {
    pow: "⛏️ Mining Simulation",
    pos: "🪙 Validator Staking",
    poh: "⏱️ VDF Time Sequence",
    dpos: "🗳️ Delegate Voting",
    poa: "🔐 Authority Rotation",
    pbft: "🤝 Quorum Consensus",
    pob: "🔥 Token Burn Proof"
};

// ==========================================================================
// 3. DOM ELEMENTS
// ==========================================================================
const navTabs = document.querySelectorAll(".nav-tab");
const algoDescriptionEl = document.getElementById("algo-description");
const algoTaglineEl = document.getElementById("algo-tagline");
const timelineFlowEl = document.getElementById("timeline-flow");
const scoreScalabilityValEl = document.getElementById("score-scalability-val");
const scoreSecurityValEl = document.getElementById("score-security-val");
const scoreDecentralisationValEl = document.getElementById("score-decentralisation-val");
const fillScalabilityEl = document.getElementById("fill-scalability");
const fillSecurityEl = document.getElementById("fill-security");
const fillDecentralisationEl = document.getElementById("fill-decentralisation");
const specBlockTimeEl = document.getElementById("spec-blocktime");
const specTpsEl = document.getElementById("spec-tps");
const specNodesEl = document.getElementById("spec-nodes");
const specStakeEl = document.getElementById("spec-stake");
const mappingContainerEl = document.getElementById("mapping-container");
const matrixHeaderEl = document.querySelector("#compatibility-matrix thead");
const matrixBodyEl = document.getElementById("compatibility-matrix-body");
const matrixInfoEl = document.getElementById("matrix-info");
const sliderAttackerPower = document.getElementById("slider-attacker-power");
const sliderNodes = document.getElementById("slider-nodes");
const valAttackerPower = document.getElementById("val-attacker-power");
const valNodes = document.getElementById("val-nodes");
const btnSybil = document.getElementById("btn-sybil-attack");
const btnTakeover = document.getElementById("btn-takeover-attack");
const simOutcomeText = document.getElementById("sim-outcome-text");
const simLogText = document.getElementById("sim-log-text");
const animLabelEl = document.getElementById("anim-label");

// ==========================================================================
// 4. INITIALIZATION
// ==========================================================================
function init() {
    bindEvents();
    setupScrollReveal();
    setupStickyNav();
    initHeroCanvas();
    initHowWorksCanvas();
    initConsensusCanvas();
    renderCompatibilityMatrix();
    updateDashboard(activeAlgoId);
}

// ==========================================================================
// 5. EVENT BINDINGS
// ==========================================================================
function bindEvents() {
    navTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            navTabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-pressed", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-pressed", "true");
            activeAlgoId = tab.getAttribute("data-algo");
            updateDashboard(activeAlgoId);
        });
    });

    sliderAttackerPower.addEventListener("input", (e) => {
        valAttackerPower.textContent = `${e.target.value}%`;
    });
    sliderNodes.addEventListener("input", (e) => {
        valNodes.textContent = `${Number(e.target.value).toLocaleString()} nodes`;
    });
    btnSybil.addEventListener("click", () => runAttackSimulation("sybil"));
    btnTakeover.addEventListener("click", () => runAttackSimulation("takeover"));
}

// ==========================================================================
// 6. SCROLL REVEAL (IntersectionObserver)
// ==========================================================================
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
}

// ==========================================================================
// 7. STICKY NAV SCROLL STATE
// ==========================================================================
function setupStickyNav() {
    const nav = document.getElementById("algo-nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }, { passive: true });
}

// ==========================================================================
// 8. HERO CANVAS — Floating Blockchain Network
// ==========================================================================
function initHeroCanvas() {
    const canvas = document.getElementById("hero-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 150;

    function resize() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2.5 + 1.5,
            bright: Math.random()
        });
    }

    function drawHero() {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        // Move particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            p.bright += (Math.random() - 0.5) * 0.02;
            p.bright = Math.max(0.3, Math.min(1, p.bright));
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 254, ${p.bright * 0.6})`;
            ctx.fill();
            // Glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            const grad = ctx.createRadialGradient(p.x, p.y, p.r * 0.5, p.x, p.y, p.r * 3);
            grad.addColorStop(0, `rgba(0, 242, 254, ${p.bright * 0.15})`);
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.fill();
        });

        heroAnimFrame = requestAnimationFrame(drawHero);
    }

    drawHero();
}

// ==========================================================================
// 8b. GENERAL CONSENSUS "HOW IT WORKS" INTERACTIVE ANIMATION
// ==========================================================================
let howWorksState = {
    canvas: null,
    ctx: null,
    time: 0,
    currentPhase: 0,
    phaseTime: 0,
    phaseDuration: 240, // 4 seconds at 60fps
    particles: [],
    nodes: [],
    clientNode: { x: 0, y: 0, radius: 18, pulse: 0 }
};

function initHowWorksCanvas() {
    const canvas = document.getElementById("how-works-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        setupHowWorksNodes(canvas.offsetWidth, canvas.offsetHeight);
    }
    
    resize();
    window.addEventListener("resize", resize);
    
    howWorksState.canvas = canvas;
    howWorksState.ctx = ctx;
    howWorksState.time = 0;
    howWorksState.currentPhase = 0;
    howWorksState.phaseTime = 0;
    howWorksState.particles = [];
    
    bindHowWorksEvents();
    runHowWorksAnimation();
}

function setupHowWorksNodes(w, h) {
    const cx = w / 2;
    const cy = h / 2 - 30;
    const r = Math.min(w, h) * 0.28;
    
    howWorksState.nodes = [];
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
        howWorksState.nodes.push({
            id: i,
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle),
            radius: 20,
            pulse: 0,
            isProposer: i === 0,
            hasBlock: false,
            verified: false
        });
    }
    
    howWorksState.clientNode = {
        x: w / 2,
        y: h - 60,
        radius: 18,
        pulse: 0
    };
}

function bindHowWorksEvents() {
    const steps = document.querySelectorAll(".how-step");
    steps.forEach(step => {
        step.addEventListener("click", () => {
            const stepIdx = parseInt(step.getAttribute("data-step"));
            if (!isNaN(stepIdx)) {
                howWorksState.currentPhase = stepIdx;
                howWorksState.phaseTime = 0;
                howWorksState.particles = [];
                howWorksState.nodes.forEach(n => {
                    n.hasBlock = false;
                    n.verified = false;
                });
                updateUIHowWorksStep(stepIdx);
            }
        });
    });
}

function updateUIHowWorksStep(stepIndex) {
    const steps = document.querySelectorAll(".how-step");
    steps.forEach((step, idx) => {
        if (idx === stepIndex) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });

    const statusText = document.getElementById("anim-status-text");
    const statusDot = document.getElementById("anim-status-dot");
    if (statusText) {
        switch (stepIndex) {
            case 0:
                statusText.textContent = "Broadcasting Transactions to Network...";
                if (statusDot) statusDot.style.background = "var(--color-scalability)";
                break;
            case 1:
                statusText.textContent = "Validator Proposing New Block...";
                if (statusDot) statusDot.style.background = "#ffb000";
                break;
            case 2:
                statusText.textContent = "Nodes Verifying & Voting on Block...";
                if (statusDot) statusDot.style.background = "var(--color-decentralisation)";
                break;
            case 3:
                statusText.textContent = "Consensus Achieved! Block Committed.";
                if (statusDot) statusDot.style.background = "var(--color-security)";
                break;
        }
    }
}

function runHowWorksAnimation() {
    let animFrame;
    function loop() {
        const { canvas, ctx } = howWorksState;
        if (!canvas) return;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        howWorksState.time++;
        howWorksState.phaseTime++;

        if (howWorksState.phaseTime >= howWorksState.phaseDuration) {
            howWorksState.currentPhase = (howWorksState.currentPhase + 1) % 4;
            howWorksState.phaseTime = 0;
            howWorksState.particles = [];
            howWorksState.nodes.forEach(n => {
                n.hasBlock = false;
                n.verified = false;
            });
            updateUIHowWorksStep(howWorksState.currentPhase);
        }

        drawNetworkConnections(ctx);

        switch (howWorksState.currentPhase) {
            case 0:
                drawPhase0Broadcast(ctx, w, h);
                break;
            case 1:
                drawPhase1Proposal(ctx, w, h);
                break;
            case 2:
                drawPhase2Validation(ctx, w, h);
                break;
            case 3:
                drawPhase3Commit(ctx, w, h);
                break;
        }

        drawNodes(ctx);

        animFrame = requestAnimationFrame(loop);
    }
    loop();
}

function drawNetworkConnections(ctx) {
    ctx.strokeStyle = "rgba(0, 242, 254, 0.08)";
    ctx.lineWidth = 1;
    const nodes = howWorksState.nodes;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
        }
    }
    
    const client = howWorksState.clientNode;
    ctx.strokeStyle = "rgba(0, 242, 254, 0.04)";
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.moveTo(client.x, client.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
    });
}

function drawNodes(ctx) {
    const nodes = howWorksState.nodes;
    const client = howWorksState.clientNode;
    
    // Draw Client
    client.pulse += 0.03;
    const clientPulseRadius = client.radius + Math.sin(client.pulse) * 4;
    ctx.beginPath();
    ctx.arc(client.x, client.y, clientPulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 242, 254, 0.08)";
    ctx.strokeStyle = "rgba(0, 242, 254, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(client.x, client.y, client.radius - 4, 0, Math.PI * 2);
    ctx.fillStyle = "#050811";
    ctx.strokeStyle = "#00f2fe";
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();
    
    ctx.font = "bold 9px system-ui, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("WALLET", client.x, client.y);
    
    // Draw Validators
    nodes.forEach((node, idx) => {
        node.pulse += 0.02;
        
        const isProposer = node.isProposer && howWorksState.currentPhase === 1;
        const isValidating = howWorksState.currentPhase === 2;
        const isCommitting = howWorksState.currentPhase === 3;
        
        let ringColor = "rgba(255, 255, 255, 0.04)";
        let bodyBorderColor = "rgba(255, 255, 255, 0.2)";
        let glowColor = "transparent";
        let glowBlur = 0;
        
        if (isProposer) {
            ringColor = "rgba(255, 176, 0, 0.12)";
            bodyBorderColor = "#ffb000";
            glowColor = "rgba(255, 176, 0, 0.35)";
            glowBlur = 8;
        } else if (isValidating) {
            if (node.verified) {
                ringColor = "rgba(5, 201, 140, 0.12)";
                bodyBorderColor = "#05c98c";
                glowColor = "rgba(5, 201, 140, 0.25)";
                glowBlur = 6;
            } else {
                ringColor = "rgba(0, 242, 254, 0.08)";
                bodyBorderColor = "#00f2fe";
            }
        } else if (isCommitting) {
            ringColor = "rgba(5, 201, 140, 0.18)";
            bodyBorderColor = "#05c98c";
            glowColor = "rgba(5, 201, 140, 0.35)";
            glowBlur = 10;
        }
        
        const pulseAmt = Math.sin(node.pulse) * 2;
        const pulseRad = node.radius + (isProposer || isCommitting ? pulseAmt + 2 : 0);
        
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRad, 0, Math.PI * 2);
        ctx.fillStyle = ringColor;
        ctx.strokeStyle = bodyBorderColor;
        ctx.lineWidth = isProposer || isCommitting ? 2 : 1.5;
        ctx.fill();
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 4, 0, Math.PI * 2);
        ctx.fillStyle = "#0c1424";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
        
        ctx.font = "bold 9px system-ui, sans-serif";
        ctx.fillStyle = isProposer ? "#ffb000" : "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`Node ${idx + 1}`, node.x, node.y);
        
        if (isCommitting) {
            drawLocalBlockchain(ctx, node);
        }
    });
}

function drawLocalBlockchain(ctx, node) {
    const size = 6;
    const gap = 3;
    const startX = node.x - (size * 3 + gap * 2) / 2;
    const startY = node.y + 20;
    
    for (let i = 0; i < 3; i++) {
        const bx = startX + i * (size + gap);
        const by = startY;
        const isNew = i === 2;
        
        ctx.fillStyle = isNew ? "#05c98c" : "rgba(255,255,255,0.15)";
        ctx.strokeStyle = isNew ? "#05c98c" : "rgba(255,255,255,0.3)";
        ctx.lineWidth = 0.8;
        
        ctx.beginPath();
        ctx.roundRect(bx, by, size, size, 1.5);
        ctx.fill();
        ctx.stroke();
        
        if (i > 0) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.moveTo(bx, by + size/2);
            ctx.lineTo(bx - gap, by + size/2);
            ctx.stroke();
        }
    }
}

function drawPhase0Broadcast(ctx, w, h) {
    const client = howWorksState.clientNode;
    const nodes = howWorksState.nodes;
    const phaseTime = howWorksState.phaseTime;
    
    if (phaseTime % 15 === 0 && phaseTime < 160) {
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        howWorksState.particles.push({
            type: "tx",
            x: client.x,
            y: client.y,
            startX: client.x,
            startY: client.y,
            endX: targetNode.x,
            endY: targetNode.y,
            progress: 0,
            speed: 0.025,
            targetNode: targetNode
        });
    }
    
    for (let i = howWorksState.particles.length - 1; i >= 0; i--) {
        const p = howWorksState.particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
            p.targetNode.pulse = 0;
            howWorksState.particles.splice(i, 1);
            continue;
        }
        
        const px = p.startX + (p.endX - p.startX) * p.progress;
        const py = p.startY + (p.endY - p.startY) * p.progress;
        
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00f2fe";
        ctx.shadowColor = "#00f2fe";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function drawPhase1Proposal(ctx, w, h) {
    const nodes = howWorksState.nodes;
    const proposer = nodes[0];
    const phaseTime = howWorksState.phaseTime;
    
    if (phaseTime < 50) {
        const progress = phaseTime / 50;
        ctx.strokeStyle = "#ffb000";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#ffb000";
        ctx.shadowBlur = 6;
        
        ctx.beginPath();
        const rectSize = 12 * progress;
        ctx.roundRect(proposer.x - rectSize/2, proposer.y - 28, rectSize, rectSize, 2);
        ctx.stroke();
        
        ctx.fillStyle = "rgba(255, 176, 0, 0.15)";
        ctx.fill();
        ctx.shadowBlur = 0;
    } else {
        if (phaseTime === 50) {
            for (let i = 1; i < nodes.length; i++) {
                howWorksState.particles.push({
                    type: "block",
                    x: proposer.x,
                    y: proposer.y - 22,
                    startX: proposer.x,
                    startY: proposer.y - 22,
                    endX: nodes[i].x,
                    endY: nodes[i].y,
                    progress: 0,
                    speed: 0.025,
                    targetNode: nodes[i]
                });
            }
        }
        
        ctx.fillStyle = "rgba(255, 176, 0, 0.25)";
        ctx.strokeStyle = "#ffb000";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(proposer.x - 6, proposer.y - 34, 12, 12, 2.5);
        ctx.fill();
        ctx.stroke();
        
        for (let i = howWorksState.particles.length - 1; i >= 0; i--) {
            const p = howWorksState.particles[i];
            p.progress += p.speed;
            if (p.progress >= 1) {
                p.targetNode.hasBlock = true;
                p.targetNode.pulse = 0;
                howWorksState.particles.splice(i, 1);
                continue;
            }
            
            const px = p.startX + (p.endX - p.startX) * p.progress;
            const py = p.startY + (p.endY - p.startY) * p.progress;
            
            ctx.fillStyle = "rgba(255, 176, 0, 0.3)";
            ctx.strokeStyle = "#ffb000";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(px - 4, py - 4, 8, 8, 1.5);
            ctx.fill();
            ctx.stroke();
        }
        
        nodes.forEach(node => {
            if (node.hasBlock && node !== proposer) {
                ctx.fillStyle = "rgba(255, 176, 0, 0.15)";
                ctx.strokeStyle = "rgba(255, 176, 0, 0.5)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(node.x - 4, node.y - 22, 8, 8, 1.5);
                ctx.fill();
                ctx.stroke();
            }
        });
    }
}

function drawPhase2Validation(ctx, w, h) {
    const nodes = howWorksState.nodes;
    const phaseTime = howWorksState.phaseTime;
    
    nodes.forEach((node, idx) => {
        const verifyStart = idx * 12;
        const verifiedAt = verifyStart + 35;
        
        if (phaseTime > verifyStart && phaseTime < verifiedAt) {
            ctx.strokeStyle = "#00f2fe";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            const startAngle = (phaseTime * 0.12) % (2 * Math.PI);
            ctx.arc(node.x, node.y, node.radius + 5, startAngle, startAngle + Math.PI * 0.6);
            ctx.stroke();
        } else if (phaseTime >= verifiedAt) {
            node.verified = true;
            ctx.fillStyle = "#05c98c";
            ctx.font = "bold 9px system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("✓", node.x + 15, node.y - 10);
        }
    });
    
    if (phaseTime === 50) {
        for (let i = 0; i < nodes.length; i++) {
            const nextNode = nodes[(i + 1) % nodes.length];
            const prevNode = nodes[(i - 1 + nodes.length) % nodes.length];
            
            howWorksState.particles.push({
                type: "vote",
                startX: nodes[i].x,
                startY: nodes[i].y,
                endX: nextNode.x,
                endY: nextNode.y,
                progress: 0,
                speed: 0.03
            });
            howWorksState.particles.push({
                type: "vote",
                startX: nodes[i].x,
                startY: nodes[i].y,
                endX: prevNode.x,
                endY: prevNode.y,
                progress: 0,
                speed: 0.03
            });
        }
    }
    
    for (let i = howWorksState.particles.length - 1; i >= 0; i--) {
        const p = howWorksState.particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
            howWorksState.particles.splice(i, 1);
            continue;
        }
        
        const px = p.startX + (p.endX - p.startX) * p.progress;
        const py = p.startY + (p.endY - p.startY) * p.progress;
        
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#05c98c";
        ctx.shadowColor = "#05c98c";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function drawPhase3Commit(ctx, w, h) {
    const phaseTime = howWorksState.phaseTime;
    const cx = w / 2;
    const cy = h / 2 - 30;
    
    if (phaseTime < 180) {
        ctx.fillStyle = "rgba(5, 201, 140, " + Math.max(0, Math.min(0.85, (120 - phaseTime) / 30)) + ")";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CONSENSUS ACHIEVED", cx, cy);
    }
}

// ==========================================================================
// 9. CONSENSUS MIMICKING CANVAS ANIMATIONS
// ==========================================================================
let consensusState = {};

function initConsensusCanvas() {
    const canvas = document.getElementById("consensus-canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    consensusState = { canvas, ctx, time: 0 };
    runConsensusAnimation();
}

function runConsensusAnimation() {
    if (consensusAnimFrame) cancelAnimationFrame(consensusAnimFrame);
    consensusState.time = 0;

    function loop() {
        const { canvas, ctx } = consensusState;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        consensusState.time++;

        const color = accentColors[activeAlgoId];
        switch (activeAlgoId) {
            case "pow": drawPoWAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
            case "pos": drawPoSAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
            case "poh": drawPoHAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
            case "dpos": drawDPoSAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
            case "poa": drawPoAAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
            case "pbft": drawPBFTAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
            case "pob": drawPoBAnimation(ctx, w, h, color, currentFlowStep, consensusState.time); break;
        }

        // ---- Draw step indicator overlay on canvas ----
        const algo = algorithmsData[activeAlgoId];
        if (algo && algo.steps) {
            const totalSteps = algo.steps.length;
            const currentStep = algo.steps[currentFlowStep];
            const stepTitle = currentStep ? currentStep.title : "";

            // Step badge (top-left)
            ctx.save();
            ctx.textAlign = "left";
            const badgeX = 12, badgeY = 14;
            const badgeText = `STEP ${currentFlowStep + 1} / ${totalSteps}`;
            ctx.font = "bold 10px 'Fira Code', monospace";
            const badgeW = ctx.measureText(badgeText).width + 16;
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, badgeW, 22, 5);
            ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.2)`;
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.6)`;
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = color.hex;
            ctx.fillText(badgeText, badgeX + 8, badgeY + 15);
            ctx.restore();

            // Step title (top-left, below badge)
            ctx.save();
            ctx.textAlign = "left";
            ctx.font = "600 11px 'Outfit', sans-serif";
            ctx.fillStyle = "rgba(255,255,255,0.75)";
            ctx.fillText(stepTitle, 14, 52);
            ctx.restore();

            // Step progress dots (top-right)
            ctx.save();
            const dotRadius = 5;
            const dotGap = 14;
            const dotsStartX = w - (totalSteps * dotGap) - 8;
            const dotsY = 25;
            for (let i = 0; i < totalSteps; i++) {
                const dx = dotsStartX + i * dotGap;
                ctx.beginPath();
                ctx.arc(dx, dotsY, dotRadius, 0, Math.PI * 2);
                if (i === currentFlowStep) {
                    ctx.fillStyle = color.hex;
                    ctx.shadowColor = color.hex;
                    ctx.shadowBlur = 8;
                } else if (i < currentFlowStep) {
                    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.5)`;
                    ctx.shadowBlur = 0;
                } else {
                    ctx.fillStyle = "rgba(255,255,255,0.12)";
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            }
            ctx.restore();
        }

        consensusAnimFrame = requestAnimationFrame(loop);
    }
    loop();
}

// ---- PoW: Mining Hash Animation ----
function drawPoWAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 20;

    // Blockchain display at the bottom
    const blockW = 50, blockH = 32, gap = 10;
    const chainY = h - 50;
    const blocksCount = Math.floor(w / (blockW + gap));
    const shiftSpeed = (step === 4) ? 1.0 : 0;
    const chainOffset = (t * shiftSpeed) % (blockW + gap);

    for (let i = -1; i < blocksCount + 1; i++) {
        const bx = i * (blockW + gap) - chainOffset;
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.15)`;
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.4)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx, chainY, blockW, blockH, 5);
        ctx.fill();
        ctx.stroke();
        if (i > -1) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.25)`;
            ctx.moveTo(bx, chainY + blockH / 2);
            ctx.lineTo(bx - gap, chainY + blockH / 2);
            ctx.stroke();
        }
    }

    if (step === 0) {
        // Step 1: Transaction Broadcast
        ctx.beginPath();
        ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.3)`;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
        
        ctx.font = "bold 9px Fira Code";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("MEMPOOL", cx, cy + 3);

        // Particle transactions flying in
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + (t * 0.01);
            const r = 90 - ((t + i * 20) % 60);
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = color.hex;
            ctx.fill();
        }
        
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Transactions Broadcasted to Mempool", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Puzzle Competition
        const fontSize = 10;
        ctx.font = `${fontSize}px 'Fira Code', monospace`;
        ctx.textAlign = "left";
        const cols = 4, rows = 5;
        const cellW = w / cols, cellH = 24;
        const startY = 30;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const hash = randomHex(8);
                ctx.fillStyle = `rgba(255,255,255, ${0.12 + Math.random() * 0.15})`;
                ctx.fillText("0x" + hash, c * cellW + 15, startY + r * cellH);
            }
        }
        
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Miners Racing (Hashing Nonces...)", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Block Broadcast
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.3)`;
        ctx.strokeStyle = color.hex;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 9px Fira Code";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("WINNER", cx, cy + 3);

        const maxR = 120;
        const pr = (t * 2.5) % maxR;
        ctx.beginPath();
        ctx.arc(cx, cy, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${1 - pr / maxR})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("✨ Block Mined & Broadcasted!", cx, h - 15);

    } else if (step === 3) {
        // Step 4: Consensus Verification
        const nodes = 3;
        for (let i = 0; i < nodes; i++) {
            const nx = cx + (i - 1) * 80;
            const ny = cy;
            ctx.beginPath();
            ctx.arc(nx, ny, 20, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(5, 201, 140, 0.15)";
            ctx.strokeStyle = "#05c98c";
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 11px sans-serif";
            ctx.fillStyle = "#05c98c";
            ctx.textAlign = "center";
            ctx.fillText("✓", nx, ny + 4);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Nodes Verifying Signatures & TXs", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Reward & Confirmation
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 179, 0, 0.15)";
        ctx.strokeStyle = "#ffb300";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        const coinY = cy - 40 - Math.sin(t * 0.1) * 10;
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🪙 +6.25 BTC", cx, coinY);

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Block Confirmed! Reward Sent.", cx, h - 15);
    }
}

// ---- PoS: Validator Selection ----
function drawPoSAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 15;
    const validators = 6;
    const radius = Math.min(w, h) * 0.28;

    if (step === 0) {
        // Step 1: Collateral Registration
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.strokeStyle = color.hex;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        
        ctx.font = "bold 8px Fira Code";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("DEPOSIT", cx, cy - 2);
        ctx.fillText("VAULT", cx, cy + 8);

        for (let i = 0; i < validators; i++) {
            const angle = (i / validators) * Math.PI * 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.stroke();

            const progress = (t * 0.02 + i / validators) % 1;
            const cx_coin = x + (cx - x) * progress;
            const cy_coin = y + (cy - y) * progress;
            ctx.font = "9px sans-serif";
            ctx.fillText("🪙", cx_coin, cy_coin + 3);
        }
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Stakers Depositing Collateral (32 ETH)", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Proposer Selection
        const selectedIdx = Math.floor(t / 60) % validators;
        const spinProgress = (t % 60) / 60;
        
        for (let i = 0; i < validators; i++) {
            const angle = (i / validators) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isSelected = i === selectedIdx && spinProgress > 0.6;
            
            ctx.beginPath();
            ctx.arc(x, y, isSelected ? 15 : 10, 0, Math.PI * 2);
            ctx.fillStyle = isSelected ? `rgba(${color.rgb.join(",")}, 0.3)` : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isSelected ? color.hex : "rgba(255,255,255,0.15)";
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.fill();
            ctx.stroke();
            
            ctx.font = "bold 8px Fira Code";
            ctx.fillStyle = isSelected ? color.hex : "rgba(255,255,255,0.3)";
            ctx.fillText(`V${i + 1}`, x, y + 3);
        }

        const spinAngle = spinProgress * Math.PI * 4 + (selectedIdx / validators) * Math.PI * 2 - Math.PI / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(spinAngle);
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(radius * 0.4, 0);
        ctx.lineTo(0, 6);
        ctx.closePath();
        ctx.fillStyle = color.hex;
        ctx.fill();
        ctx.restore();

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText(spinProgress > 0.6 ? `Validator ${selectedIdx + 1} Selected Proposer!` : "Selecting Next Proposer...", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Attestation Phase
        const proposerIdx = 0;
        const px = cx + Math.cos(-Math.PI/2) * radius;
        const py = cy + Math.sin(-Math.PI/2) * radius;

        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.4)`;
        ctx.strokeStyle = color.hex;
        ctx.fill();
        ctx.stroke();

        for (let i = 1; i < validators; i++) {
            const angle = (i / validators) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.stroke();

            const progress = (t * 0.02) % 1.0;
            const vx = x + (px - x) * progress;
            const vy = y + (py - y) * progress;
            ctx.beginPath();
            ctx.arc(vx, vy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#05c98c";
            ctx.fill();
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Committee Voting (Attestation)", cx, h - 15);

    } else if (step === 3) {
        // Step 4: Consensus & Settlement
        ctx.beginPath();
        ctx.arc(cx, cy, 35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(5, 201, 140, 0.15)";
        ctx.strokeStyle = "#05c98c";
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "#05c98c";
        ctx.fillText("2/3+", cx, cy - 2);
        ctx.font = "bold 8px Fira Code";
        ctx.fillText("SUPERMAJORITY", cx, cy + 12);

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Block Justified & Finalized ✓", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Yield & Slashing
        for (let i = 0; i < validators; i++) {
            const angle = (i / validators) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isSlashed = i === 3;

            ctx.beginPath();
            ctx.arc(x, y, 11, 0, Math.PI * 2);
            ctx.fillStyle = isSlashed ? "rgba(255, 107, 107, 0.25)" : "rgba(5, 201, 140, 0.2)";
            ctx.strokeStyle = isSlashed ? "#ff6b6b" : "#05c98c";
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();

            ctx.font = "9px sans-serif";
            if (isSlashed) {
                ctx.fillStyle = "#ff6b6b";
                ctx.fillText("✗ Slashed", x, y + 22);
            } else {
                ctx.fillStyle = "#05c98c";
                ctx.fillText("+Yield", x, y + 22);
            }
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Rewards Distributed / Offenders Slashed", cx, h - 15);
    }
}

// ---- PoH: Sequential Hash Chain ----
function drawPoHAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 20;

    if (step === 0) {
        // Step 1: Sequential VDF Hashing
        ctx.beginPath();
        ctx.roundRect(cx - 30, cy - 30, 60, 60, 8);
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.strokeStyle = color.hex;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 10px Fira Code";
        ctx.fillStyle = color.hex;
        ctx.textAlign = "center";
        ctx.fillText("VDF", cx, cy - 10);
        ctx.fillText("CLOCK", cx, cy + 2);

        const hash = randomHex(4);
        ctx.font = "9px Fira Code";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(`0x${hash}`, cx, cy + 18);

        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.25)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const angle = (t * 0.1) % (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 38, cy + Math.sin(angle) * 38);
        ctx.strokeStyle = color.hex;
        ctx.stroke();

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Sequential Verifiable Delay Function (VDF)", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Transaction Timestamping
        const ticks = 5;
        const boxW = 45, boxH = 30, gap = 12;
        const startX = cx - (ticks * (boxW + gap) - gap) / 2;

        for (let i = 0; i < ticks; i++) {
            const bx = startX + i * (boxW + gap);
            ctx.beginPath();
            ctx.roundRect(bx, cy - 15, boxW, boxH, 4);
            ctx.fillStyle = "rgba(255,255,255,0.04)";
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.3)`;
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();

            ctx.font = "8px Fira Code";
            ctx.fillStyle = color.hex;
            ctx.textAlign = "center";
            ctx.fillText(`Hash ${i * 100}`, bx + boxW / 2, cy - 2);

            if (i < 3) {
                ctx.fillStyle = "#05c98c";
                ctx.fillText(`TX ${i + 1} ✓`, bx + boxW / 2, cy + 10);
            } else {
                ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
                ctx.fillText("empty", bx + boxW / 2, cy + 10);
            }
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Transactions Encoded into Hashing Sequence", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Pipelined Distribution
        ctx.beginPath();
        ctx.arc(cx - 100, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.25)`;
        ctx.strokeStyle = color.hex;
        ctx.fill();
        ctx.stroke();
        ctx.font = "bold 9px Fira Code";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("LEADER", cx - 100, cy + 3);

        const valCount = 3;
        for (let i = 0; i < valCount; i++) {
            const vy = cy - 40 + i * 40;
            ctx.beginPath();
            ctx.arc(cx + 80, vy, 12, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.stroke();

            const progress = (t * 0.02 + i / 3) % 1;
            const px = cx - 100 + 180 * progress;
            const py = cy + (vy - cy) * progress;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = color.hex;
            ctx.fill();
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Streaming Hashed Segments to Validators", cx, h - 15);

    } else if (step === 3) {
        // Step 4: Parallel Verification
        const gpus = 3;
        for (let i = 0; i < gpus; i++) {
            const gx = cx - 80 + i * 80;
            ctx.beginPath();
            ctx.roundRect(gx - 28, cy - 25, 56, 40, 5);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.2)`;
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 8px Fira Code";
            ctx.fillStyle = color.hex;
            ctx.textAlign = "center";
            ctx.fillText(`GPU Core ${i + 1}`, gx, cy - 10);

            const wProg = 40;
            const percent = ((t + i * 40) % 100) / 100;
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            ctx.fillRect(gx - wProg / 2, cy + 2, wProg, 5);
            ctx.fillStyle = "#05c98c";
            ctx.fillRect(gx - wProg / 2, cy + 2, wProg * percent, 5);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Validators Verifying Timestamps in Parallel", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Tower BFT Agreement
        ctx.beginPath();
        ctx.arc(cx, cy, 30, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(5, 201, 140, 0.2)";
        ctx.strokeStyle = "#05c98c";
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        ctx.font = "18px sans-serif";
        ctx.fillText("🔒", cx, cy + 6);

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Block Finalized via Tower BFT! (~400ms)", cx, h - 15);
    }
}

// ---- DPoS: Delegate Voting ----
function drawDPoSAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 15;
    const delegates = 5;
    const radius = Math.min(w, h) * 0.28;

    if (step === 0) {
        // Step 1: Continuous Voting
        for (let i = 0; i < delegates; i++) {
            const angle = (i / delegates) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 14, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.stroke();
            
            ctx.font = "bold 8px Fira Code";
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.textAlign = "center";
            ctx.fillText(`D${i+1}`, x, y + 3);

            for (let j = 0; j < 3; j++) {
                const voterAngle = angle + (j - 1) * 0.3 + Math.PI;
                const vx = cx + Math.cos(voterAngle) * (radius * 1.3);
                const vy = cy + Math.sin(voterAngle) * (radius * 1.3);
                
                const progress = (t * 0.02 + j / 3) % 1;
                const fx = vx + (x - vx) * progress;
                const fy = vy + (y - vy) * progress;
                ctx.beginPath();
                ctx.arc(fx, fy, 2, 0, Math.PI * 2);
                ctx.fillStyle = color.hex;
                ctx.fill();
            }
        }
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Token Holders Voting for Representatives", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Representative Selection
        for (let i = 0; i < delegates; i++) {
            const angle = (i / delegates) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            
            const votes = [80, 50, 95, 40, 70][i];
            const barH = votes * 0.25;

            ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
            ctx.fillRect(x - 5, y - 25, 10, 20);
            ctx.fillStyle = color.hex;
            ctx.fillRect(x - 5, y - 5 - barH, 10, barH);

            ctx.beginPath();
            ctx.arc(x, y + 10, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 7px Fira Code";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(`D${i+1}`, x, y + 13);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Top Voted Delegates Selected as Block Producers", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Round-Robin Scheduling
        const activeIdx = Math.floor(t / 50) % delegates;
        for (let i = 0; i < delegates; i++) {
            const angle = (i / delegates) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isActive = i === activeIdx;

            ctx.beginPath();
            ctx.arc(x, y, isActive ? 16 : 10, 0, Math.PI * 2);
            ctx.fillStyle = isActive ? `rgba(${color.rgb.join(",")}, 0.3)` : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isActive ? color.hex : "rgba(255,255,255,0.15)";
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 8px Fira Code";
            ctx.fillStyle = isActive ? color.hex : "rgba(255,255,255,0.4)";
            ctx.textAlign = "center";
            ctx.fillText(`BP${i+1}`, x, y + 3);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText(`Active Producer: BP${activeIdx + 1} (Rotating Slots)`, cx, h - 15);

    } else if (step === 3) {
        // Step 4: Rapid Attestation
        const proposerIdx = 0;
        const px = cx + Math.cos(-Math.PI/2) * radius;
        const py = cy + Math.sin(-Math.PI/2) * radius;

        ctx.beginPath();
        ctx.arc(px, py, 15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.35)`;
        ctx.strokeStyle = color.hex;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 8px Fira Code";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("SIGN", px, py + 3);

        for (let i = 1; i < delegates; i++) {
            const angle = (i / delegates) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(5, 201, 140, 0.15)";
            ctx.strokeStyle = "#05c98c";
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 8px Fira Code";
            ctx.fillStyle = "#05c98c";
            ctx.fillText("CO", x, y + 3);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Delegates Rapidly Co-Signing Block (~2-3s)", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Democratic Demotion
        for (let i = 0; i < delegates; i++) {
            const angle = (i / delegates) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isOffline = i === 1;

            ctx.beginPath();
            ctx.arc(x, y, 11, 0, Math.PI * 2);
            ctx.fillStyle = isOffline ? "rgba(255, 107, 107, 0.25)" : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isOffline ? "#ff6b6b" : "rgba(255,255,255,0.2)";
            ctx.lineWidth = isOffline ? 2 : 1;
            ctx.fill();
            ctx.stroke();

            ctx.font = "9px sans-serif";
            if (isOffline) {
                ctx.fillStyle = "#ff6b6b";
                ctx.fillText("Offline", x, y + 22);
            } else {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillText(`BP${i+1}`, x, y + 22);
            }
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Offline Delegate Demoted and Replaced Automatically", cx, h - 15);
    }
}

// ---- PoA: Authority Rotation ----
function drawPoAAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 15;
    const authorities = 4;
    const radius = Math.min(w, h) * 0.28;

    if (step === 0) {
        // Step 1: Vetting & KYC Check
        ctx.beginPath();
        ctx.roundRect(cx - 30, cy - 35, 60, 50, 6);
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.strokeStyle = color.hex;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx - 15, cy - 10, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.2)`;
        ctx.strokeStyle = color.hex;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillRect(cx + 2, cy - 18, 20, 3);
        ctx.fillRect(cx + 2, cy - 10, 20, 3);
        ctx.fillRect(cx - 20, cy + 8, 40, 3);

        const scanY = cy - 35 + ((t * 0.8) % 50);
        ctx.beginPath();
        ctx.moveTo(cx - 30, scanY);
        ctx.lineTo(cx + 30, scanY);
        ctx.strokeStyle = "rgba(255, 107, 107, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Rigorous KYC & Identity Vetting", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Authority Whitelisting
        ctx.beginPath();
        ctx.roundRect(cx - 50, cy - 25, 100, 40, 5);
        ctx.fillStyle = "rgba(5, 201, 140, 0.1)";
        ctx.strokeStyle = "#05c98c";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 9px Fira Code";
        ctx.fillStyle = "#05c98c";
        ctx.textAlign = "center";
        ctx.fillText("WHITELIST DB", cx, cy - 8);
        ctx.font = "7px Fira Code";
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText("KEY added: 0x8a92... ✓", cx, cy + 8);

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Vetted Public Key Whitelisted by Council", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Block Generation
        const activeIdx = Math.floor(t / 50) % authorities;
        for (let i = 0; i < authorities; i++) {
            const angle = (i / authorities) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isActive = i === activeIdx;

            ctx.beginPath();
            ctx.arc(x, y, isActive ? 15 : 10, 0, Math.PI * 2);
            ctx.fillStyle = isActive ? `rgba(${color.rgb.join(",")}, 0.35)` : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isActive ? color.hex : "rgba(255,255,255,0.15)";
            ctx.lineWidth = isActive ? 2 : 1;
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 8px Fira Code";
            ctx.fillStyle = isActive ? color.hex : "rgba(255,255,255,0.4)";
            ctx.textAlign = "center";
            ctx.fillText(`A${i+1}`, x, y + 3);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText(`Validator A${activeIdx + 1} Signing Block (Scheduled Turn)`, cx, h - 15);

    } else if (step === 3) {
        // Step 4: Signature Verification
        ctx.beginPath();
        ctx.arc(cx, cy, 30, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(5, 201, 140, 0.15)";
        ctx.strokeStyle = "#05c98c";
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#05c98c";
        ctx.textAlign = "center";
        ctx.fillText("VALID SIGN", cx, cy + 4);

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Authorities Verify Proposer's Signature", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Council Revocation
        for (let i = 0; i < authorities; i++) {
            const angle = (i / authorities) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isRevoked = i === 2;

            ctx.beginPath();
            ctx.arc(x, y, 11, 0, Math.PI * 2);
            ctx.fillStyle = isRevoked ? "rgba(255, 107, 107, 0.25)" : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isRevoked ? "#ff6b6b" : "rgba(255,255,255,0.2)";
            ctx.lineWidth = isRevoked ? 2 : 1;
            ctx.fill();
            ctx.stroke();

            ctx.font = "9px sans-serif";
            if (isRevoked) {
                ctx.fillStyle = "#ff6b6b";
                ctx.fillText("REVOKED", x, y + 22);
            } else {
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fillText(`A${i+1}`, x, y + 22);
            }
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Governing Council Revokes Malicious Keys", cx, h - 15);
    }
}

// ---- PBFT: Federated Byzantine Agreement ----
function drawPBFTAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 15;
    const nodes = 4;
    const radius = Math.min(w, h) * 0.28;

    if (step === 0) {
        // Step 1: Trust Configuration
        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.2)`;
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.stroke();
            ctx.font = "bold 7px Fira Code";
            ctx.fillStyle = "#fff";
            ctx.fillText(`N${i+1}`, x, y + 3);
        }
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.textAlign = "center";
        ctx.fillText("Nodes Configured with Local Quorum Slices", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Nomination Phase
        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.stroke();

            const targetIdx = (i + 1) % nodes;
            const targetAngle = (targetIdx / nodes) * Math.PI * 2 - Math.PI / 2;
            const tx = cx + Math.cos(targetAngle) * radius;
            const ty = cy + Math.sin(targetAngle) * radius;

            const progress = (t * 0.02) % 1;
            const fx = x + (tx - x) * progress;
            const fy = y + (ty - y) * progress;
            ctx.beginPath();
            ctx.arc(fx, fy, 3, 0, Math.PI * 2);
            ctx.fillStyle = color.hex;
            ctx.fill();
        }
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Nodes Nominating Transaction Candidates", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Ballot Selection
        ctx.beginPath();
        ctx.arc(cx - 15, cy, 25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.3)`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + 15, cy, 25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.3)`;
        ctx.stroke();

        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = color.hex;
        ctx.textAlign = "center";
        ctx.fillText("Quorum Slice", cx - 25, cy - 30);
        ctx.fillText("Quorum Slice", cx + 25, cy - 30);

        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.35)`;
        ctx.strokeStyle = color.hex;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
        ctx.font = "bold 8px Fira Code";
        ctx.fillStyle = "#fff";
        ctx.fillText("BALLOT", cx, cy + 3);

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Ballot Prepared in Overlapping Quorums", cx, h - 15);

    } else if (step === 3) {
        // Step 4: Commit Phase
        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = color.hex;
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();

            for (let j = i + 1; j < nodes; j++) {
                const angle2 = (j / nodes) * Math.PI * 2 - Math.PI / 2;
                const x2 = cx + Math.cos(angle2) * radius;
                const y2 = cy + Math.sin(angle2) * radius;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${0.15 + Math.sin(t * 0.15) * 0.08})`;
                ctx.stroke();
            }
        }
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Commit Stage: Nodes Broadcasting Lock Signatures", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Final Externalization
        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(5, 201, 140, 0.25)";
            ctx.strokeStyle = "#05c98c";
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
            
            ctx.font = "bold 7px Fira Code";
            ctx.fillStyle = "#fff";
            ctx.fillText("LEDG", x, y + 3);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Ledger Updated Simultaneously (Instant Finality)", cx, h - 15);
    }
}

// ---- PoB: Token Burn Animation ----
function drawPoBAnimation(ctx, w, h, color, step, t) {
    const cx = w / 2, cy = h / 2 - 15;
    const radius = Math.min(w, h) * 0.28;
    const nodes = 4;

    if (step === 0) {
        // Step 1: Token Acquisition
        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.roundRect(x - 18, y - 12, 36, 24, 4);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.stroke();

            ctx.font = "bold 7px Fira Code";
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillText(`WL ${i+1}`, x, y - 2);

            const progress = (t * 0.02 + i / 4) % 1;
            ctx.font = "9px sans-serif";
            ctx.fillText("🪙", x, y - 25 + progress * 20);
        }
        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Validators Acquiring Native Tokens", cx, h - 15);

    } else if (step === 1) {
        // Step 2: Burn Transaction
        ctx.font = "24px sans-serif";
        ctx.fillText("🔥", cx, cy + 8);

        ctx.font = "7px Fira Code";
        ctx.fillStyle = "rgba(255, 107, 107, 0.7)";
        ctx.fillText("0x000...dead", cx, cy + 24);

        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.stroke();

            const progress = (t * 0.025 + i / 4) % 1;
            const cx_coin = x + (cx - x) * progress;
            const cy_coin = y + (cy - y) * progress;
            ctx.font = "9px sans-serif";
            ctx.fillText("🪙", cx_coin, cy_coin + 3);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Sending Tokens to Unspendable Burn Address", cx, h - 15);

    } else if (step === 2) {
        // Step 3: Virtual Mining Power
        ctx.font = "24px sans-serif";
        ctx.fillText("🔥", cx, cy + 8);

        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.25)`;
            ctx.strokeStyle = color.hex;
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();

            const power = [85, 40, 70, 50][i];
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillRect(x - 12, y + 16, 24, 4);
            ctx.fillStyle = color.hex;
            ctx.fillRect(x - 12, y + 16, 24 * (power / 100), 4);
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Burn Value Converted to Virtual Mining Power", cx, h - 15);

    } else if (step === 3) {
        // Step 4: Block Selection
        const selectedIdx = Math.floor(t / 60) % nodes;
        const spinProgress = (t % 60) / 60;

        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isSelected = i === selectedIdx && spinProgress > 0.6;

            ctx.beginPath();
            ctx.arc(x, y, isSelected ? 15 : 10, 0, Math.PI * 2);
            ctx.fillStyle = isSelected ? `rgba(${color.rgb.join(",")}, 0.3)` : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isSelected ? color.hex : "rgba(255,255,255,0.15)";
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.fill();
            ctx.stroke();
        }

        const spinAngle = spinProgress * Math.PI * 4 + (selectedIdx / nodes) * Math.PI * 2 - Math.PI / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(spinAngle);
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(radius * 0.4, 0);
        ctx.lineTo(0, 6);
        ctx.closePath();
        ctx.fillStyle = color.hex;
        ctx.fill();
        ctx.restore();

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText(spinProgress > 0.6 ? `Validator ${selectedIdx + 1} Selected!` : "Weighted Random Selection...", cx, h - 15);

    } else if (step === 4) {
        // Step 5: Reward & Decay
        for (let i = 0; i < nodes; i++) {
            const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const isWinner = i === 0;

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = isWinner ? "rgba(5, 201, 140, 0.2)" : "rgba(255,255,255,0.05)";
            ctx.strokeStyle = isWinner ? "#05c98c" : "rgba(255,255,255,0.15)";
            ctx.fill();
            ctx.stroke();

            if (isWinner) {
                ctx.font = "9px sans-serif";
                ctx.fillText("🪙+Reward", x, y - 18);
            } else {
                ctx.font = "7px Fira Code";
                ctx.fillStyle = "rgba(255, 107, 107, 0.5)";
                ctx.fillText("Decaying...", x, y - 18);
            }
        }

        ctx.font = "bold 12px Outfit";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.95)`;
        ctx.fillText("Block Minted! Burn Power Gradually Decays", cx, h - 15);
    }
}

// Helper
function randomHex(len) {
    let s = "";
    const chars = "0123456789abcdef";
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * 16)];
    return s;
}

// ==========================================================================
// 9b. TRANSACTION LIFECYCLE FLOW ANIMATION
// ==========================================================================
let flowInterval = null;
let currentFlowStep = 0;
let isFlowPlaying = true; // Auto-play by default!

function initFlowAnimation() {
    const playBtn = document.getElementById("btn-flow-play");
    const stepBtn = document.getElementById("btn-flow-step");
    const resetBtn = document.getElementById("btn-flow-reset");
    
    if (!playBtn) return;
    
    // Reset state
    stopFlowAnimation();
    currentFlowStep = 0;
    
    // Auto start play
    isFlowPlaying = true;
    playBtn.textContent = "⏸ Pause";
    
    updateFlowUI();
    startFlowInterval();
    
    // Bind listeners by cloning (to remove existing listeners)
    const newPlayBtn = playBtn.cloneNode(true);
    const newStepBtn = stepBtn.cloneNode(true);
    const newResetBtn = resetBtn.cloneNode(true);
    
    playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
    stepBtn.parentNode.replaceChild(newStepBtn, stepBtn);
    resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
    
    newPlayBtn.addEventListener("click", () => {
        if (isFlowPlaying) {
            stopFlowAnimation();
            newPlayBtn.textContent = "▶ Play";
        } else {
            isFlowPlaying = true;
            newPlayBtn.textContent = "⏸ Pause";
            startFlowInterval();
        }
    });
    
    newStepBtn.addEventListener("click", () => {
        stopFlowAnimation();
        newPlayBtn.textContent = "▶ Play";
        advanceFlowStep();
    });
    
    newResetBtn.addEventListener("click", () => {
        stopFlowAnimation();
        newPlayBtn.textContent = "▶ Play";
        currentFlowStep = 0;
        updateFlowUI();
    });
}

function startFlowInterval() {
    const steps = algorithmsData[activeAlgoId].steps;
    const duration = 3000; // 3 seconds per step
    
    flowInterval = setInterval(() => {
        advanceFlowStep();
    }, duration);
}

function stopFlowAnimation() {
    isFlowPlaying = false;
    if (flowInterval) {
        clearInterval(flowInterval);
        flowInterval = null;
    }
}

function advanceFlowStep() {
    const steps = algorithmsData[activeAlgoId].steps;
    currentFlowStep = (currentFlowStep + 1) % steps.length;
    updateFlowUI();
}

function updateFlowUI() {
    const steps = algorithmsData[activeAlgoId].steps;
    const stepEls = timelineFlowEl.querySelectorAll(".timeline-step");
    const progressFill = document.getElementById("flow-progress-fill");
    
    stepEls.forEach((el, idx) => {
        el.classList.remove("timeline-step-active", "timeline-step-done", "timeline-step-pending");
        if (idx === currentFlowStep) {
            el.classList.add("timeline-step-active");
            // Scroll the active step into view smoothly
            el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else if (idx < currentFlowStep) {
            el.classList.add("timeline-step-done");
        } else {
            el.classList.add("timeline-step-pending");
        }
    });
    
    if (progressFill) {
        const percent = ((currentFlowStep + 1) / steps.length) * 100;
        progressFill.style.width = `${percent}%`;
    }

    // Pulse the canvas border on step change
    const animContainer = document.querySelector(".anim-container");
    if (animContainer) {
        animContainer.classList.remove("step-pulse");
        // Force reflow to restart animation
        void animContainer.offsetWidth;
        animContainer.classList.add("step-pulse");
    }

    // Reset canvas time so new step animation starts fresh
    if (consensusState) {
        consensusState.time = 0;
    }
}

// ==========================================================================
// 10. UPDATE DASHBOARD
// ==========================================================================
function updateDashboard(algoId) {
    const algo = algorithmsData[algoId];
    if (!algo) return;

    // Update CSS accent
    const accentVar = `var(--accent-${algoId})`;
    document.documentElement.style.setProperty("--accent-theme", accentVar);

    // Update animation label
    animLabelEl.textContent = animLabels[algoId];

    // Restart consensus animation
    runConsensusAnimation();

    // Overview
    algoDescriptionEl.textContent = algo.description;
    algoTaglineEl.textContent = algo.tagline;

    // Timeline
    timelineFlowEl.innerHTML = "";
    algo.steps.forEach((step, idx) => {
        const stepEl = document.createElement("div");
        stepEl.className = "timeline-step";
        stepEl.style.animationDelay = `${idx * 0.12}s`;
        stepEl.innerHTML = `
            <div class="step-node"></div>
            <div class="step-content">
                <h4>Step ${idx + 1}: ${step.title}</h4>
                <p>${step.desc}</p>
            </div>
        `;
        timelineFlowEl.appendChild(stepEl);
    });

    // Trilemma
    updateRadarChart(algo.scores, algoId);
    updateScoreBars(algo.scores);
    specBlockTimeEl.textContent = algo.specs.blockTime;
    specTpsEl.textContent = algo.specs.tps;
    specNodesEl.textContent = algo.specs.nodes;
    specStakeEl.textContent = algo.specs.stake;

    // Mapping
    mappingContainerEl.innerHTML = "";
    algo.blockchains.forEach(chain => {
        const card = document.createElement("div");
        card.className = "blockchain-map-card";
        const langBadges = chain.languages.map(l => `<span class="language-badge">${l}</span>`).join(" ");
        card.innerHTML = `
            <div class="blockchain-card-header">
                <div class="blockchain-info">
                    <span class="blockchain-name">${chain.name}</span>
                    <span class="layer-badge ${chain.layerType === 'L1' ? 'badge-l1' : 'badge-l2'}">${chain.layer}</span>
                </div>
            </div>
            <p class="blockchain-rationale">${chain.rationale}</p>
            <div class="blockchain-meta-info">
                <span class="meta-label">Smart Contracts:</span>
                ${langBadges}
            </div>
        `;
        mappingContainerEl.appendChild(card);
    });

    // Matrix highlight
    highlightMatrixForAlgo(algo);

    // Extended feature panels (from features.js)
    if (typeof renderBlockAnatomy === 'function') renderBlockAnatomy(algoId);
    if (typeof renderConsensusPatterns === 'function') renderConsensusPatterns(algoId);
    if (typeof renderCurrencyDeepDive === 'function') renderCurrencyDeepDive(algoId);
    if (typeof renderLayerStack === 'function') renderLayerStack(algoId);
    
    // Initialize transaction lifecycle flow animation
    initFlowAnimation();

    resetSimulator();
}

// ==========================================================================
// 11. RADAR CHART
// ==========================================================================
function updateRadarChart(scores, algoId) {
    const radarShape = document.getElementById("radar-shape");
    const dotScale = document.getElementById("dot-scalability");
    const dotSec = document.getElementById("dot-security");
    const dotDec = document.getElementById("dot-decentralisation");

    const cx = 120, cy = 120;
    const rS = scores.scalability * 10;
    const rSec = scores.security * 10;
    const rD = scores.decentralisation * 10;

    const x1 = cx, y1 = cy - rS;
    const x2 = cx + rSec * 0.866, y2 = cy + rSec * 0.5;
    const x3 = cx - rD * 0.866, y3 = cy + rD * 0.5;

    radarShape.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);

    const c = accentColors[algoId];
    document.documentElement.style.setProperty("--accent-stroke", c.hex);
    document.documentElement.style.setProperty("--accent-area", `rgba(${c.rgb.join(",")}, 0.12)`);

    dotScale.setAttribute("cx", x1); dotScale.setAttribute("cy", y1);
    dotSec.setAttribute("cx", x2); dotSec.setAttribute("cy", y2);
    dotDec.setAttribute("cx", x3); dotDec.setAttribute("cy", y3);
}

function updateScoreBars(scores) {
    scoreScalabilityValEl.textContent = `${scores.scalability}/10`;
    scoreSecurityValEl.textContent = `${scores.security}/10`;
    scoreDecentralisationValEl.textContent = `${scores.decentralisation}/10`;
    fillScalabilityEl.style.width = `${scores.scalability * 10}%`;
    fillSecurityEl.style.width = `${scores.security * 10}%`;
    fillDecentralisationEl.style.width = `${scores.decentralisation * 10}%`;
}

// ==========================================================================
// 12. COMPATIBILITY MATRIX
// ==========================================================================
function renderCompatibilityMatrix() {
    let headHtml = `<tr><th class="corner-cell" aria-label="Compatibility grid corner"></th>`;
    blockchainsList.forEach(chain => {
        headHtml += `<th scope="col" id="col-header-${chain.replace(/\s+/g, '')}">${chain}</th>`;
    });
    headHtml += `</tr>`;
    matrixHeaderEl.innerHTML = headHtml;

    let bodyHtml = "";
    blockchainsList.forEach(rowChain => {
        bodyHtml += `<tr id="row-line-${rowChain.replace(/\s+/g, '')}">`;
        bodyHtml += `<th scope="row" class="matrix-header-y" id="row-header-${rowChain.replace(/\s+/g, '')}">${rowChain}</th>`;
        blockchainsList.forEach(colChain => {
            const match = compatibilityMap[rowChain][colChain];
            const isCompat = match.status === "Compatible";
            const cellClass = isCompat ? "cell-compat" : "cell-incompat";
            const content = isCompat ? "COMPAT" : "INCOMPAT";
            bodyHtml += `
                <td class="${cellClass}"
                    data-row="${rowChain}"
                    data-col="${colChain}"
                    tabindex="0"
                    role="gridcell"
                    aria-label="${rowChain} and ${colChain}: ${match.status}">
                    ${content}
                </td>`;
        });
        bodyHtml += `</tr>`;
    });
    matrixBodyEl.innerHTML = bodyHtml;

    const cells = matrixBodyEl.querySelectorAll("td");
    cells.forEach(cell => {
        const showDetails = () => {
            const row = cell.getAttribute("data-row");
            const col = cell.getAttribute("data-col");
            const data = compatibilityMap[row][col];
            const statusText = data.status === "Compatible" ? "🟢 Compatible" : "🔴 Incompatible";
            matrixInfoEl.innerHTML = `<span class="title">${row} & ${col} — ${statusText}</span>${data.detail}`;
        };
        cell.addEventListener("mouseenter", showDetails);
        cell.addEventListener("focus", showDetails);
        cell.addEventListener("mouseleave", () => restoreDefaultMatrixInfo());
        cell.addEventListener("blur", () => restoreDefaultMatrixInfo());
    });
}

function restoreDefaultMatrixInfo() {
    const algo = algorithmsData[activeAlgoId];
    const blockchains = algo.blockchains.map(b => b.name).join(", ");
    matrixInfoEl.innerHTML = `
        <span class="title">Active: ${algo.name} Compatibility</span>
        Highlighting ${algo.acronym} blockchains (${blockchains}). Hover cells to inspect bridging details.
    `;
}

function highlightMatrixForAlgo(algo) {
    const activeChainNames = algo.blockchains.map(b => b.name);
    const rows = matrixBodyEl.querySelectorAll("tr");
    const headersY = matrixBodyEl.querySelectorAll(".matrix-header-y");
    const headersX = matrixHeaderEl.querySelectorAll("th");
    const cells = matrixBodyEl.querySelectorAll("td");

    rows.forEach(r => r.classList.remove("active-row"));
    headersY.forEach(h => h.style.color = "");
    headersX.forEach(h => h.style.color = "");
    cells.forEach(c => {
        c.classList.remove("active-highlight");
        c.style.opacity = "0.5";
    });

    blockchainsList.forEach(chain => {
        if (activeChainNames.includes(chain)) {
            const xHead = document.getElementById(`col-header-${chain.replace(/\s+/g, '')}`);
            if (xHead) xHead.style.color = "var(--accent-theme)";
            const yHead = document.getElementById(`row-header-${chain.replace(/\s+/g, '')}`);
            if (yHead) {
                yHead.style.color = "var(--accent-theme)";
                yHead.parentElement.classList.add("active-row");
            }
        }
    });

    cells.forEach(cell => {
        const rowVal = cell.getAttribute("data-row");
        const colVal = cell.getAttribute("data-col");
        const rowActive = activeChainNames.includes(rowVal);
        const colActive = activeChainNames.includes(colVal);
        if (rowActive || colActive) {
            cell.style.opacity = "1.0";
            if (rowActive && colActive) cell.classList.add("active-highlight");
        }
    });
    restoreDefaultMatrixInfo();
}

// ==========================================================================
// 13. ATTACK SIMULATOR
// ==========================================================================
function resetSimulator() {
    if (simTimeoutId) clearTimeout(simTimeoutId);
    simOutcomeText.textContent = "System Idle. Ready for input.";
    simOutcomeText.className = "sim-outcome outcome-pending";
    simLogText.textContent = `Targeting: ${algorithmsData[activeAlgoId].name}\nSelect attack specifications to begin...`;
    btnSybil.disabled = false;
    btnTakeover.disabled = false;
}

function runAttackSimulation(attackType) {
    if (simTimeoutId) clearTimeout(simTimeoutId);
    btnSybil.disabled = true;
    btnTakeover.disabled = true;

    const attackerPower = parseInt(sliderAttackerPower.value, 10);
    const honestNodes = parseInt(sliderNodes.value, 10);
    const algoId = activeAlgoId;
    const algo = algorithmsData[algoId];

    simOutcomeText.textContent = "Simulating Attack...";
    simOutcomeText.className = "sim-outcome outcome-pending";
    simLogText.textContent = `[SYSTEM INIT] Connecting to validator mesh...\n`;

    let steps = [];

    if (attackType === "sybil") {
        steps.push(`[1/4] Spawning ${honestNodes.toLocaleString()} malicious Sybil identities...`);
        if (algoId === "pow") {
            steps.push(`[2/4] Sybils flooding peer mempools with transactions...`);
            steps.push(`[3/4] Honest miners verify SHA-256 hash puzzle target check.`);
            steps.push(`[4/4] Sybil count ignored. Nakamoto consensus allocates weight by hashrate.`);
            steps.push(`[RESULT] Attack Defeated. PoW relies on hardware work, not virtual node counts. Attacker holds only ${attackerPower}% of hash rate.`);
            steps.push("FAIL");
        } else if (algoId === "pos") {
            steps.push(`[2/4] Launching virtual validators without staking balance...`);
            steps.push(`[3/4] Staking Deposit Contract checks credentials. Sybil balance = 0 ETH.`);
            steps.push(`[4/4] Validator filter rejects attackers — minimum 32 ETH required.`);
            steps.push(`[RESULT] Attack Defeated. PoS requires physical capital backing.`);
            steps.push("FAIL");
        } else if (algoId === "poh") {
            steps.push(`[2/4] Flooding Solana gossip network with virtual validator IDs...`);
            steps.push(`[3/4] Leader checks timing slot alignment. Sybils lack VDF clock inputs.`);
            steps.push(`[4/4] Pipeline drops un-staked, out-of-sync nodes from Tower BFT voting.`);
            steps.push(`[RESULT] Attack Defeated. High-speed timing + PoS voting requirements filter Sybils.`);
            steps.push("FAIL");
        } else if (algoId === "dpos") {
            steps.push(`[2/4] Deploying Sybil nodes requesting scheduling slots...`);
            steps.push(`[3/4] Ledger checks delegation database. Slots filled by voter-backed nodes.`);
            steps.push(`[4/4] Attackers hold 0 delegation tokens. System bypasses un-voted nodes.`);
            steps.push(`[RESULT] Attack Defeated. DPoS locks proposals to top N delegates.`);
            steps.push("FAIL");
        } else if (algoId === "poa") {
            steps.push(`[2/4] Connecting Sybil nodes to authority networks...`);
            steps.push(`[3/4] Whitelist signature validation. Keys checked against certificate directory.`);
            steps.push(`[4/4] Vetting fails. Sybil keys missing from governing consortium.`);
            steps.push(`[RESULT] Attack Defeated. PoA permits only pre-vetted whitelisted addresses.`);
            steps.push("FAIL");
        } else if (algoId === "pbft") {
            steps.push(`[2/4] Deploying fake nodes querying for quorum inclusion...`);
            steps.push(`[3/4] Existing nodes examine Quorum Slices. Sybils excluded from trust configs.`);
            steps.push(`[4/4] Quorum slices closed to unknown actors. Zero consensus influence.`);
            steps.push(`[RESULT] Attack Defeated. FBA relies on peer-defined trust trees.`);
            steps.push("FAIL");
        } else if (algoId === "pob") {
            steps.push(`[2/4] Launching zero-cost Sybil nodes seeking block production...`);
            steps.push(`[3/4] Protocol checks on-chain burn history. Sybil addresses have 0 burns.`);
            steps.push(`[4/4] Virtual mining power = 0. Block selection probability = 0%.`);
            steps.push(`[RESULT] Attack Defeated. PoB requires irreversible token destruction.`);
            steps.push("FAIL");
        }
    } else {
        steps.push(`[1/4] Aggregating resources... Attacker commands ${attackerPower}% of consensus weight.`);
        if (algoId === "pow") {
            steps.push(`[2/4] Constructing private block series...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker hash power dominates. Private chain outpaces honest chain.`);
                steps.push(`[4/4] Shadow chain released. Longest-chain rule forces double-spend fork.`);
                steps.push(`[RESULT] Network Compromised! 51% hash takeover successful.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Honest network mining speed exceeds attacker capability.`);
                steps.push(`[4/4] Attacker blocks rejected. Canonical chain maintained.`);
                steps.push(`[RESULT] Attack Blocked. Insufficient hashrate.`);
                steps.push("FAIL");
            }
        } else if (algoId === "pos") {
            steps.push(`[2/4] Staking validator keys. Activating conflicting block proposals...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Absolute stake majority. Finalizing double-signed checkpoints.`);
                steps.push(`[4/4] Conflicting states validated. Double-spend finalized.`);
                steps.push(`[RESULT] Network Compromised! 51% stake takeover successful.`);
                steps.push("SUCCESS");
            } else if (attackerPower >= 33) {
                steps.push(`[3/4] Stake exceeds liveness safety bounds. Attestations stalled.`);
                steps.push(`[4/4] Engine fails to gather 66.7% supermajority. Blocks frozen.`);
                steps.push(`[RESULT] Liveness Halted. Settlement blocked, but no double-spend.`);
                steps.push("PARTIAL");
            } else {
                steps.push(`[3/4] >67% honest participation maintained. Malicious votes ignored.`);
                steps.push(`[4/4] Double-signing detected. Attacker ETH stakes slashed.`);
                steps.push(`[RESULT] Attack Blocked. Assets slashed. Integrity preserved.`);
                steps.push("FAIL");
            }
        } else if (algoId === "poh") {
            steps.push(`[2/4] Running VDF pipelines on Solana validators...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker controls leader schedules. Timestamps manipulated.`);
                steps.push(`[4/4] Leader nodes rewrite sequential entries. Censorship achieved.`);
                steps.push(`[RESULT] Network Compromised! 51% sequence + stake control.`);
                steps.push("SUCCESS");
            } else if (attackerPower >= 33) {
                steps.push(`[3/4] Tower BFT voting pool threshold check. Progress blocked.`);
                steps.push(`[4/4] Sub-second finality fails. Transaction confirmations freeze.`);
                steps.push(`[RESULT] Liveness Halted. Chain freezes, double-spend blocked.`);
                steps.push("PARTIAL");
            } else {
                steps.push(`[3/4] Tower BFT maintains high-speed validation.`);
                steps.push(`[4/4] Out-of-sync proposals dropped. Pipeline bypasses attacker.`);
                steps.push(`[RESULT] Attack Blocked. Minority attacker nodes dropped.`);
                steps.push("FAIL");
            }
        } else if (algoId === "dpos") {
            steps.push(`[2/4] Acquiring tokens to hijack delegate seats...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Voter manipulation. Majority Super Representatives captured.`);
                steps.push(`[4/4] Malicious reps collude for double-spend state changes.`);
                steps.push(`[RESULT] Network Compromised! Majority seats subverted.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Only minority delegates elected. Honest majority maintained.`);
                steps.push(`[4/4] Malicious block suggestions rejected by honest consensus.`);
                steps.push(`[RESULT] Attack Blocked. Voter delegation insufficient.`);
                steps.push("FAIL");
            }
        } else if (algoId === "poa") {
            steps.push(`[2/4] Compromising whitelisted authority keys...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker controls >50% authority keys.`);
                steps.push(`[4/4] Double-signature forks executed. Consortium trust breached.`);
                steps.push(`[RESULT] Network Compromised! Collusion takeover successful.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Honest nodes detect conflicting signatures.`);
                steps.push(`[4/4] Governance council rotates keys, revoking compromised nodes.`);
                steps.push(`[RESULT] Attack Blocked. Key rotation maintained operations.`);
                steps.push("FAIL");
            }
        } else if (algoId === "pbft") {
            steps.push(`[2/4] Compromising core institutional validators...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker dominates critical quorum intersections.`);
                steps.push(`[4/4] FBA validates duplicate ledger slots. Double-spend externalized.`);
                steps.push(`[RESULT] Network Compromised! Core institution takeover.`);
                steps.push("SUCCESS");
            } else if (attackerPower >= 33) {
                steps.push(`[3/4] Attacker nodes refuse to ballot-vote on transaction slots.`);
                steps.push(`[4/4] Quorum slices cannot align. Ledger halts to prevent forks.`);
                steps.push(`[RESULT] Liveness Halted. Safety rules enforced.`);
                steps.push("PARTIAL");
            } else {
                steps.push(`[3/4] Quorum slices bypass faulty nodes. Agreements maintained.`);
                steps.push(`[4/4] Transactions externalized seamlessly using active trust slices.`);
                steps.push(`[RESULT] Attack Blocked. Minority failure tolerated.`);
                steps.push("FAIL");
            }
        } else if (algoId === "pob") {
            steps.push(`[2/4] Burning tokens to accumulate virtual mining power...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker has burned >51% of total burn pool. Dominates block selection.`);
                steps.push(`[4/4] Attacker produces consecutive blocks. Double-spend executed.`);
                steps.push(`[RESULT] Network Compromised! Majority burn power takeover.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Honest burn pool exceeds attacker's. Block selection stays distributed.`);
                steps.push(`[4/4] Attacker's burned tokens are permanently lost with no return.`);
                steps.push(`[RESULT] Attack Blocked. Irreversible cost deters sustained attacks.`);
                steps.push("FAIL");
            }
        }
    }

    // Animate log
    let logText = "";
    let logIdx = 0;
    function runLogInterval() {
        if (logIdx < steps.length - 1) {
            logText += `${steps[logIdx]}\n\n`;
            simLogText.textContent = logText;
            simLogText.scrollTop = simLogText.scrollHeight;
            logIdx++;
            simTimeoutId = setTimeout(runLogInterval, 800);
        } else {
            const outcome = steps[steps.length - 1];
            if (outcome === "SUCCESS") {
                simOutcomeText.textContent = "ATTACK SUCCEEDED ⚠️";
                simOutcomeText.className = "sim-outcome outcome-success";
            } else if (outcome === "PARTIAL") {
                simOutcomeText.textContent = "LIVENESS STALLED ⏳";
                simOutcomeText.className = "sim-outcome outcome-fail";
            } else {
                simOutcomeText.textContent = "ATTACK DEFEATED ✅";
                simOutcomeText.className = "sim-outcome outcome-fail";
            }
            btnSybil.disabled = false;
            btnTakeover.disabled = false;
        }
    }
    simTimeoutId = setTimeout(runLogInterval, 300);
}

// ==========================================================================
// 14. INIT ON LOAD
// ==========================================================================
window.addEventListener("DOMContentLoaded", init);