Feature: removal of Greenkeeper

  Scenario: the config file needs to be removed
    Given a config file exists
    When the tool is executed
    Then no config file exists

  Scenario: config file is not present
    Given no config file exists in the project
    When the tool is executed
    Then no config file exists
