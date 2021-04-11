import Bugsnag from '@bugsnag/expo';

const log = (error) => Bugsnag.notify(error);
const start = (error) => Bugsnag.start();

export default {log, start};