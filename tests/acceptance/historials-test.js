import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Historial', {
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

test('visiting /historials without data', function(assert) {
  visit('/historials');

  andThen(function() {
    assert.equal(currentPath(), 'historials.index');
    assert.equal(find('#blankslate').text().trim(), 'No Historials found');
  });
});

test('visiting /historials with data', function(assert) {
  server.create('historial');
  visit('/historials');

  andThen(function() {
    assert.equal(currentPath(), 'historials.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new historial', function(assert) {
  visit('/historials');
  click('a:contains(New Historial)');

  andThen(function() {
    assert.equal(currentPath(), 'historials.new');

    fillIn('label:contains(Descripcion) input', 'MyString');
    fillIn('label:contains(Fecha) input', new Date());

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing historial', function(assert) {
  server.create('historial');
  visit('/historials');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'historials.edit');

    fillIn('label:contains(Descripcion) input', 'MyString');
    fillIn('label:contains(Fecha) input', new Date());

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing historial', function(assert) {
  server.create('historial');
  visit('/historials');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'historials.show');

    assert.equal(find('p strong:contains(Descripcion:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Fecha:)').next().text(), new Date());
  });
});

test('delete a historial', function(assert) {
  server.create('historial');
  visit('/historials');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'historials.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
