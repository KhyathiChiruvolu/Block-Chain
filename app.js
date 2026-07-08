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
            case "pow": drawPoWAnimation(ctx, w, h, color, consensusState.time); break;
            case "pos": drawPoSAnimation(ctx, w, h, color, consensusState.time); break;
            case "poh": drawPoHAnimation(ctx, w, h, color, consensusState.time); break;
            case "dpos": drawDPoSAnimation(ctx, w, h, color, consensusState.time); break;
            case "poa": drawPoAAnimation(ctx, w, h, color, consensusState.time); break;
            case "pbft": drawPBFTAnimation(ctx, w, h, color, consensusState.time); break;
            case "pob": drawPoBAnimation(ctx, w, h, color, consensusState.time); break;
        }
        consensusAnimFrame = requestAnimationFrame(loop);
    }
    loop();
}

// ---- PoW: Mining Hash Animation ----
function drawPoWAnimation(ctx, w, h, color, t) {
    const cx = w / 2, cy = h / 2;
    // Block chain at bottom
    const blockW = 50, blockH = 35, gap = 12;
    const chainY = h - 60;
    const blocksCount = Math.floor(w / (blockW + gap));
    const chainOffset = (t * 0.3) % (blockW + gap);

    for (let i = -1; i < blocksCount + 1; i++) {
        const bx = i * (blockW + gap) - chainOffset;
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.15)`;
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.4)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(bx, chainY, blockW, blockH, 5);
        ctx.fill();
        ctx.stroke();
        // Link lines
        if (i > -1) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.25)`;
            ctx.moveTo(bx, chainY + blockH / 2);
            ctx.lineTo(bx - gap, chainY + blockH / 2);
            ctx.stroke();
        }
    }

    // Mining nonces area
    const fontSize = 11;
    ctx.font = `${fontSize}px 'Fira Code', monospace`;
    ctx.textAlign = "left";
    const cols = 4, rows = 6;
    const cellW = w / cols, cellH = 28;
    const startY = 25;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const hash = randomHex(8);
            const isSolution = (t % 120 > 100) && r === rows - 1 && c === cols - 1;
            if (isSolution) {
                ctx.fillStyle = color.hex;
                ctx.shadowColor = color.hex;
                ctx.shadowBlur = 12;
                ctx.fillText("✓ 0x00000" + randomHex(3), c * cellW + 10, startY + r * cellH);
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = `rgba(255,255,255, ${0.15 + Math.random() * 0.15})`;
                ctx.fillText("0x" + hash, c * cellW + 10, startY + r * cellH);
            }
        }
    }

    // "Mining..." label
    const dots = ".".repeat((Math.floor(t / 20) % 3) + 1);
    ctx.font = "bold 13px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText(t % 120 > 100 ? "✨ BLOCK MINED!" : `Mining${dots}`, cx, cy + 15);
}

