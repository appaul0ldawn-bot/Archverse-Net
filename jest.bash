
Local Test Execution Logs Preview

When you execute the automated testing framework locally inside your development workspace by running npm run test, Jest runs the verification routines inside an isolated sandbox.
The console will display a detailed diagnostic report mapping out your components, mathematical algorithms, and database gates:
bash
$ npm run test

> archverse@1.0.0 test
> jest --runInBand --detectOpenHandles

 PASS  tests/Archverse.test.js (6.421 s)
  Solfeggio Aura Sign-Up Algorithm Tests
    ✓ should map an input birthdate matching Leo into the Fire element and Phoenix guide matrix (142 ms)
    ✓ should reject email verification formatting if the token is completely invalid (45 ms)
  Geospatial AR Mission Verification Constraints
    ✓ should allow token collection payouts if the player coordinate is within the 30-meter proximity radius (88 ms)
    ✓ should block mission payouts and raise a validation exception if coordinates drift outside 30 meters (52 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        7.102 s
Ran all test suites.
✨  Done in 7.84s.
