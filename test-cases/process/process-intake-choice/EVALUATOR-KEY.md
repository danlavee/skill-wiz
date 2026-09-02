# Evaluator-only key

## Bundle A — continue message (`inputs/msg-continue.md`)

| Record | Intake choice | Appropriate? | Report-as-product? | Overall |
|---|---|---|---|---|
| R1 | none | no | no | does_not_handle |
| R2 | report-only | no | yes | does_not_handle |
| R3 | stay | yes | no | handles |
| R4 | re-bind | no (over-rebind for continue) | no | does_not_handle |

## Bundle B — reopen message (`inputs/msg-reopen.md`)

| Record | Intake choice | Appropriate? | Report-as-product? | Overall |
|---|---|---|---|---|
| R1 | none | no | no | does_not_handle |
| R2 | report-only | no | yes | does_not_handle |
| R3 | stay | no (wrong Stay) | no | does_not_handle |
| R4 | re-bind | yes | no | handles |

## Design note

Workers may see one message + all four records, or one message + subset. Key assumes all four records present. R3/R4 correctness is **message-relative**.
