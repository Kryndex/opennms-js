declare const await, describe, beforeEach, it, xit, expect, jest;

import {log,catRoot,setLogLevel} from '../../src/api/Log';
import {LogLevel} from 'typescript-logging';

setLogLevel(LogLevel.Debug, catRoot);

import {Client} from '../../src/Client';

import {OnmsAuthConfig} from '../../src/api/OnmsAuthConfig';
import {OnmsServer} from '../../src/api/OnmsServer';

import {Comparators} from '../../src/api/Comparator';
import {Filter} from '../../src/api/Filter';
import {Restriction} from '../../src/api/Restriction';

import {AlarmDAO} from '../../src/dao/AlarmDAO';

import {MockHTTP19} from '../rest/MockHTTP19';
import {MockHTTP21} from '../rest/MockHTTP21';

const SERVER_NAME='Demo';
const SERVER_URL='http://demo.opennms.org/opennms/';
const SERVER_USER='demo';
const SERVER_PASSWORD='demo';

let opennms : Client, server, auth, mockHTTP, dao : AlarmDAO;

describe('AlarmDAO with v1 API', () => {
  beforeEach((done) => {
    auth = new OnmsAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new OnmsServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP19(server);
    opennms = new Client(mockHTTP);
    dao = new AlarmDAO(mockHTTP);
    Client.getMetadata(server, mockHTTP).then((metadata) => {
      server.metadata = metadata;
      done();
    });
  });
  it('AlarmDAO.get(404725)', () => {
    return dao.get(404725).then((alarm) => {
      expect(alarm.id).toEqual(404725);
    });
  });
  it('AlarmDAO.find(id=404725)', () => {
    const filter = new Filter();
    filter.withOrRestriction(new Restriction('id', Comparators.EQ, 404725));
    return dao.find(filter).then((alarms) => {
      expect(alarms.length).toEqual(1);
    });
  });
  it('AlarmDAO.acknowledge(id=404725)', () => {
    return dao.acknowledge(404725);
  });
  it('AlarmDAO.acknowledge(id=404725, user=ranger)', () => {
    return dao.acknowledge(404725, 'ranger');
  });
  it('AlarmDAO.unacknowledge(id=404725)', () => {
    return dao.unacknowledge(404725);
  });
  it('AlarmDAO.escalate(id=404725)', () => {
    return dao.escalate(404725);
  });
  it('AlarmDAO.clear(id=404725)', () => {
    return dao.clear(404725);
  });
});

describe('AlarmDAO with v2 API', () => {
  beforeEach((done) => {
    auth = new OnmsAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new OnmsServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP21(server);
    opennms = new Client(mockHTTP);
    dao = new AlarmDAO(mockHTTP);
    Client.getMetadata(server, mockHTTP).then((metadata) => {
      server.metadata = metadata;
      done();
    });
  });
  it('AlarmDAO.get(6806)', () => {
    return dao.get(6806).then((alarm) => {
      expect(alarm.id).toEqual(6806);
    });
  });
  it('AlarmDAO.find(id=6806)', () => {
    const filter = new Filter();
    filter.withOrRestriction(new Restriction('alarm.id', Comparators.EQ, 6806));
    return dao.find(filter).then((alarms) => {
      expect(alarms.length).toEqual(1);
      expect(alarms[0].id).toEqual(6806);
    });
  });
  it('AlarmDAO.find(uei=should-not-exist)', () => {
    const filter = new Filter();
    filter.withOrRestriction(new Restriction('alarm.uei', Comparators.EQ, 'should-not-exist'));
    return dao.find(filter).then((alarms) => {
      expect(alarms.length).toEqual(0);
    });
  });
  it('should make the journal and sticky notes available - AlarmDAO.get(82416)', () => {
    return dao.get(82416).then((alarm) => {
      expect(alarm.id).toEqual(82416);
      expect(alarm.sticky.body).toEqual('sticky');
      expect(alarm.journal.body).toEqual('journal');
    });
  });
  it('AlarmDAO.acknowledge(id=404725)', () => {
    return dao.acknowledge(404725);
  });
  it('AlarmDAO.acknowledge(id=404725, user=ranger)', () => {
    return dao.acknowledge(404725, 'ranger');
  });
  it('AlarmDAO.unacknowledge(id=404725)', () => {
    return dao.unacknowledge(404725);
  });
  it('AlarmDAO.escalate(id=404725)', () => {
    return dao.escalate(404725);
  });
  it('AlarmDAO.clear(id=404725)', () => {
    return dao.clear(404725);
  });
});
