export enum Event {
    OPEN_MODAL,
    CLOSE_MODAL,
}

class EventService  {

    private events: Map<Event, Array<Function>>;

    constructor() {
        this.events = new Map<Event, Array<Function>>();
    }

    publish(key: Event, details: Record<string, any> = {}) {
        const events = this.events.get(key);
        if (events === undefined)
            return;

        events.forEach(x => x(details));
    }

    subscribe(key: Event, func: Function) {
        const events = this.events.get(key);

        if (events === undefined) {
            this.events.set(key, [ func ]);
            return;
        }

        this.events.set(key, events.concat([ func ]));
    }

    unsubscribe(key: Event, func: Function) {
        const events = this.events.get(key);
        if (events === undefined)
            return;

        this.events.set(key, events.filter(x => x !== func));
    }
}

export const eventService = new EventService();
