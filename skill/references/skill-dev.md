# Skill-dev

A skill under development occupies a skill-dev tree, distinct from the host
install. This file names the four roots of that work and which owner details
each. Internals are those owners' to specify. A Worker executing an ordinary
assignment does not read this file.

```text
<skill-dev>/
|-- skill/     current package (files, or a link to the host install)
|-- src/       optional; build inputs whose output lands in skill/
|-- cases/     held-out cases
`-- evals/     runs and grade tables
```

- `skill/`, `src/` — `build.md`
- `cases/` — `evaluation-design.md`
- `evals/` — `run-and-grade.md`

Skill work occupies only these roots. Other directories at the skill-dev tree
are not skill work.
