;; Autonomous Conspiracy Theorist

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-not-found (err u404))
(define-constant err-unauthorized (err u403))

;; Data variables
(define-data-var current-theory-id uint u0)

;; Maps
(define-map theories uint {
  content: (string-ascii 500),
  creator: principal,
  votes: int,
  debunked: bool
})

(define-map user-votes {theory-id: uint, user: principal} int)

;; Public functions

;; Create a new theory
(define-public (create-theory (content (string-ascii 500)))
  (let
    (
      (theory-id (+ (var-get current-theory-id) u1))
    )
    (map-set theories theory-id {
      content: content,
      creator: tx-sender,
      votes: 0,
      debunked: false
    })
    (var-set current-theory-id theory-id)
    (ok theory-id)
  )
)

;; Vote on a theory
(define-public (vote-theory (theory-id uint) (vote int))
  (let
    (
      (theory (unwrap! (map-get? theories theory-id) err-not-found))
      (user-vote (default-to 0 (map-get? user-votes {theory-id: theory-id, user: tx-sender})))
    )
    (asserts! (or (is-eq vote 1) (is-eq vote -1)) err-unauthorized)
    (map-set theories theory-id
      (merge theory {
        votes: (+ (get votes theory) (- vote user-vote))
      })
    )
    (map-set user-votes {theory-id: theory-id, user: tx-sender} vote)
    (ok true)
  )
)

;; Debunk a theory
(define-public (debunk-theory (theory-id uint))
  (let
    (
      (theory (unwrap! (map-get? theories theory-id) err-not-found))
    )
    (asserts! (not (get debunked theory)) err-unauthorized)
    (map-set theories theory-id
      (merge theory {
        debunked: true
      })
    )
    (ok true)
  )
)

;; Read-only functions

(define-read-only (get-theory (theory-id uint))
  (map-get? theories theory-id))

(define-read-only (get-user-vote (theory-id uint) (user principal))
  (default-to 0 (map-get? user-votes {theory-id: theory-id, user: user})))

(define-read-only (get-current-theory-id)
  (var-get current-theory-id))

