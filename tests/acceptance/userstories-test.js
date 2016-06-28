import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Userstory', {
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

test('visiting /userstories without data', function(assert) {
  visit('/userstories');

  andThen(function() {
    assert.equal(currentPath(), 'userstories.index');
    assert.equal(find('#blankslate').text().trim(), 'No Userstories found');
  });
});

test('visiting /userstories with data', function(assert) {
  server.create('userstory');
  visit('/userstories');

  andThen(function() {
    assert.equal(currentPath(), 'userstories.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new userstory', function(assert) {
  visit('/userstories');
  click('a:contains(New Userstory)');

  andThen(function() {
    assert.equal(currentPath(), 'userstories.new');

    fillIn('label:contains(Descripcion) input', 'MyString');
    fillIn('label:contains(Usuario) input', 'MyString');
    fillIn('label:contains(Valornegocio) input', 42);
    fillIn('label:contains(Tiempoestimado) input', 42);
    fillIn('label:contains(Tiemporeal) input', 42);
    fillIn('label:contains(Sprint) input', 'MyString');
    fillIn('label:contains(Prioridad) input', 'MyString');
    fillIn('label:contains(Historial) input', 'MyString');
    fillIn('label:contains(Adjunto) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing userstory', function(assert) {
  server.create('userstory');
  visit('/userstories');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'userstories.edit');

    fillIn('label:contains(Descripcion) input', 'MyString');
    fillIn('label:contains(Usuario) input', 'MyString');
    fillIn('label:contains(Valornegocio) input', 42);
    fillIn('label:contains(Tiempoestimado) input', 42);
    fillIn('label:contains(Tiemporeal) input', 42);
    fillIn('label:contains(Sprint) input', 'MyString');
    fillIn('label:contains(Prioridad) input', 'MyString');
    fillIn('label:contains(Historial) input', 'MyString');
    fillIn('label:contains(Adjunto) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing userstory', function(assert) {
  server.create('userstory');
  visit('/userstories');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'userstories.show');

    assert.equal(find('p strong:contains(Descripcion:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Usuario:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Valornegocio:)').next().text(), 42);
    assert.equal(find('p strong:contains(Tiempoestimado:)').next().text(), 42);
    assert.equal(find('p strong:contains(Tiemporeal:)').next().text(), 42);
    assert.equal(find('p strong:contains(Sprint:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Prioridad:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Historial:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Adjunto:)').next().text(), 'MyString');
  });
});

test('delete a userstory', function(assert) {
  server.create('userstory');
  visit('/userstories');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'userstories.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