// ---- PoS: Validator Selection ----
function drawPoSAnimation(ctx, w, h, color, t) {
    const cx = w / 2, cy = h / 2 - 10;
    const validators = 8;
    const radius = Math.min(w, h) * 0.3;
    const selectedIdx = Math.floor(t / 90) % validators;
    const selectionProgress = (t % 90) / 90;

    // Draw stake amounts
    for (let i = 0; i < validators; i++) {
        const angle = (i / validators) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const isSelected = i === selectedIdx && selectionProgress > 0.6;
        const nodeR = isSelected ? 18 : 12;

        // Connection to center
        ctx.beginPath();
        ctx.strokeStyle = isSelected ? `rgba(${color.rgb.join(",")}, 0.6)` : `rgba(255,255,255, 0.06)`;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? `rgba(${color.rgb.join(",")}, 0.3)` : `rgba(255,255,255, 0.05)`;
        ctx.strokeStyle = isSelected ? color.hex : `rgba(255,255,255, 0.15)`;
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.fill();
        ctx.stroke();

        if (isSelected) {
            ctx.beginPath();
            ctx.arc(x, y, nodeR + 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${0.3 + Math.sin(t * 0.1) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Stake label
        ctx.font = "bold 9px Fira Code, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = isSelected ? color.hex : `rgba(255,255,255,0.4)`;
        ctx.fillText(`${(i + 1) * 32}Ξ`, x, y + nodeR + 14);
    }

    // Center: Spinning selector
    const spinAngle = selectionProgress * Math.PI * 4 + (selectedIdx / validators) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(spinAngle);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(radius * 0.4, 0);
    ctx.lineTo(0, 8);
    ctx.closePath();
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, ${0.5 + selectionProgress * 0.5})`;
    ctx.fill();
    ctx.restore();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = color.hex;
    ctx.fill();

    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText(selectionProgress > 0.6 ? `Validator ${selectedIdx + 1} Selected ✓` : "Selecting Proposer...", cx, h - 30);
}

// ---- PoH: Sequential Hash Chain ----
function drawPoHAnimation(ctx, w, h, color, t) {
    const nodeCount = 10;
    const nodeR = 14;
    const spacing = (w - 60) / (nodeCount - 1);
    const startX = 30;
    const cy = h / 2 - 10;
    const progress = (t % 150) / 150;
    const activeNode = Math.floor(progress * nodeCount);

    // Draw chain line
    ctx.beginPath();
    ctx.moveTo(startX, cy);
    ctx.lineTo(startX + (nodeCount - 1) * spacing, cy);
    ctx.strokeStyle = `rgba(255,255,255, 0.06)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Active chain line
    const activeX = startX + activeNode * spacing;
    ctx.beginPath();
    ctx.moveTo(startX, cy);
    ctx.lineTo(activeX, cy);
    ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.5)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw nodes
    for (let i = 0; i < nodeCount; i++) {
        const x = startX + i * spacing;
        const isActive = i <= activeNode;
        const isCurrent = i === activeNode;

        ctx.beginPath();
        ctx.arc(x, cy, isCurrent ? nodeR + 3 : nodeR, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? `rgba(${color.rgb.join(",")}, ${isCurrent ? 0.35 : 0.15})` : `rgba(255,255,255, 0.03)`;
        ctx.strokeStyle = isActive ? color.hex : `rgba(255,255,255, 0.1)`;
        ctx.lineWidth = isCurrent ? 2.5 : 1;
        ctx.fill();
        ctx.stroke();

        if (isCurrent) {
            ctx.beginPath();
            ctx.arc(x, cy, nodeR + 10, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${0.2 + Math.sin(t * 0.15) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Hash text
        ctx.font = "8px Fira Code, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = isActive ? `rgba(${color.rgb.join(",")}, 0.7)` : `rgba(255,255,255, 0.2)`;
        ctx.fillText(isActive ? `H${i}` : "---", x, cy - nodeR - 8);

        // Timestamp
        if (isActive) {
            ctx.font = "7px Fira Code, monospace";
            ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.5)`;
            ctx.fillText(`t+${i * 400}ms`, x, cy + nodeR + 14);
        }
    }

    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText("Sequential VDF Hash Chain →", w / 2, h - 25);
}

// ---- DPoS: Delegate Voting ----
function drawDPoSAnimation(ctx, w, h, color, t) {
    const cx = w / 2, cy = h / 2 - 5;
    const delegates = 6;
    const voters = 12;
    const innerR = Math.min(w, h) * 0.15;
    const outerR = Math.min(w, h) * 0.36;
    const activeDelegate = Math.floor(t / 80) % delegates;

    // Draw voters (outer ring)
    for (let i = 0; i < voters; i++) {
        const angle = (i / voters) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * outerR;
        const y = cy + Math.sin(angle) * outerR;
        const targetDelegate = i % delegates;

        // Vote line to delegate
        const dAngle = (targetDelegate / delegates) * Math.PI * 2 - Math.PI / 2;
        const dx = cx + Math.cos(dAngle) * innerR;
        const dy = cy + Math.sin(dAngle) * innerR;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${targetDelegate === activeDelegate ? 0.3 : 0.08})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x, y);
        ctx.lineTo(dx, dy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Voter node
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255, 0.08)`;
        ctx.strokeStyle = `rgba(255,255,255, 0.15)`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }

    // Draw delegates (inner ring)
    for (let i = 0; i < delegates; i++) {
        const angle = (i / delegates) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * innerR;
        const y = cy + Math.sin(angle) * innerR;
        const isActive = i === activeDelegate;

        ctx.beginPath();
        ctx.arc(x, y, isActive ? 16 : 12, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? `rgba(${color.rgb.join(",")}, 0.3)` : `rgba(255,255,255, 0.05)`;
        ctx.strokeStyle = isActive ? color.hex : `rgba(255,255,255, 0.15)`;
        ctx.lineWidth = isActive ? 2.5 : 1;
        ctx.fill();
        ctx.stroke();

        if (isActive) {
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${0.2 + Math.sin(t * 0.1) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.font = "bold 9px Fira Code";
        ctx.textAlign = "center";
        ctx.fillStyle = isActive ? color.hex : `rgba(255,255,255, 0.35)`;
        ctx.fillText(`D${i + 1}`, x, y + 4);
    }

    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText(`Delegate ${activeDelegate + 1} producing block...`, cx, h - 25);
}

// ---- PoA: Authority Rotation ----
function drawPoAAnimation(ctx, w, h, color, t) {
    const cx = w / 2, cy = h / 2 - 10;
    const authorities = 5;
    const radius = Math.min(w, h) * 0.28;
    const activeAuth = Math.floor(t / 100) % authorities;
    const rotProgress = (t % 100) / 100;

    // Draw rotation arc
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 20, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255, 0.04)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Rotation indicator
    const arcStart = (activeAuth / authorities) * Math.PI * 2 - Math.PI / 2;
    const arcEnd = arcStart + (1 / authorities) * Math.PI * 2 * rotProgress;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 20, arcStart, arcEnd);
    ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.5)`;
    ctx.lineWidth = 3;
    ctx.stroke();

    for (let i = 0; i < authorities; i++) {
        const angle = (i / authorities) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const isActive = i === activeAuth;

        // Shield shape for authority
        ctx.save();
        ctx.translate(x, y);
        const shieldR = isActive ? 20 : 14;
        ctx.beginPath();
        ctx.moveTo(0, -shieldR);
        ctx.quadraticCurveTo(shieldR, -shieldR * 0.5, shieldR * 0.8, shieldR * 0.3);
        ctx.lineTo(0, shieldR);
        ctx.lineTo(-shieldR * 0.8, shieldR * 0.3);
        ctx.quadraticCurveTo(-shieldR, -shieldR * 0.5, 0, -shieldR);
        ctx.closePath();
        ctx.fillStyle = isActive ? `rgba(${color.rgb.join(",")}, 0.25)` : `rgba(255,255,255, 0.04)`;
        ctx.strokeStyle = isActive ? color.hex : `rgba(255,255,255, 0.12)`;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.fill();
        ctx.stroke();

        // Checkmark for active
        if (isActive) {
            ctx.font = "bold 12px sans-serif";
            ctx.fillStyle = color.hex;
            ctx.textAlign = "center";
            ctx.fillText("✓", 0, 5);
        }
        ctx.restore();

        ctx.font = "bold 8px Fira Code";
        ctx.textAlign = "center";
        ctx.fillStyle = isActive ? color.hex : `rgba(255,255,255, 0.3)`;
        ctx.fillText(`AUTH ${i + 1}`, x, y + (isActive ? 28 : 22));
    }

    // Center
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.6)`;
    ctx.fill();

    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText(`Authority ${activeAuth + 1} signing block`, cx, h - 25);
}

// ---- PBFT: Quorum Message Passing ----
function drawPBFTAnimation(ctx, w, h, color, t) {
    const cx = w / 2, cy = h / 2 - 10;
    const nodes = 7;
    const radius = Math.min(w, h) * 0.3;
    const phase = Math.floor(t / 80) % 3; // 0=prepare, 1=commit, 2=finalize
    const phaseProgress = (t % 80) / 80;
    const phaseLabels = ["Prepare", "Commit", "Finalize ✓"];

    for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        // Connections to other nodes (message passing)
        for (let j = i + 1; j < nodes; j++) {
            const angle2 = (j / nodes) * Math.PI * 2 - Math.PI / 2;
            const x2 = cx + Math.cos(angle2) * radius;
            const y2 = cy + Math.sin(angle2) * radius;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, 0.06)`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // Animated message dots
        if (phaseProgress > 0.2 && phaseProgress < 0.8) {
            const nextNode = (i + 1) % nodes;
            const angle2 = (nextNode / nodes) * Math.PI * 2 - Math.PI / 2;
            const x2 = cx + Math.cos(angle2) * radius;
            const y2 = cy + Math.sin(angle2) * radius;
            const msgProgress = (phaseProgress - 0.2) / 0.6;
            const mx = x + (x2 - x) * msgProgress;
            const my = y + (y2 - y) * msgProgress;

            ctx.beginPath();
            ctx.arc(mx, my, 3, 0, Math.PI * 2);
            ctx.fillStyle = color.hex;
            ctx.fill();
        }

        // Node
        const isAgreed = phase > 0 || phaseProgress > 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fillStyle = isAgreed ? `rgba(${color.rgb.join(",")}, 0.2)` : `rgba(255,255,255, 0.04)`;
        ctx.strokeStyle = isAgreed ? color.hex : `rgba(255,255,255, 0.12)`;
        ctx.lineWidth = isAgreed ? 2 : 1;
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 9px Fira Code";
        ctx.textAlign = "center";
        ctx.fillStyle = isAgreed ? color.hex : `rgba(255,255,255, 0.3)`;
        ctx.fillText(`N${i + 1}`, x, y + 4);
    }

    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText(`Phase: ${phaseLabels[phase]}`, cx, h - 25);
}

// ---- PoB: Token Burn Animation ----
function drawPoBAnimation(ctx, w, h, color, t) {
    const cx = w / 2, cy = h / 2 - 10;

    // Burn address at center
    const burnPulse = 0.5 + Math.sin(t * 0.08) * 0.3;
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, ${0.15 + burnPulse * 0.15})`;
    ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${0.5 + burnPulse * 0.3})`;
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // Burn glow
    ctx.beginPath();
    ctx.arc(cx, cy, 35 + burnPulse * 8, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${0.08 + burnPulse * 0.08})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = color.hex;
    ctx.fillText("🔥", cx, cy + 6);

    // Token particles being sent toward the burn address
    const tokenCount = 8;
    const outerR = Math.min(w, h) * 0.38;
    for (let i = 0; i < tokenCount; i++) {
        const angle = (i / tokenCount) * Math.PI * 2 - Math.PI / 2;
        const phase = ((t * 1.2 + i * 50) % 200) / 200;

        const sx = cx + Math.cos(angle) * outerR;
        const sy = cy + Math.sin(angle) * outerR;
        const tx = sx + (cx - sx) * phase;
        const ty = sy + (cy - sy) * phase;

        // Trail
        if (phase < 0.9) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color.rgb.join(",")}, ${(1 - phase) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 4]);
            ctx.moveTo(sx, sy);
            ctx.lineTo(tx, ty);
            ctx.stroke();
            ctx.setLineDash([]);

            // Token dot
            ctx.beginPath();
            ctx.arc(tx, ty, 4 - phase * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color.rgb.join(",")}, ${1 - phase})`;
            ctx.fill();
        }

        // Source node
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255, 0.05)`;
        ctx.strokeStyle = `rgba(255,255,255, 0.15)`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        ctx.font = "7px Fira Code, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.5)`;
        ctx.fillText(`V${i + 1}`, sx, sy + 3);
    }

    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillStyle = `rgba(${color.rgb.join(",")}, 0.8)`;
    ctx.textAlign = "center";
    ctx.fillText("Tokens → Burn Address (0x000...dead)", cx, h - 25);
}

// Helper
function randomHex(len) {
    let s = "";
    const chars = "0123456789abcdef";
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * 16)];
    return s;
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
    if (typeof initWorkflowAnimation === 'function') initWorkflowAnimation(algoId);

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