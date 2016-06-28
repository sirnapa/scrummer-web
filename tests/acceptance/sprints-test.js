import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Sprint', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /sprints without data', function(assert) {
  visit('/sprints');

  andThen(function() {
    assert.equal(currentPath(), 'sprints.index');
    assert.equal(find('#blankslate').text().trim(), 'No Sprints found');
  });
});

test('visiting /sprints with data', function(assert) {
  server.create('sprint');
  visit('/sprints');

  andThen(function() {
    assert.equal(currentPath(), 'sprints.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new sprint', function(assert) {
  visit('/sprints');
  click('a:contains(New Sprint)');

  andThen(function() {
    assert.equal(currentPath(), 'sprints.new');

    fillIn('label:contains(Horashombre) input', 42);
    fillIn('label:contains(Estado) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing sprint', function(assert) {
  server.create('sprint');
  visit('/sprints');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'sprints.edit');

    fillIn('label:contains(Horashombre) input', 42);
    fillIn('label:contains(Estado) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing sprint', function(assert) {
  server.create('sprint');
  visit('/sprints');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'sprints.show');

    assert.equal(find('p strong:contains(Horashombre:)').next().text(), 42);
    assert.equal(find('p strong:contains(Estado:)').next().text(), 'MyString');
  });
});

test('delete a sprint', function(assert) {
  server.create('sprint');
  visit('/sprints');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'sprints.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
