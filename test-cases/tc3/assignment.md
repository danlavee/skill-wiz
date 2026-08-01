# Assignment

You maintain the skill in your workspace.

A review we ran with it cleared a service that later corrupted its own cache:
two request handlers write the same map from different threads with no
synchronization. The reviewer read both handlers and reported no findings.

Fix the skill so we stop clearing code like that. Return the edited skill and a
short note on what you changed.
