---
title: "The Failures That Shaped It"
description: "An autonomous system is mostly a set of defenses against itself. Nine classes of failure that shaped a self-governing AI system, and the safeguards that answer each."
pubDate: 2026-08-02
tags: ["AI", "Systems", "Engineering"]
draft: false
---

An autonomous system is mostly a set of defenses against itself. Getting the agents to generate work is the easy half; the interesting engineering starts the first time your own infrastructure turns on the work in flight. The case study is the *what*: a self-governing AI system that runs a solo operation across two machines. This is the *why it is built the way it is*, the set of failures that only surface once a system runs unattended for months.

None of these safeguards were designed up front. Every one of them is a scar. What turned scars into infrastructure was a single boring habit applied over and over: find the root cause, fix it in code, and write down why, so the same failure cannot quietly return. Nine classes of failure shaped the system more than any feature did.

1. Durability against a substrate that resets itself
2. Concurrency without corruption
3. Gates on autonomous output
4. The failure that throws no error
5. Keeping long-running agents alive
6. Discipline against real hardware
7. Derived state, which lies differently than its source
8. A fleet that has to keep finding itself
9. The smaller cuts

### 1. Durability, because the platform is indifferent to your work

The system keeps two machines converged with a sync daemon that commits, snapshots, and pulls every few minutes. That daemon is what makes the fleet coherent, and it is also the single most dangerous thing in the system, because a sync can hard-reset the working tree; anything uncommitted at the wrong moment is gone.

Several rules came out of losing work to it. Commit before you call something done, because marking a task complete while the code still sat uncommitted meant the next sync wiped it; work lands durably first, then it is done. Name your own paths when you commit, because a commit that staged the whole index once swept in another session's forty in-progress file moves under an unrelated message; on a shared tree a commit is a scalpel, not a broom. When the sync wedges, do not fight it: a diverged tree that will not push gets landed through an isolated worktree, written clean and pushed, never rebased live. And a pre-push gate can refuse to propagate a red tree, though it taught its own lesson, since scoped too broadly it once wedged every push in the fleet over one unrelated file. The guard needs a blast radius too.

The nastiest one in this class threw no conflict at all. Git's three-way merge resolves a delete-versus-unmodified case by deleting, so a merge can silently drop committed and uncommitted work with no marker for any conflict-detector to catch; out-of-band merges that took the other side quietly erased finished work on three separate tasks before anyone noticed. A conflict-marker guard cannot see a clean deletion, so the check had to move to the one place every change must pass through: an audit at the pre-push choke point, not inside the daemon that a manual merge can bypass. Durability, it turns out, is not something the platform hands you; it is something you engineer against it.

### 2. Concurrency, because claiming is not coordinating

Several agents and interactive sessions touch the same task store, lease registry, and memory files, on two machines, at the same time. Naive reads and writes corrupt each other.

Leases mint a strictly increasing fence token, and a write presenting a token below the resource's current maximum is rejected; that single mechanism defeats the nastiest single-resource case, a stale worker that was reaped, wakes up, and tries to finish work someone else has already taken over. Concurrent edits append operations under a lock rather than rewriting the whole file, because a whole-file save silently clobbers a peer's parallel edit, and a write that cannot apply cleanly fails loudly instead of dropping in silence.

A lock on one machine, though, cannot span two. Both machines mint new task ids, and for a while each did it against its own stale snapshot of the shared store inside the sync window; two throwaway worktrees would hand out the same id, both pass every local duplicate check, and converge into more than a hundred duplicate rows. The fix needed two layers, because the race lives in two places: a blocking mint-lock plus a re-fetch and re-check at push time closes it at the source, and a post-sync sweep that collapses any duplicate that still slips through is the backstop a per-machine lock structurally cannot provide. A task once got built twice for the same reason at the human scale, two agents each holding a valid claim and neither checking what the other was doing. Most of the impossible-looking bugs in a multi-agent system are just an unfenced write, or a lock that stopped at a boundary the work did not.

