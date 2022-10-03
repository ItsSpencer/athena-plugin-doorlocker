import { IDoor } from '../../shared/interfaces/iDoor';

export const doorList: Array<IDoor> = [
    {
        identifier: "PD Entrance Left",
        doorState: 0, //0: UNLOCKED, 1: LOCKED 
        doorHash: 1215236423,
        modelHash: 3079744621,
        x: 434.7479,
        y: -980.6183,
        z: 30.83926,
        linkedDoor: "PD Entrance Right"
    },
    {
        identifier: "PD Entrance Right",
        doorState: 0,
        doorHash: 3974607307,
        modelHash: 320433149,
        x: 434.7479,
        y: -983.215,
        z: 30.83926,
        linkedDoor: "PD Entrance Left"
    },
    {
        identifier: "PD Office Front",
        doorState: 0,
        doorHash: 1320887792,
        modelHash: 2974090917,
        x: 446.5728,
        y: -980.0104,
        z: 30.8393
    }
]