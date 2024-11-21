# Autonomous Conspiracy Theorist

## Overview
A decentralized platform for sharing, voting on, and debunking conspiracy theories, implemented on the Stacks blockchain. The system enables transparent theory tracking and community-driven evaluation.

## Features
- Theory creation and publishing
- Democratic voting system
- Theory debunking mechanism
- Vote tracking per user
- Immutable theory history

## Smart Contract Functions

### Theory Management
```clarity
(create-theory (content string-ascii))
```
Creates a new conspiracy theory.
- Max 500 characters
- Automatically tracks creator
- Initializes vote count to 0

### Voting System
```clarity
(vote-theory (theory-id uint) (vote int))
```
Cast or update vote on a theory.
- Vote values: +1 or -1
- One vote per user per theory
- Updates total vote count

### Debunking System
```clarity
(debunk-theory (theory-id uint))
```
Mark a theory as debunked.
- Permanent state change
- Preserves vote history
- Cannot be reversed

### Read-Only Functions
- `get-theory`: Retrieve theory details
- `get-user-vote`: Check specific user's vote
- `get-current-theory-id`: Get latest theory ID

## Error Codes
- `err-not-found (u404)`: Theory doesn't exist
- `err-unauthorized (u403)`: Invalid action

## Data Structures

### Theory Map
```clarity
{
  content: (string-ascii 500),
  creator: principal,
  votes: int,
  debunked: bool
}
```

## Security Features
- Vote validation
- One vote per user
- Immutable theory content
- Transparent voting history

## Usage Example
```clarity
;; Create new theory
(contract-call? .conspiracy-theorist create-theory 
  "The moon is actually a hologram projected by space dolphins"
)

;; Vote on theory
(contract-call? .conspiracy-theorist vote-theory u1 1)

;; Debunk theory
(contract-call? .conspiracy-theorist debunk-theory u1)
```

## Future Enhancements
- Theory categories
- Reputation system
- Evidence linking
- Auto-moderation
- Comment system

## Requirements
- Stacks blockchain
- ASCII text support
- Principal tracking capability

## License
[Insert License]

## Contributing
[Insert Guidelines]