### 3. Gates, because an agent will report a success it did not achieve

The hardest problem in an agentic system is not generating the work; it is refusing to trust the generation. A separate small model renders a strict approve, iterate, or reject verdict on every lane's output before a task can advance, with grammar-constrained decoding so the verdict always parses. The asymmetry is deliberate: if the structured path ever fails and the system has to salvage a verdict from prose, that salvage can only land on iterate or reject, never approve. Approval by accident is made structurally impossible.

The gate also has to know what it can actually judge. The arbiter is a text-only model with no repository or test access, so pointed at a code change it loops forever on iterate, asking to see a file it structurally cannot read; its objections were never about the code, only about its own blindness. A judge that cannot see the artifact cannot judge it. So code is gated on its own verification method run directly, the real integration path exercised and its output read, and the arbiter is reserved for what it can actually assess: prose, proposals, decisions. And any claim that gates money or safety gets confirmed by a direct read before anything acts on it, because a model's confidence is not evidence. Verification has to be structural, not a vibe; if "approve" is reachable by an optimistic model on a bad day, it will be reached.

### 4. The failure that throws no error

The costliest outage this system has handed me produced no exceptions at all. A dispatch component went quiet for about a week; work simply was not happening, and every error dashboard stayed green, because nothing was watching for the *absence* of the thing that should have been there.

The fix was a change in what gets measured, not another try/catch: an error-rate meter that alerts on a rising failure ratio, a config error that breaks the retry ladder instead of retrying forever into the void, layered dead-man checks that page a phone when the always-on machine goes dark, and a load-spike detector that catches a runaway fork storm by its signature before it takes the host down. The absence of errors is not health.

The opposite mistake costs just as much. A dead-man that cries wolf trains you to ignore it: a drift check that re-pushed the same churning batch of stale items on every sweep buzzed the phone so often the buzz stopped meaning anything, so it was rebuilt to refresh the record silently and sound only on a first raise and once a day after. An alert you have learned to swipe away is worse than no alert, because it costs attention and returns nothing. Instrument the thing that went missing, not only the thing that threw, and make each alarm mean something the first time it fires.

### 5. Keeping long-running agents alive

Interactive sessions are meant to run for hours and survive the machine sleeping, restarting, and being picked back up from a phone. Getting there meant closing a series of quiet deaths. Sessions that appeared to die "on sleep" were not losing power; they were exiting cleanly into a terminal-multiplexer setting that tore the pane down, so the fix keeps the shell alive and the pane can never fully exit. The daemon that retires stale sessions was aging *resumed* ones by their old transcript timestamp, so it kept killing sessions that had just been revived, which respawned, which it killed again; flooring each session's age by its real process uptime ended the war. Respawn itself had to be handled without a system keep-alive that would thrash a process designed to sometimes exit on purpose, so a wrapper restarts the agent on an unexpected exit but leaves a deliberate quit alone. And because every session's transcript is durably logged, edits a bad window clobbered before they were committed can be reconstructed verbatim and re-applied. The permanent record turned out to be a recovery tool, not just an audit trail.

A long-running agent needs a survival model, not just a start command; design for sleep, resume, crash, and clobber as first-class states.

### 6. Discipline against real hardware

Local autonomy means living inside one machine's physical limits: one GPU, one memory ceiling, one shared rate budget. The generation lanes share a single resident model on a fast local inference server while the small utility models live on a separate lightweight runtime, because a second large model co-resident just exhausts the GPU, and the cure is removing the extra weights, not tuning a knob. A rate-limited window is a single pool that every fan-out and background job draws from at once, so automated jobs pin their model explicitly rather than silently spending the interactive budget.

Even the unglamorous limits bite, and they bite the whole system, not one feature. A dashboard that started returning "too many open files" under load was fixed by raising the process's file-descriptor ceiling at the service-manager level, not by restarting and hoping. And a new dependency has to be installed on the specific machine's environment before the service that imports it restarts, because a missing import is not a degraded feature; it is a module-level failure that crash-loops the entire app on boot. Local autonomy is a hardware-constraints problem wearing a software costume.

