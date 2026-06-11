# Website Repositioning Copilot

## Overview

Website Repositioning Copilot helps marketing teams understand the impact of a positioning change across existing website content.

Most teams can create new messaging. The harder challenge is identifying where existing messaging conflicts with a new positioning strategy, estimating the scope of changes, and determining where to begin.

This prototype analyzes a public website against a current and target positioning statement and generates actionable recommendations for execution.

---

## Why This Exists

Marketing teams often know where they want to go strategically but struggle to understand the downstream impact of a positioning change across an existing website.

A repositioning effort can affect homepage messaging, product descriptions, navigation, value propositions, calls to action, and supporting content. Today, this work is typically performed through manual content audits, stakeholder reviews, and spreadsheets.

Website Repositioning Copilot was built to bridge the gap between positioning strategy and website execution.

---

## Problem

When a company changes positioning, teams often ask:

- Which parts of the website conflict with the new positioning?
- How much effort will this change require?
- Where should we start?
- What content should be updated first?
- What might the revised messaging look like?

Answering these questions manually can be time-consuming and difficult to prioritize.

---

## Solution

Website Repositioning Copilot converts positioning intent into an execution plan.

### Inputs

1. Website URL
2. Current positioning
3. New positioning

### Outputs

- Impact level
- Confidence score
- Effort estimate
- Recommended starting points
- Key messaging conflicts
- Location-aware rewrite recommendations

---

## How It Works

### 1. Content Extraction & Analysis

The application retrieves publicly available website content and extracts the primary marketing copy for analysis.

The current prototype analyzes a single page, typically the homepage.

### 2. Positioning Evaluation

Extracted content is compared against:

- Current positioning
- Target positioning

The AI evaluates:

- Messaging alignment
- Positioning conflicts
- Areas of highest impact
- Strategic recommendations

### 3. Recommendation Generation

The system generates:

- Impact assessment
- Prioritized starting points
- Effort estimates
- Key messaging conflicts
- Suggested rewrites
- Approximate content locations

---

## Example Workflow

### Current Positioning

Customer platform for go-to-market teams

### New Positioning

AI content operations platform for enterprise marketing teams

### Result

The system identifies:

- Messaging conflicts
- Sections most affected by the change
- Recommended order of execution
- Suggested replacement messaging
- Estimated implementation effort

---

## Architecture

### Frontend

- React
- Vite

### Backend

- FastAPI
- Python

### AI

- Claude

### Content Extraction

- Trafilatura

---

## Design Principles

This prototype is intentionally focused on impact analysis rather than content generation.

The goal is not to create more marketing copy.

The goal is to help teams understand:

- What changes
- Where it changes
- Why it changes
- Where to start

By making repositioning work visible and actionable, teams can move more quickly from strategy to execution.

---

## Current Limitations

- Single-page analysis
- No website crawling
- No CMS integration
- No content export workflow
- Recommendations are generated from extracted content only

---

## Future Roadmap

### Multi-Page Analysis

Analyze multiple pages and identify content conflicts across an entire website.

### Content Prioritization

Rank pages and sections by expected impact.

### Content Update Plan

Generate an exportable implementation plan for marketing teams.

### CMS Integration

Push approved recommendations directly into content workflows.

---

## Status

Prototype / Proof of Concept

Built to explore how AI can help marketing teams assess the impact of positioning changes across existing website content and accelerate the path from strategy to execution.