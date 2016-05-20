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
});

export default Router;

