import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Flujo', {
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

test('visiting /flujos without data', function(assert) {
  visit('/flujos');

  andThen(function() {
    assert.equal(currentPath(), 'flujos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Flujos found');
  });
});

test('visiting /flujos with data', function(assert) {
  server.create('flujo');
  visit('/flujos');

  andThen(function() {
    assert.equal(currentPath(), 'flujos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new flujo', function(assert) {
  visit('/flujos');
  click('a:contains(New Flujo)');

  andThen(function() {
    assert.equal(currentPath(), 'flujos.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Proyecto) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing flujo', function(assert) {
  server.create('flujo');
  visit('/flujos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'flujos.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Proyecto) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing flujo', function(assert) {
  server.create('flujo');
  visit('/flujos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'flujos.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Proyecto:)').next().text(), 'MyString');
  });
});

test('delete a flujo', function(assert) {
  server.create('flujo');
  visit('/flujos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'flujos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
