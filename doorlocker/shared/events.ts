export enum DOOR_INTERACTIONS {
    //client -> server
    DOOR_SET_LOCK = 'Door:SetLock',
    DOOR_SET_UNLOCK = 'Door:SetUnlock',
    DOOR_TOGGLE = 'Door:Toggle',

    //server -> client
    DOOR_LOCK = 'Door:SetLock',
    DOOR_UNLOCK = 'Door:SetUnlock',
}
