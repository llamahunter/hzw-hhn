import {
    CodeBlockEvent,
    CodeBlockEvents,
    Component,
    Entity,
    Player,
    PropsDefinition,
    PropTypes
} from "@early_access_api/v1";

const Events = {
    RegisterManager: new CodeBlockEvent<[manager: Entity, index: number]>("registerManager", [PropTypes.Entity, PropTypes.Number]),
    RegisterRoom: new CodeBlockEvent<[index: number, spawnPoint: Entity]>("registerRoom", [PropTypes.Number, PropTypes.Entity]),
    PlayerExited: new CodeBlockEvent<[index: number, player: Player]>("playerExited", [PropTypes.Number, PropTypes.Player]),
}

type RoomProps = {
    spawnPoint: Entity,
    exitTrigger: Entity,
}

class Room extends Component<RoomProps> {
    static propsDefinition: PropsDefinition<RoomProps> = {
        spawnPoint: {type: PropTypes.Entity},
        exitTrigger: {type: PropTypes.Entity},
    }

    manager?: Entity
    index = -1

    start() {
        this.connectCodeBlockEvent(this.entity, Events.RegisterManager, this.onRegisterManager.bind(this))
        this.connectCodeBlockEvent(this.props.exitTrigger, CodeBlockEvents.OnPlayerEnterTrigger, this.onPlayerExitRoom.bind(this))
    }

    onRegisterManager(manager: Entity, index: number) {
        this.manager = manager
        this.index = index
        this.sendCodeBlockEvent(manager, Events.RegisterRoom, index, this.props.spawnPoint)
    }

    onPlayerExitRoom(player: Player) {
        if (this.manager) {
            this.sendCodeBlockEvent(this.manager, Events.PlayerExited, this.index, player)
        } else {
            console.error(`Room number ${this.index} has no manager`)
        }
    }
}

Component.register(Room)
