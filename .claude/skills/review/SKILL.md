---
name: review
description: Review code changes for bugs, security issues, and quality problems. Invoke with /review or ask to review code.
allowed-tools: Read, Grep, Glob, Bash, LSP
---

# Code Review Skill

Review recent code changes and provide actionable feedback.

## Steps

1. **Get the diff**
   ```bash
   git diff --stat
   git diff
   ```

2. **For each changed file:**
   - Read the full file for context
   - Check for critical issues first
   - Note warnings and suggestions

3. **Check for:**

   **Security**
   - SQL injection in Supabase queries
   - XSS vulnerabilities
   - Exposed secrets
   - Missing auth checks

   **Bugs**
   - Null/undefined errors
   - Type mismatches
   - Missing error handling
   - Race conditions

   **Quality**
   - Duplicated code
   - Missing types
   - Performance issues
   - Naming conventions

4. **Output format:**
   ```
   ## Review: [summary]

   ### Critical
   - **file.tsx:42** - Issue description → Fix suggestion

   ### Warnings
   - **file.tsx:15** - Issue → Suggestion

   ### Good
   - What looks correct
   ```

## Quick Commands

- `/review` - Review uncommitted changes
- `/review HEAD~3` - Review last 3 commits
- `/review src/components` - Review specific directory
