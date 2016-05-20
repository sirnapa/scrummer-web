import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: App', {
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

test('visiting /apps without data', function(assert) {
  visit('/apps');

  andThen(function() {
    assert.equal(currentPath(), 'apps.index');
    assert.equal(find('#blankslate').text().trim(), 'No Apps found');
  });
});

test('visiting /apps with data', function(assert) {
  server.create('app');
  visit('/apps');

  andThen(function() {
    assert.equal(currentPath(), 'apps.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new app', function(assert) {
  visit('/apps');
  click('a:contains(New App)');

  andThen(function() {
    assert.equal(currentPath(), 'apps.new');

    fillIn('label:contains(Label) input', 'MyString');
    fillIn('label:contains(Text) input', 'MyString');
    fillIn('label:contains(Done) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing app', function(assert) {
  server.create('app');
  visit('/apps');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'apps.edit');

    fillIn('label:contains(Label) input', 'MyString');
    fillIn('label:contains(Text) input', 'MyString');
    fillIn('label:contains(Done) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing app', function(assert) {
  server.create('app');
  visit('/apps');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'apps.show');

    assert.equal(find('p strong:contains(Label:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Text:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Done:)').next().text(), false);
  });
});

test('delete a app', function(assert) {
  server.create('app');
  visit('/apps');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'apps.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
