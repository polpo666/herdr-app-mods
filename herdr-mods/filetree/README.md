# filetree

![filetree](../docs/screenshots/filetree.png)

A file tree for the side panel of any Herdr layout. It follows the focused terminal's
folder and shows git state and what Claude Code is reading and writing.

## Install

Tell your agent:

```text
Read ~/.config/herdr-app/AGENTS.md, then add this mod: herdr.dev/mods/cybertron288/filetree
```

Or by hand, from a clone of this repo:

```sh
cp -R filetree/mods/* ~/.config/herdr-app/mods/
herdr-app check ~/.config/herdr-app/mods/filetree
```

This folder carries `file-icons` too: the tree draws its file and folder icons from
`mods/file-icons/icons/`.

Put it in a block of your layout:

```json
{ "id": "files", "type": "block", "content": { "mod": "filetree" } }
```

Or open it beside a terminal: `herdr-app do pane.split --direction right --mod filetree`.

## What you see

- **Header:** the folder name and two tabs: **Tree** and **Recent**. Keys `1` and `2`
  switch tabs.
- **Summary:** the branch, `↑ahead ↓behind`, total `+N −N`, and a bar of modified (yellow),
  new (green) and deleted (red) files with their counts. Outside a repo it says so.
- **Filter box** with the tab's tools beside it:
  - Tree: `↑` up a folder, `⌂` back to the focused pane's folder, `◉` dotfiles, `Σ` dates or
    sizes, `⊟` collapse all.
  - Recent: `⊘` clear the list.
- **Tree:** git colors on every row, `+N −N` on changed files, `?:N M:N D:N` on folders,
  ignored files dimmed. Search covers folders you haven't opened (200 matches).
- **Recent:** files Claude read, wrote or committed, newest first, with how long ago.
- **Footer:** the selected path, and Claude's last git action ("✓ committed 3f9a2c1").

## Using it

- Click selects, double-click or Enter opens, right-click opens a menu: preview, open in the
  default app, reveal in Finder, copy the path, send `@path` to the tab's agent.
- Keys: `j/k` or the arrows, PgUp/PgDn, Home/End, `l/h` open or close, Space toggles,
  `p` preview, `y`/`Y` copy the relative or absolute path, `a` send to the agent, `.`
  dotfiles, `/` filter, Esc clears.
- In Recent, `→` or `l` shows the file in Tree.
- Preview: Markdown rendered, code highlighted. `o` or `↗` opens in the default app.

## Claude activity (optional)

Herdr mods can't see Claude Code's tool calls, so `bridge.ts` is a Claude Code hook that
writes them to `~/.local/state/herdr-filetree/activity.jsonl`. With it, reads shimmer purple,
writes orange and commits green, and the Recent tab fills in. Without it, everything else
works.

Add it to `~/.claude/settings.json` (needs [bun](https://bun.sh)):

```json
"hooks": {
  "PreToolUse":         [{ "matcher": "Bash", "hooks": [{ "type": "command", "command": "bun \"$HOME/.config/herdr-app/mods/filetree/bridge.ts\"", "timeout": 5 }] }],
  "PostToolUse":        [{ "matcher": "Read|Grep|Glob|Write|Edit|MultiEdit|NotebookEdit|Bash", "hooks": [{ "type": "command", "command": "bun \"$HOME/.config/herdr-app/mods/filetree/bridge.ts\"", "timeout": 5 }] }],
  "PostToolUseFailure": [{ "matcher": "Bash", "hooks": [{ "type": "command", "command": "bun \"$HOME/.config/herdr-app/mods/filetree/bridge.ts\"", "timeout": 5 }] }],
  "UserPromptSubmit":   [{ "hooks": [{ "type": "command", "command": "bun \"$HOME/.config/herdr-app/mods/filetree/bridge.ts\"", "timeout": 5 }] }]
}
```

Merge these into any hooks you already have. Restart Claude Code sessions afterwards.

## Settings: `config.json`

| Key | Values | Default |
|---|---|---|
| `activity` | `reads and writes`, `writes`, `reads`, `none` | `reads and writes` |
| `follow` | `true`: open folders and scroll to Claude's activity | `true` |
| `column` | `date` or `size` at start | `date` |
| `open` | `preview` (in the panel), `""` (default app), or a command with `{path}` / `{dir}`, run without a shell, e.g. `zed {path}` | `preview` |

## Other mods

- Any mod can switch the view with the shared key `filetree.view` (`{ view, n }`, where
  `view` is `tree` or `recent`).
- Any mod can ask for a preview with the shared key `filetree.preview`
  (`{ root, rel, n }`).
