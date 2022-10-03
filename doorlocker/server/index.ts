import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { DoorSystem } from './src/system';

const PLUGIN_NAME = 'Doorlocker';
const PLUGIN_AUTHOR = 'Spencer';
PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    DoorSystem.init();

    alt.log(`~lg~CORE ==> ${PLUGIN_NAME} by ${PLUGIN_AUTHOR} was loaded!`);
});
