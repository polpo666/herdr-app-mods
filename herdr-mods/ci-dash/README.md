# ci-dash

![ci-dash](../docs/screenshots/ci-dash.png)

GitHub Actions for the repository you're working in, titled **CI runs**: runs, manual
dispatch and build artifacts. It follows the focused terminal's folder.

## Needs

- The [GitHub CLI](https://cli.github.com), logged in: `gh auth login`. The token needs the
  `repo` scope for private repositories and access to Actions.
- If you have several `gh` logins, the panel tries the active one first, then the others,
  and keeps the first that can see the repository. Your active login doesn't change.

## Install

Tell your agent:

```text
Read ~/.config/herdr-app/AGENTS.md, then add this mod: herdr.dev/mods/cybertron288/ci-dash
```

Or by hand, from a clone of this repo:

```sh
cp -R ci-dash/mods/* ~/.config/herdr-app/mods/
herdr-app check ~/.config/herdr-app/mods/ci-dash
```

As a side panel block (square, with top and bottom borders only):

```json
{ "id": "ci", "type": "block", "content": { "mod": "ci-dash", "props": { "panel": true } } }
```

Or on its own: `herdr-app do tab.new --name CI --mod ci-dash`, or
`herdr-app do pane.split --direction right --mod ci-dash`.

## Tabs

- **Runs:** the 30 latest runs in one list, newest first, with a filter box and chips
  (Running, Failed, Passed, Other) that narrow it. Click a run for its jobs and steps, **Open** in the
  browser, **Cancel** or **Rerun**. Running runs refresh every 5 s, and a notification
  fires when one you watched finishes.
- **Dispatch:** pick a workflow that allows `workflow_dispatch`, a branch, fill its inputs,
  review. Nothing starts until you press **Dispatch**.
- **Artifacts:** the latest artifacts per workflow, with filters by status and file type.
  Click one to download it to `<repo>/.ci-dash/artifacts/<run id>/<name>`; `↗` opens the
  folder. Add `.ci-dash/` to your `.gitignore`.

## Props

Read once when the mod starts: `panel` (`true` in a side panel), `tab` (`runs`, `dispatch`,
`artifacts`), `repo` (pin `owner/repo`), `workflow` and `ref` (pre-select in Dispatch; it
never dispatches by itself), `filter`, `status`, `type`.

## What it runs

`gh` (all GitHub calls, through your login), `git rev-parse` (the repo root), `open` /
`xdg-open` / `explorer.exe` (the download folder) and `test -d`. It stores no credentials.

## Limits

- Mouse only; text boxes take keyboard input.
- Very large artifact downloads can time out after 30 s.
- Dispatch lists branches, not tags.
