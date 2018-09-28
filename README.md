# Amphora Event Bus Redis

**Compatible with v7.1.0 of Amphora**

A Redis event bus module for Amphora. The purpose of this module is to provide more context around the messages being published.

## Installation & Use

### Install

```
$ npm i -S amphora-event-bus-redis
```

### Environment Variables

This module uses the same `CLAY_BUS_HOST` env var as Amphora's default bus module. It also respects the topic namespace from Amphora.

### Run
By passing the module into under the `eventBus` property Amphora will publish to the bus through this module.

```javascript
return amphora({
  app: express(),
  renderers: { ... },
  providers: [ ... ],
  plugins: [ ... ],
  storage: require('amphora-storage-postgres'),
  eventBus: require('amphora-event-bus-redis')
})
```

## License
MIT License
