import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: PlantillaDeFlujo', {
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

test('visiting /plantilla-de-flujos without data', function(assert) {
  visit('/plantilla-de-flujos');

  andThen(function() {
    assert.equal(currentPath(), 'plantilla-de-flujos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Plantilla de flujos found');
  });
});

test('visiting /plantilla-de-flujos with data', function(assert) {
  server.create('plantilla-de-flujo');
  visit('/plantilla-de-flujos');

  andThen(function() {
    assert.equal(currentPath(), 'plantilla-de-flujos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new plantilla-de-flujo', function(assert) {
  visit('/plantilla-de-flujos');
  click('a:contains(New Plantilla de flujo)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilla-de-flujos.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Actividades) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing plantilla-de-flujo', function(assert) {
  server.create('plantilla-de-flujo');
  visit('/plantilla-de-flujos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilla-de-flujos.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Actividades) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing plantilla-de-flujo', function(assert) {
  server.create('plantilla-de-flujo');
  visit('/plantilla-de-flujos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilla-de-flujos.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Actividades:)').next().text(), 'MyString');
  });
});

test('delete a plantilla-de-flujo', function(assert) {
  server.create('plantilla-de-flujo');
  visit('/plantilla-de-flujos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilla-de-flujos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
