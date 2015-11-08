# Use Cases

These are based on experience at Google, described in this talk:
https://www.youtube.com/watch?v=J7c0Bw840X8

## Breakages
A breakage is an undesired transition from one state to a worse state.
For example, a build which was green turns red at a commit.
But a more subtle example is a build which was consistently green
is now occasionally failing (passing -> flaky transition).
Note that this transition is not determinable from a single pair
of build statuses, we must fuzz over a window of several executions
or re-execute the build several times with identical inputs (same commit).

The transition might be within a single branch (master is broken)
or a more interesting scenario (breakages in my unsubmitted changes
compared with the latest repository version).

Breakages are the primary entity for accessing build statuses.
Most users coming to the build UI are trying to fix a breakage
and get back to work. So all the other data is presented in a
way that supports common build-broken workflows, such as:

* Finding the culprit
  * Someone committed a bad change
  * The culprit could be one of several commits (eg. passing -> flaky)
  * The culprit might be environmental (eg. tests depend on npm and it was down)
  * The culprit could be a flaky test failure
  * We can rank culprits using hints like the stacktrace contains a path of a modified file
* Claiming the breakage
  * Other engineers are likely affected, and want to know if someone is fixing
  * Need to send notifications, either automated or because of user interaction (assignment)
* Helping to fix quickly
  * Try to identify root causes
  * get more rich test results, which we can display succinctly
  * If we can determine it's a flake, then avoid wasting time
  
## Health metrics
Unlike breakages, which are events that require intervention, and users only
want to view them while the build is broken, metrics are always interesting.

Typical metrics to track are:

* How stable is the build? (recently broken frequently?)
* Binary size of the application
* How long it takes to run the tests

  