import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Actividad', {
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

test('visiting /actividads without data', function(assert) {
  visit('/actividads');

  andThen(function() {
    assert.equal(currentPath(), 'actividads.index');
    assert.equal(find('#blankslate').text().trim(), 'No Actividads found');
  });
});

test('visiting /actividads with data', function(assert) {
  server.create('actividad');
  visit('/actividads');

  andThen(function() {
    assert.equal(currentPath(), 'actividads.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new actividad', function(assert) {
  visit('/actividads');
  click('a:contains(New Actividad)');

  andThen(function() {
    assert.equal(currentPath(), 'actividads.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Orden) input', 'MyString');
    fillIn('label:contains(Flujo) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing actividad', function(assert) {
  server.create('actividad');
  visit('/actividads');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'actividads.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Orden) input', 'MyString');
    fillIn('label:contains(Flujo) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing actividad', function(assert) {
  server.create('actividad');
  visit('/actividads');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'actividads.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Orden:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Flujo:)').next().text(), 'MyString');
  });
});

test('delete a actividad', function(assert) {
  server.create('actividad');
  visit('/actividads');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'actividads.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
