# Doorlocker - Athena Framework Plugin
This plugin can be used to lock and unlock doors by pressing a specific key (default "U"). Double doors are also supported.

# Installation

1. Copy Folder "doorlocker" to your athena project under "src/core/plugins/".
2. You have to setup the doors in file "server/config/doorList.ts". The doorHash, modelHash and coordinates of a specific door can be retrieved using Codewalker-
3. The "linkedDoor" data attribute of a door is optional. It can be used to link with another door, if you want to lock/unlock double doors-