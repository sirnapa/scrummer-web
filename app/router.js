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
  this.route('actividads', function() {
    this.route('new');

    this.route('edit', {
      path: ':actividad_id/edit'
    });

    this.route('show', {
      path: ':actividad_id'
    });
  });
  this.route('sprints', function() {
    this.route('new');

    this.route('edit', {
      path: ':sprint_id/edit'
    });

    this.route('show', {
      path: ':sprint_id'
    });
  });
  this.route('historials', function() {
    this.route('new');

    this.route('edit', {
      path: ':historial_id/edit'
    });

    this.route('show', {
      path: ':historial_id'
    });
  });
  this.route('adjuntos', function() {
    this.route('new');

    this.route('edit', {
      path: ':adjunto_id/edit'
    });

    this.route('show', {
      path: ':adjunto_id'
    });
  });
  this.route('userstories', function() {
    this.route('new');

    this.route('edit', {
      path: ':userstory_id/edit'
    });

    this.route('show', {
      path: ':userstory_id'
    });
  });
  this.route('rols', function() {
    this.route('new');

    this.route('edit', {
      path: ':rol_id/edit'
    });

    this.route('show', {
      path: ':rol_id'
    });
  });
  this.route('usuarios', function() {
    this.route('new');

    this.route('edit', {
      path: ':usuario_id/edit'
    });

    this.route('show', {
      path: ':usuario_id'
    });
  });
});

export default Router;