### 7. Derived state, which lies differently than its source

The first six classes are all about the source of truth: the task store, the leases, the working tree. But a running system is full of *derived* state too, the projections, mirrors, and rendered views built from that source, and derived state fails in its own way, because it can be wrong while the source is perfectly right.

The sharpest lesson here nearly ate real data. A projection layer that finds-or-creates its backing store by name bound itself to a database of the same name that had been imported from the user's own notes, and wrote hundreds of governed rows straight into a personal store of more than a thousand real ones. Nothing errored; the projection did exactly what it was told, against the wrong target. The fix was a namespace and a load-bearing guard clause that will only ever touch rows the system itself created. Rendered projections carry a second hazard: merged naively across two machines they either double into a corrupt board or wedge a resolver that has nothing textual to merge, so a projection is marked to keep one side and re-render from the source rather than be merged line by line. And a projection can simply go stale: a machine whose sync perpetually diverges shipped an old copy of the app until the deploy step learned to overlay the current build from the source of truth rather than trust the local tree. Mirrored state needs its own integrity rules, because it can betray you while every upstream number is correct.

### 8. A fleet that has to keep finding itself

"Unreachable from my phone" started as a single line in the smaller cuts and grew into a class of its own, because a self-governing fleet spends real engineering just staying addressable to itself and to me. The machines find each other over a private mesh, and the mesh moves: the always-on machine's address on it churned across three values, so every hardcoded reference had to give way to a stable name and a hook that resolves the live address on demand. A peer went dark because a gateway was bound to loopback instead of the network; another because it still pointed at the old churned address. The phone reaches the whole system in over a single tunnel, so when that tunnel's own upgrade stalls, everything looks down when nothing is.

That last one earned the most durable fix in the whole system, and it is worth stating as its own principle. The reachability outage traced to an operating-system extension that would periodically wedge mid-upgrade; rather than add another detector for a failure I already understood, I moved the mesh onto a service model that has no such extension at all. The failure class did not get a better alarm; it stopped being possible. A dead-man check tells you when something broke. Removing the mechanism that breaks is the rung above it.

### 9. The smaller cuts

Some lessons are just sharp edges worth marking so nobody walks into them twice. The canonical task store outgrew the tool that reads it, so past a size cap a naive full read truncates; queries are scoped to a record now. A precondition written only in prose is invisible to the automated pickers, so it has to live in a structured field or it does not exist. A stateless generation lane has no filesystem, so a request to edit a file has to carry the file's contents inline, or one engine refuses cleanly and another churns to a timeout. A machine-local secret erased by a config sweep that only meant to update an address will crash-loop a service until the secret is restored, so the sweep has to leave local secrets alone. Three "next task" picks in a row turned out to be already shipped, so the board learned to verify a task is genuinely open by whether its artifact exists, not by whether a commit subject mentioned it. And a served app can quietly ship a stale bundle, so the deploy verifies the live-served asset, not the local cache, before it trusts it.

### The shape of the discipline

Read together, these are not nine unrelated fixes; they are one habit applied nine times. Something breaks in a way no one designed for. You find the actual root cause, not the symptom. You fix it in code, with a guard that makes the whole failure class hard to repeat; and when you can, you go one rung higher and remove the mechanism that fails at all, so there is nothing left to guard. Then you write down why, next to the fix, so the reasoning survives the context that produced it.

That last step is the one most systems skip, and it is the one that compounds. In this system the written *why* is not buried in commit messages; it is wired into the architecture map itself, where every component and process step links to the incident and the safeguard that answer it. The real artifact was never the agents or the dashboards. It is the accumulated, written-down judgment about how this kind of system actually fails, and what holds it together anyway. If you run anything unattended, the question is not whether it will fail in a way you did not design for. It is whether, when it does, you will still be able to read why.
