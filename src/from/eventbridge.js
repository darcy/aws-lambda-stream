import _ from 'highland';

import { faulty } from '../utils';

export const fromEventBridge = (event) =>

  _([{
    // create a unit-of-work for the single event
    // create a stream to work with the rest of the framework
    record: event,
  }])
    .map(faulty((uow) => {
      const detail = (typeof uow.record.detail === 'string')
        ? JSON.parse(uow.record.detail)
        : uow.record.detail;
      return {
      ...uow,
      event: {
        id: detail.id || uow.record.id,
        ...detail
      },
    }
    }));

// test helper
export const toEventBridgeRecord = (event) => ({
  'version': '0',
  'id': '0',
  'source': 'test',
  // 'account': '0123456789012',
  // 'time': '2020-03-30T08:26:41Z',
  'region': 'us-west-1',
  // 'resources': [],
  'detail-type': event.type,
  'detail': JSON.stringify(event),
});
