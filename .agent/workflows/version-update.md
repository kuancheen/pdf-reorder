# Version Update Workflow

This workflow automates the process of updating the project version across all relevant files.

## Steps

1. **Get New Version**:
   - Ask the user for the new version number (e.g., `v0.1.0` or `v1.0.0`).
   - Identify the current date in `YYYY-MM-DD` format.

2. **Update index.html**:
   - Update the version string in the HTML comment header.
   - Update the version display in the footer.

3. **Update README.md**:
   - Update the version number in the main title.

4. **Update CHANGELOG.md**:
   - Add a new version entry at the top of the version list.
   - Use the `vX.Y.Z` format and include the current date.
   - Prompt the user to provide the list of changes (Added, Changed, Fixed, etc.).

5. **Update LICENSE / Copyright**:
   - Ensure the copyright year is current.

6. **Verify and Commit**:
   - Review changes.
   - **Request confirmation** and then commit with message `chore: bump version to vX.Y.Z`.
