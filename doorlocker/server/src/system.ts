import * as alt from 'alt-server';
import { PlayerEvents } from '../../../../server/events/playerEvents';
import { ATHENA_EVENTS_PLAYER } from '../../../../shared/enums/athenaEvents';
import { Athena } from '../../../../server/api/athena';
import { DOOR_INTERACTIONS } from '../../shared/events';
import { DOOR_CONFIG } from '../../shared/config';
import { IDoor } from '../../shared/interfaces/iDoor';
import { doorList } from '../config/doorList';

class Logger {
    static log(msg: string) {
        if (DOOR_CONFIG.LOGGING) {
            alt.log(msg);
        }
    }
}

export class DoorSystem {
    /**
     * Initializes the Event Handlers
     *
     * @static
     * @memberof DoorSystem
     */
    static init() {
        Logger.log("DoorSystem initialized.");
        alt.onClient(DOOR_INTERACTIONS.DOOR_SET_LOCK, DoorSystem.lockDoor);
        alt.onClient(DOOR_INTERACTIONS.DOOR_SET_UNLOCK, DoorSystem.unlockDoor);
        alt.onClient(DOOR_INTERACTIONS.DOOR_TOGGLE, DoorSystem.toggleDoor);

        //sync door states with new connected players
        PlayerEvents.on(ATHENA_EVENTS_PLAYER.SELECTED_CHARACTER, DoorSystem.syncDoors);
    }

    /**
     * Send lock state of door to all players
     *
     * @static
     * @param {alt.Player} player
     * @param {IDoor} door
     * @memberof DoorSystem
     */
    static lockDoor(player: alt.Player, door: IDoor) {
        alt.emitAllClients(DOOR_INTERACTIONS.DOOR_LOCK, door);
        Logger.log("Player " + player.data._id + " locked door " + door.doorHash);
    }

    /**
     * Send unlock state of door to all players
     *
     * @static
     * @param {alt.Player} player
     * @param {IDoor} door
     * @memberof DoorSystem
     */
    static unlockDoor(player: alt.Player, door: IDoor) {
        alt.emitAllClients(DOOR_INTERACTIONS.DOOR_UNLOCK, door);
        Logger.log("Player " + player.data._id + " unlocked door " + door.doorHash);
    }

    /**
    * Toggle door
    *
    * @static
    * @param {alt.Player} player
    * @memberof DoorSystem
    */
    static toggleDoor(player: alt.Player) {
        Logger.log("doorList: " + doorList.toString());

        //get nearest door
        let doorListDistance = doorList.map(function (door: IDoor) { return player.pos.distanceTo({ x: door.x, y: door.y, z: door.z }); });
        let index: number = doorListDistance.indexOf(Math.min(...doorListDistance));
        Logger.log("index: " + index);
        let door: IDoor = doorList[index];
        Logger.log("door: " + door.doorHash);

        //is door out of radius?
        if (player.pos.distanceTo({ x: door.x, y: door.y, z: door.z }) > 2) {
            return;
        }

        //toggle door
        doorList[index].doorState = (doorList[index].doorState === 0) ? 1 : 0;

        //emit door state to players
        DoorSystem.emitDoor(player, doorList[index]);

        //get linked door and toggle its state
        let doubleDoor: boolean = false;
        let linkedIndex = -1;
        if (doorList[index].linkedDoor !== undefined) {
            linkedIndex = doorList.findIndex(x => x.identifier === doorList[index].linkedDoor);

            //toggle linked door
            doorList[linkedIndex].doorState = doorList[index].doorState;

            //emit linked door state to players
            DoorSystem.emitDoor(player, doorList[linkedIndex]);
            doubleDoor = true;
        }

        //emit success of door state change to initiating player
        let operation: string = (doorList[index].doorState === 0) ? "aufgeschlossen" : "zugeschlossen";
        if (doubleDoor === false) {
            Athena.player.emit.notification(player, "Tür " + operation);
            Logger.log("Spieler " + player.data._id + " hat Tür " + doorList[index].doorHash + " " + operation);
        } else {
            Athena.player.emit.notification(player, "Doppeltür " + operation);
            Logger.log("Spieler " + player.data._id + " hat Tür " + doorList[index].doorHash + " und " + doorList[linkedIndex].doorHash + " " + operation);
        }
    }

    /**
    * Emit door state to players
    *
    * @static
    * @param {IDoor} door
    * @memberof DoorSystem
    */
    static emitDoor(player: alt.Player, door: IDoor) {
        if (door.doorState === 0) {
            alt.emitAllClients(DOOR_INTERACTIONS.DOOR_UNLOCK, door);
        } else if (door.doorState === 1) {
            alt.emitAllClients(DOOR_INTERACTIONS.DOOR_LOCK, door);
        }
    }

    /**
    * Sync door states with players
    *
    * @static
    * @param {alt.Player} player
    * @memberof DoorSystem
    */
    static syncDoors(player: alt.Player) {
        doorList.forEach(door => {
            DoorSystem.emitDoor(player, door);
        })
    }
}