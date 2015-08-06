import { swap, updateEntity } from '../store/index';
import { openLock } from '../lock/actions';
import { openFunctionArgsResolver } from '../lock/mode';
import render from './render';
import * as l from '../lock/index';
import * as m from './index';

const NAME = "passwordless-email";

function magiclink(id, ...args) {
  const [options, callback] = openFunctionArgsResolver("magiclink", args);
  options.signInCallback = callback;
  openLock(id, NAME, options);
}

function emailcode(id, ...args) {
  const [options, callback] = openFunctionArgsResolver("emailcode", args);
  options.signInCallback = callback;
  options.modeOptions = {send: "code"};
  openLock(id, NAME, options);
}

function closeHandler(lock) {
  swap(updateEntity, "lock", l.id(lock), m.close);
}

export default {
  name: NAME,
  openMethods: {magiclink: magiclink, emailcode: emailcode},
  render: render,
  closeHandler: closeHandler
};
