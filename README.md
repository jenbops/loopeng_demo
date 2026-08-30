# loopeng_demo
Demonstration of Loop Engineering using a CICD pipeline and github actions

Prerequisites
You'll need, in this order:

A GitHub repository you can push to (any of yours works — a small one is easiest to follow along in).

GitHub Actions enabled on that repo (it's on by default; check under the repo's Actions tab).
Basic familiarity with YAML (Yet Another Markup Language) syntax — it's the indentation-based format Actions workflows are written in. You don't need to know it well; the annotated example below teaches it as you go.

A project with a test command (e.g. npm test, pytest) — the loop has nothing to verify against without one.

The concept
A loop has five parts — skip the middle one and it's not a loop
People call this Loop Engineering: instead of writing one instruction and reading the result yourself, you build a small system with five parts. The first four exist in every automation tool. The fifth — Verification — is the one that turns "a task that runs on a timer" into "a task that catches its own mistakes."

01
Trigger
What starts it. A push, a schedule, a manual click.

02
Goal
The one-sentence definition of "done" the system is aiming for.

03
Actions
The steps it's allowed to take — build, test, deploy.

04
Verification
The rule that checks the result. Without this, it's a task on a timer — not a loop.

05
Memory
What it keeps from this run so the next one doesn't repeat the same mistake.

Translation
Every loop part already has a name in GitHub Actions
This is the part most platform engineering teams miss: they already have a loop engine sitting in their repo. GitHub Actions' vocabulary maps directly onto the five parts above — you're not adding a new system, you're using the one that's already there deliberately.

Loop part	GitHub Actions equivalent	Example

Trigger	on:	Run on every push to main, or a pull request
Goal	The workflow's name: + its final job	"Code builds, tests pass, and it deploys to staging"
Actions	jobs: → steps:	npm ci, npm run build, npm test
Verification	A step's exit code, plus if: failure()	Test suite exits non-zero → the next job branches to a fix step instead of deploy
Memory	actions/cache, artifacts, commit history	Dependency cache reused next run; failed-run logs kept for 90 days
