import * as alt from 'alt-client';
import * as native from 'natives';
import { IndexDescription } from 'mongodb';
import { DOOR_INTERACTIONS } from '../../shared/events';
import { DOOR_CONFIG } from '../../shared/config';
import { IDoor } from '../../shared/interfaces/iDoor';
import { KeybindController } from '../../../../client/events/keyup';
import { KEY_BINDS } from '../../shared/keyBinds';

class Logger {
    static log(msg: string) {
        if (DOOR_CONFIG.LOGGING) {
            alt.log(msg);
        }
    }
}

class DoorSystem {
    static init() {
        Logger.log("DoorSystem initialized.");
        alt.onServer(DOOR_INTERACTIONS.DOOR_LOCK, DoorSystem.lockDoor);
        alt.onServer(DOOR_INTERACTIONS.DOOR_UNLOCK, DoorSystem.unlockDoor);
        KeybindController.registerKeybind({ key: KEY_BINDS.TOGGLE_DOOR, singlePress: DoorSystem.toggleDoor });
    }

    static checkRegistered(door: IDoor): boolean {
        let result: number = native.doorSystemGetDoorState(door.doorHash);

        if (result === -1) {
            native.addDoorToSystem(door.doorHash, door.modelHash, door.x, door.y, door.z, false, false, false);

            Logger.log("Door " + door.doorHash + " registered.");
            return true;
        }

        return true;
    }

    static lockDoor(door: IDoor) {
        DoorSystem.checkRegistered(door);

        native.doorSystemSetDoorState(door.doorHash, 1, false, true);
        Logger.log("Door " + door.doorHash + " locked.");
    }

    static unlockDoor(door: IDoor) {
        DoorSystem.checkRegistered(door);

        native.doorSystemSetDoorState(door.doorHash, 0, false, true);
        Logger.log("Door " + door.doorHash + " unlocked.");
    }

    static toggleDoor() {
        alt.emitServer(DOOR_INTERACTIONS.DOOR_TOGGLE);

        Logger.log("Door near player toggled.");
    }
}

DoorSystem.init();