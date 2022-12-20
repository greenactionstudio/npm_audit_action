# npm_audit_action

This action runs npm audit.

## Inputs

### `severity`

The minimum severity level of a vulnerability that will cause the action to fail. Default `"low"`.

### `title`

A string, that if found in a vulnerability title will cause the action to fail.

## Example usage

```yaml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  npm_audit_job:
    runs-on: ubuntu-latest
    name: npm audit action
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: npm audit action step
        uses: liorfrank/npm_audit_action@1.0.3
        with:
          severity: 'high'
          title: 'Injection'
```
