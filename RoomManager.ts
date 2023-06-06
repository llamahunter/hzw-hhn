import {
    Asset,
    CodeBlockEvent,
    CodeBlockEvents,
    Component,
    Entity, GrabbableEntity, PhysicalEntity,
    Player,
    PropsDefinition,
    PropTypes, Quaternion, SpawnPointGizmo,
    Vec3
} from "@early_access_api/v1";

const Events = {
    RegisterManager: new CodeBlockEvent<[manager: Entity, index: number]>("registerManager", [PropTypes.Entity, PropTypes.Number]),
    RegisterRoom: new CodeBlockEvent<[index: number, spawnPoint: Entity]>("registerRoom", [PropTypes.Number, PropTypes.Entity]),
    PlayerExited: new CodeBlockEvent<[index: number, player: Player]>("playerExited", [PropTypes.Number, PropTypes.Player]),
}

type RoomManagerProps = {
    diningRoom: Asset,
    zigzagHallway: Asset,
    bathroom: Asset,
    neverendingHallway: Asset,
    livingRoom: Asset,
    splitHallway: Asset,
    mudroom: Asset,
    doorTrigger: Entity,
    cornfieldSpawnPoint: Entity,
    reset: Entity,
    initialPosRef: Entity,
    spawnOffset: Vec3,
}

type PendingSpawnOps = {
    type: "spawn",
    index: number,
    roomData: RoomData,
} | {
    type: "despawn",
    room: RoomState,
}

type RoomData = {
    name: string,
    asset: Asset,
}

type RoomState = {
    room: Entity,
    index: number,
    spawnPoint?: SpawnPointGizmo,
    players: Player[],
}

class RoomManager extends Component<RoomManagerProps> {
    static propsDefinition: PropsDefinition<RoomManagerProps> = {
        diningRoom: {type: PropTypes.Asset},
        zigzagHallway: {type: PropTypes.Asset},
        bathroom: {type: PropTypes.Asset},
        neverendingHallway: {type: PropTypes.Asset},
        livingRoom: {type: PropTypes.Asset},
        splitHallway: {type: PropTypes.Asset},
        mudroom: {type: PropTypes.Asset},
        doorTrigger: {type: PropTypes.Entity},
        cornfieldSpawnPoint: {type: PropTypes.Entity},
        reset: {type: PropTypes.Entity},
        initialPosRef: {type: PropTypes.Entity},
        spawnOffset: {type: PropTypes.Vec3},
    }

    roomData: RoomData[] = []
    rooms: RoomState[] = []
    currentPos = Vec3.zero
    maxRoomIndex = 0
    inSpawnOP = false
    pendingSpawnOps: PendingSpawnOps[] = []

    start() {
        this.connectCodeBlockEvent(this.props.doorTrigger, CodeBlockEvents.OnPlayerEnterTrigger, this.onPlayerEnterDoor.bind(this))
        this.connectCodeBlockEvent(this.entity, Events.RegisterRoom, this.onRegisterRoom.bind(this))
        this.connectCodeBlockEvent(this.entity, Events.PlayerExited, this.onPlayerExited.bind(this))
        this.connectCodeBlockEvent(this.props.reset, CodeBlockEvents.OnGrabStart, this.initialSetup.bind(this))
        this.props.reset.as(PhysicalEntity).locked.set(true)
        this.roomData = [
            {name: "Dining Room", asset: this.props.diningRoom},
            {name: "Zig Zag Hallway", asset: this.props.zigzagHallway},
            {name: "Bathroom", asset: this.props.bathroom},
            {name: "Neverending Hallway", asset: this.props.neverendingHallway},
            {name: "Living Room", asset: this.props.livingRoom},
            {name: "Split Hallway", asset: this.props.splitHallway},
            {name: "Mudroom", asset: this.props.mudroom},
        ]
    }

    initialSetup(isRightHand: boolean, player: Player) {
        this.props.reset.as(GrabbableEntity).forceRelease()
        // despawn all existing rooms
        this.rooms.forEach(roomState => {
            this.deleteRoom(roomState)
        })
        this.rooms = []
        this.currentPos = this.props.initialPosRef.position.get()
        this.maxRoomIndex = 0
        // spawn first two rooms
        this.spawnNewRoom()
        this.spawnNewRoom()
    }

    onPlayerEnterDoor(player: Player) {
        const roomState = this.rooms[0]
        if (roomState && roomState.index === 0) {
            this.enterNextRoom(roomState, player)
        } else {
            console.error("Initial room not found")
        }
    }

