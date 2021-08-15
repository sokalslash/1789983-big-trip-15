import AbstractView from './abstract.js';

const createMessageClickNewEvent = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class NoEventsTrip extends AbstractView {
  getTemplate() {
    return createMessageClickNewEvent();
  }
}
