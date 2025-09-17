import {Scenes} from "telegraf"
import {AppContext} from "telegram/types/session/AppContext"
import {navigationScene} from "telegram/scenes/navigation"
import { branchScene } from "telegram/scenes/branch"

// Функции сцены
export const {enter, leave} = Scenes.Stage
// Сцены
export const scenesStage = new Scenes.Stage<AppContext>(
  [
    navigationScene,
    branchScene
  ],
  {
    ttl: 7200
  }
)