    onRegisterRoom(index: number, spawnPoint: Entity) {
        const roomState = this.rooms.find(roomState => roomState.index === index)
        if (roomState) {
            roomState.spawnPoint = spawnPoint.as(SpawnPointGizmo)
        } else {
            console.error(`Spawned room ${this.roomData[index].name} not found`)
        }
    }

    enterNextRoom(roomState: RoomState, player: Player) {
        roomState.players.push(player)
        roomState.spawnPoint?.teleportPlayer(player)
        if (roomState.index >= this.maxRoomIndex - 2) {
            // catching up to last spawned room, spawn another
            this.spawnNewRoom()
        }
    }

    onPlayerExited(index: number, player: Player) {
        const roomIndex = this.rooms.findIndex(roomState => roomState.index === index)
        if (roomIndex < 0) {
            console.error("Exited room not found?")
        } else {
            // remove player from room
            const currentRoomState = this.rooms[roomIndex]
            removeValue(currentRoomState.players, player)
            if (index < this.roomData.length - 1) {
                const nextRoomState = this.rooms[roomIndex + 1]
                this.enterNextRoom(nextRoomState, player)
            } else {
                // exited the house
                this.props.cornfieldSpawnPoint.as(SpawnPointGizmo).teleportPlayer(player)
            }
            if (this.rooms[0] == currentRoomState && currentRoomState.players.length === 0) {
                // no more players in the first room, delete it
                // (but wait a few seconds for player to spawn out)
                this.async.setTimeout(() => {
                    this.pendingSpawnOps.push({
                        type: "despawn",
                        room: currentRoomState,
                    })
                    this.checkPendingSpawnOps()
                }, 3000)
                this.rooms.shift()
            }
        }
    }

    private spawnNewRoom() {
        if (this.maxRoomIndex < this.roomData.length) {
            const index = this.maxRoomIndex++
            const roomData = this.roomData[index]
            this.pendingSpawnOps.push({
                type: "spawn",
                index: index,
                roomData: roomData,
            })
            this.checkPendingSpawnOps()
        } else {
            console.log("no more rooms to spawn")
        }
    }

    checkPendingSpawnOps() {
        if (!this.inSpawnOP) {
            const spawnOp = this.pendingSpawnOps.shift()
            if (spawnOp) {
                switch (spawnOp.type) {
                    case "spawn":
                        this.spawnRoom(spawnOp.index, spawnOp.roomData)
                        break
                    case "despawn":
                        this.deleteRoom(spawnOp.room)
                        break
                }
            }
        } else {
            console.log("in spawn op, waiting")
        }
    }

    private spawnRoom(index: number, roomData: RoomData) {
        this.world.ui.showPopupForEveryone("Spawning " + roomData.name, 3)
        this.inSpawnOP = true
        this.world.spawnAsset(roomData.asset, this.currentPos, Quaternion.fromEuler(new Vec3(0, 90, 0))).then(
            (objects) => {
                this.popup(roomData.name, true, true)
                const roomState: RoomState = {
                    index: index,
                    room: objects[0],
                    players: [],
                }
                this.rooms.push(roomState)
                this.sendCodeBlockEvent(roomState.room, Events.RegisterManager, this.entity, index)
                this.inSpawnOP = false
                this.checkPendingSpawnOps()
            },
            () => {
                this.popup(roomData.name, true, false)
                this.inSpawnOP = false
                this.checkPendingSpawnOps()
            }
        )
        this.currentPos.addInPlace(this.props.spawnOffset)
    }

    private deleteRoom(roomState: RoomState) {
        const name = this.roomData[roomState.index].name
        this.inSpawnOP = true
        this.world.deleteAsset(roomState.room, true).then(
            () => {
                this.popup(name, false, true)
                this.inSpawnOP = false
                this.checkPendingSpawnOps()
            },
            () => {
                this.popup(name, false, false)
                this.inSpawnOP = false
                this.checkPendingSpawnOps()
            }
        )
    }

    popup(name: string, spawned: boolean, success:boolean) {
        if (success) {
            this.world.ui.showPopupForEveryone(`${name} ${spawned ? "spawned" : "despawned"}`, 3)
        } else {
            this.world.ui.showPopupForEveryone(`Failed to ${spawned ? "spawn" : "despawn"} ${name}`, 3)
        }
    }
}

function removeValue<T>(array: T[], value: T) {
    const index = array.indexOf(value)
    if (index >= 0) {
        array.splice(index, 1)
    }
}

Component.register(RoomManager)
