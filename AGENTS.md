# Playbook & Documentation: ALWAYS read before acting

1. **Next.js Documentation**: Read the relevant doc in `node_modules/next/dist/docs/`. Local docs are the source of truth for the stack.
2. **Project Rules**: Read `.playbook/rules/` (e.g., `code-style.md`, `project-structure.md`). Follow **kebab-case** for ALL files/folders and strictly split by concern.
3. **Domain Playbooks**: Read `.playbook/playbooks/*/INDEX.md` for the relevant domain (e.g., `booking`, `core`). Use this to find specialized patterns like the **Data Access Layer (DAL)** or **State Machines**.

Never guess on architecture or naming. Consult the Playbook first.
