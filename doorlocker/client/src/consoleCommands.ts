import * as alt from 'alt-client';
import * as native from 'natives';
import { World } from '../../../../client/systems/world';
import { Athena } from '../../../../server/api/athena';
import { PLAYER_SYNCED_META } from '../../../../shared/enums/playerSynced';
import { ConsoleCommander } from '../../../../shared/utility/consoleCommander';
import { DOOR_INTERACTIONS } from '../../shared/events';
import { DOOR_CONFIG } from '../../shared/config';
import { IDoor } from '../../shared/interfaces/iDoor';

class ClientPlugin {
    static init() {
        //ConsoleCommander.init(alt); //is called in plugin 'core-commands'
        ConsoleCommander.registerConsoleCommand('/createdoor', ClientPlugin.createdoor);
        ConsoleCommander.registerConsoleCommand('/lockdoorserver', ClientPlugin.lockDoorServer);
        ConsoleCommander.registerConsoleCommand('/unlockdoorserver', ClientPlugin.unlockDoorServer);
    }

    //createdoor 1320887792 2974090917 446.5728 -980.0104 30.8393
    static async createdoor(doorHash_: string | number, modelHash_: string | number, x_: string | number, y_: string | number, z_: string | number) {
        let doorHash = +doorHash_;
        let modelHash = +modelHash_;
        let x = +x_;
        let y = +y_;
        let z = +z_;
        native.addDoorToSystem(doorHash, modelHash, x, y, z, false, false, false);
    }

    //lockdoorserver 1320887792 2974090917 446.5728 -980.0104 30.8393
    static async lockDoorServer(doorHash_: string | number, modelHash_: string | number, x_: string | number, y_: string | number, z_: string | number) {
        let door: IDoor = {
            doorHash: Number(doorHash_),
            modelHash: Number(modelHash_),
            x: Number(x_),
            y: Number(y_),
            z: Number(z_),
        }

        alt.emitServer(DOOR_INTERACTIONS.DOOR_SET_LOCK, door);
    }

    //unlockdoorserver 1320887792 2974090917 446.5728 -980.0104 30.8393
    static async unlockDoorServer(doorHash_: string | number, modelHash_: string | number, x_: string | number, y_: string | number, z_: string | number) {
        let door: IDoor = {
            doorHash: Number(doorHash_),
            modelHash: Number(modelHash_),
            x: Number(x_),
            y: Number(y_),
            z: Number(z_),
        }

        alt.emitServer(DOOR_INTERACTIONS.DOOR_SET_UNLOCK, door);
    }

    //entity hash: 1215236423, 1320887792
    //model hash: 3079744621, 2974090917
}

ClientPlugin.init();
