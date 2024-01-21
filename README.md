# Observer Pattern Implementation

This repository provides implementations of the Observer Pattern in TypeScript. The Observer Pattern is a behavioral design pattern where an object, known as the subject, maintains a list of its dependents, called observers, that are notified of any state changes, typically by calling one of their methods.

## Files

- **event-bus.ts**: Contains the implementation of an event bus, a simple mechanism to allow different components of a system to communicate without being directly aware of each other.
- **observable-networking.ts**: Demonstrates how to extend the Observer Pattern to handle networking scenarios. It includes a basic observable server that can notify connected clients of events.

- **observable.ts**: Provides a generic implementation of an observable class that allows objects to subscribe and unsubscribe from changes and be notified when the state of the observable object changes.
  The `Observable` class allows you to subscribe to changes and control the order of notification based on priority.
