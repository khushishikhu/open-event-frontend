import Ember from 'ember';
import moment from 'moment';
import { licenses, timezones } from 'open-event-frontend/utils/dictionary';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizard from 'open-event-frontend/mixins/event-wizard';
import { orderBy } from 'lodash';

const { Component, computed, on } = Ember;

export default Component.extend(FormMixin, EventWizard, {

  currentTimezone: moment.tz.guess(),

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : 'Please give your event a name'
            }
          ]
        },
        start_date: {
          rules: [
            {
              type   : 'empty',
              prompt : 'Please tell us when your event starts'
            },
            {
              type   : 'date',
              prompt : 'Please give an valid start date'
            }
          ]
        },
        end_date: {
          rules: [
            {
              type   : 'empty',
              prompt : 'Please tell us when your event ends'
            },
            {
              type   : 'date',
              prompt : 'Please give an valid end date'
            }
          ]
        },
        start_time: {
          depends : 'start_date',
          rules   : [
            {
              type   : 'empty',
              prompt : 'Please give a start time'
            }
          ]
        },
        end_time: {
          depends : 'end_date',
          rules   : [
            {
              type   : 'empty',
              prompt : 'Please give an end time'
            }
          ]
        }
      }
    };
  },

  timezones: computed(function() {
    return timezones;
  }),

  licenses: computed(function() {
    return orderBy(licenses, 'name');
  }),

  actions: {
    saveDraft() {
      this.$('form').form('validate form');
    },
    moveForward() {
      this.$('form').form('validate form');
    },
    addItem(type, model) {
      this.get(`data.${type}`).pushObject(this.store.createRecord(model));
    },
    removeItem(item, type) {
      item.unloadRecord();
      this.get(`data.${type}`).removeObject(item);
    }
  },

  _init: on('init', function() {
    this.set('data', this.getBasicDetails());
  })
});
