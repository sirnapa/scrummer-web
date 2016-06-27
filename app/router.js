import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/login/'});
  this.route('posts', {path: '/posts/:post_id'});
  this.route('proyectos', function() {
    this.route('new');

    this.route('edit', {
      path: ':proyecto_id/edit'
    });

    this.route('show', {
      path: ':proyecto_id'
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
  this.route('plantilladeflujos', function() {
    this.route('new');

    this.route('edit', {
      path: ':plantilladeflujo_id/edit'
    });

    this.route('show', {
      path: ':plantilladeflujo_id'
    });
  });
  this.route('flujos', function() {
    this.route('new');

    this.route('edit', {
      path: ':flujo_id/edit'
    });

    this.route('show', {
      path: ':flujo_id'
    });
  });
});

export default Router;
