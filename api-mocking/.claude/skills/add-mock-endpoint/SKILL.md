---
name: add-mock-endpoint
description: Add a new mocked API endpoint (handler, sample data, test). Use when the user asks to mock a new route or resource.
---

# Add a mock endpoint

TBD: finalize once the stack is chosen. General flow:

1. Confirm method, path, request shape and response shape with the user.
2. Add the handler in `apps/proxy/src/` following existing handlers' style.
3. Add realistic sample response data.
4. Add a test in `apps/proxy/tests/` covering success and error cases.
5. Run the test and lint commands from `AGENTS.md`.
6. Update `README.md` if the endpoint list is documented there.
