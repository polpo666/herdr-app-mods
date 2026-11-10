# session-bar (Claude Code plugin)

The Claude Code half of the [`session-bar`](..) Herdr mod. Herdr can't
see inside Claude Code, so this plugin sends the session's model, effort, context window
and usage (`ctx`, `5h`, `7d`) to the bar.

Inside a Herdr terminal (when `HC_TERMINAL_ID` is set) it writes them to
`~/.local/state/herdr-session-bar/<terminal>.json`. It updates when a session starts, when
a turn starts and ends, and when usage is measured.

`./install.sh` at the repo root installs it together with the mod. By hand:

```sh
claude plugin marketplace add cybertron288/herdr-mods
claude plugin install session-bar@herdr-mods
```

## Line under the prompt

Off by default. To also see the numbers under Claude's prompt in a plain terminal, turn
on **Line under the prompt** in `/config`, or:

```sh
echo '{"promptLine": "true"}' | claude plugin configure session-bar@herdr-mods --values-stdin
```

The line shows ▬ meters, model, effort and context size, with the git branch on the right.
Inside Herdr it stays hidden, since the bar shows the same numbers.

## Effort

Shown effort comes from, in order: the effort `cc-model-router` picked (if installed and
on), the effort of the latest model request, the `/config` effort row, the last one shown,
and `effortLevel` in `~/.claude/settings.json`.

## With cc-model-router

Optional. When `cc-model-router` is installed and on, the model shown is the one it picked.
Without it, nothing changes: this plugin reads the router's state only if it exists and
never writes it.
