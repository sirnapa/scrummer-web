import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Rol', {
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

test('visiting /rols without data', function(assert) {
  visit('/rols');

  andThen(function() {
    assert.equal(currentPath(), 'rols.index');
    assert.equal(find('#blankslate').text().trim(), 'No Rols found');
  });
});

test('visiting /rols with data', function(assert) {
  server.create('rol');
  visit('/rols');

  andThen(function() {
    assert.equal(currentPath(), 'rols.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new rol', function(assert) {
  visit('/rols');
  click('a:contains(New Rol)');

  andThen(function() {
    assert.equal(currentPath(), 'rols.new');

    fillIn('label:contains(Proyecto) input', 'MyString');
    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Asignado) input', 'MyString');
    fillIn('label:contains(Permisosdelrol) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing rol', function(assert) {
  server.create('rol');
  visit('/rols');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'rols.edit');

    fillIn('label:contains(Proyecto) input', 'MyString');
    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Asignado) input', 'MyString');
    fillIn('label:contains(Permisosdelrol) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing rol', function(assert) {
  server.create('rol');
  visit('/rols');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'rols.show');

    assert.equal(find('p strong:contains(Proyecto:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Asignado:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Permisosdelrol:)').next().text(), 'MyString');
  });
});

test('delete a rol', function(assert) {
  server.create('rol');
  visit('/rols');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'rols.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
