import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Plantilladeflujo', {
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

test('visiting /plantilladeflujos without data', function(assert) {
  visit('/plantilladeflujos');

  andThen(function() {
    assert.equal(currentPath(), 'plantilladeflujos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Plantilladeflujos found');
  });
});

test('visiting /plantilladeflujos with data', function(assert) {
  server.create('plantilladeflujo');
  visit('/plantilladeflujos');

  andThen(function() {
    assert.equal(currentPath(), 'plantilladeflujos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new plantilladeflujo', function(assert) {
  visit('/plantilladeflujos');
  click('a:contains(New Plantilladeflujo)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilladeflujos.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Actividades) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing plantilladeflujo', function(assert) {
  server.create('plantilladeflujo');
  visit('/plantilladeflujos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilladeflujos.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Actividades) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing plantilladeflujo', function(assert) {
  server.create('plantilladeflujo');
  visit('/plantilladeflujos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilladeflujos.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Actividades:)').next().text(), 'MyString');
  });
});

test('delete a plantilladeflujo', function(assert) {
  server.create('plantilladeflujo');
  visit('/plantilladeflujos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'plantilladeflujos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
