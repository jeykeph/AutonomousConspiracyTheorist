import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

const contractSource = readFileSync('./contracts/autonomous-conspiracy-theorist.clar', 'utf8')

describe('Autonomous Conspiracy Theorist Contract', () => {
  it('should define contract-owner constant', () => {
    expect(contractSource).toContain('(define-constant contract-owner tx-sender)')
  })
  
  it('should define error constants', () => {
    expect(contractSource).toContain('(define-constant err-not-found (err u404))')
    expect(contractSource).toContain('(define-constant err-unauthorized (err u403))')
  })
  
  it('should define current-theory-id data variable', () => {
    expect(contractSource).toContain('(define-data-var current-theory-id uint u0)')
  })
  
  it('should define theories map', () => {
    expect(contractSource).toContain('(define-map theories uint {')
    expect(contractSource).toContain('content: (string-ascii 500),')
    expect(contractSource).toContain('creator: principal,')
    expect(contractSource).toContain('votes: int,')
    expect(contractSource).toContain('debunked: bool')
  })
  
  it('should define user-votes map', () => {
    expect(contractSource).toContain('(define-map user-votes {theory-id: uint, user: principal} int)')
  })
  
  it('should have a create-theory function', () => {
    expect(contractSource).toContain('(define-public (create-theory (content (string-ascii 500)))')
  })
  
  it('should set theory details in create-theory function', () => {
    expect(contractSource).toContain('(map-set theories theory-id {')
    expect(contractSource).toContain('content: content,')
    expect(contractSource).toContain('creator: tx-sender,')
    expect(contractSource).toContain('votes: 0,')
    expect(contractSource).toContain('debunked: false')
  })
  
  it('should have a vote-theory function', () => {
    expect(contractSource).toContain('(define-public (vote-theory (theory-id uint) (vote int))')
  })
  
  it('should validate vote value in vote-theory function', () => {
    expect(contractSource).toContain('(asserts! (or (is-eq vote 1) (is-eq vote -1)) err-unauthorized)')
  })
  
  it('should update theory votes in vote-theory function', () => {
    expect(contractSource).toContain('votes: (+ (get votes theory) (- vote user-vote))')
  })
  
  it('should have a debunk-theory function', () => {
    expect(contractSource).toContain('(define-public (debunk-theory (theory-id uint))')
  })
  
  it('should check if theory is not already debunked in debunk-theory function', () => {
    expect(contractSource).toContain('(asserts! (not (get debunked theory)) err-unauthorized)')
  })
  
  it('should have a get-theory read-only function', () => {
    expect(contractSource).toContain('(define-read-only (get-theory (theory-id uint))')
  })
  
  it('should have a get-user-vote read-only function', () => {
    expect(contractSource).toContain('(define-read-only (get-user-vote (theory-id uint) (user principal))')
  })
  
  it('should have a get-current-theory-id read-only function', () => {
    expect(contractSource).toContain('(define-read-only (get-current-theory-id)')
  })
})

