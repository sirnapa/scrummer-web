import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Adjunto', {
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

test('visiting /adjuntos without data', function(assert) {
  visit('/adjuntos');

  andThen(function() {
    assert.equal(currentPath(), 'adjuntos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Adjuntos found');
  });
});

test('visiting /adjuntos with data', function(assert) {
  server.create('adjunto');
  visit('/adjuntos');

  andThen(function() {
    assert.equal(currentPath(), 'adjuntos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new adjunto', function(assert) {
  visit('/adjuntos');
  click('a:contains(New Adjunto)');

  andThen(function() {
    assert.equal(currentPath(), 'adjuntos.new');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Archivo) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing adjunto', function(assert) {
  server.create('adjunto');
  visit('/adjuntos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'adjuntos.edit');

    fillIn('label:contains(Nombre) input', 'MyString');
    fillIn('label:contains(Archivo) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing adjunto', function(assert) {
  server.create('adjunto');
  visit('/adjuntos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'adjuntos.show');

    assert.equal(find('p strong:contains(Nombre:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Archivo:)').next().text(), 'MyString');
  });
});

test('delete a adjunto', function(assert) {
  server.create('adjunto');
  visit('/adjuntos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'adjuntos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
