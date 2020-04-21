Feature: removal of the Greenkeeper badge

  Scenario: inline badge
    Given an inline greenkeeper badge exists
    When the tool is executed
    Then the greenkeeper badge is removed from the README

  @wip
  Scenario: badge with references
    Given a greenkeeper badge exists with references
    When the tool is executed
    Then the greenkeeper badge is removed from the README
