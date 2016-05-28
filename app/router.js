import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/login/'});
  this.route('posts', {path: '/posts/:post_id'});
  this.route('apps', function() {
    this.route('new');

    this.route('edit', {
      path: ':app_id/edit'
    });

    this.route('show', {
      path: ':app_id'
    });
  });
  this.route('permisos', function() {
    this.route('new');

    this.route('edit', {
      path: ':permiso_id/edit'
    });

    this.route('show', {
      path: ':permiso_id'
    });
  });
  this.route('plantilla-de-flujos', function() {
    this.route('new');

    this.route('edit', {
      path: ':plantilla-de-flujo_id/edit'
    });

    this.route('show', {
      path: ':plantilla-de-flujo_id'
    });
  });
  this.route('proyectos', function() {
    this.route('new');

    this.route('edit', {
      path: ':proyecto_id/edit'
    });

    this.route('show', {
      path: ':proyecto_id'
    });
  });
});

export default Router;

