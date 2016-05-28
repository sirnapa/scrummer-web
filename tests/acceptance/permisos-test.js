import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Permiso', {
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

test('visiting /permisos without data', function(assert) {
  visit('/permisos');

  andThen(function() {
    assert.equal(currentPath(), 'permisos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Permisos found');
  });
});

test('visiting /permisos with data', function(assert) {
  server.create('permiso');
  visit('/permisos');

  andThen(function() {
    assert.equal(currentPath(), 'permisos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new permiso', function(assert) {
  visit('/permisos');
  click('a:contains(New Permiso)');

  andThen(function() {
    assert.equal(currentPath(), 'permisos.new');

    fillIn('label:contains(Nombre) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing permiso', function(assert) {
  server.create('permiso');
  visit('/permisos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'permisos.edit');

    fillIn('label:contains(Nombre) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing permiso', function(assert) {
  server.create('permiso');
  visit('/permisos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'permisos.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
  });
});

test('delete a permiso', function(assert) {
  server.create('permiso');
  visit('/permisos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'permisos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
