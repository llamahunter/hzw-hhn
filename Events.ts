import {CodeBlockEvent, Entity, Player, PropTypes} from "@early_access_api/v1";

export const Events = {
    RegisterManager: new CodeBlockEvent<[manager: Entity, index: number]>("registerManager", [PropTypes.Entity, PropTypes.Number]),
    RegisterRoom: new CodeBlockEvent<[index: number, spawnPoint: Entity]>("registerRoom", [PropTypes.Number, PropTypes.Entity]),
    PlayerExited: new CodeBlockEvent<[index: number, player: Player]>("playerExited", [PropTypes.Number, PropTypes.Player]),
}
