import {branches} from "../../data"
import {Markup, Scenes} from "telegraf"
import {AppContext} from "telegram/types/session/AppContext"

export const navigationScene = new Scenes.BaseScene<AppContext>("navigation-scene")

//start
navigationScene.enter(async ctx => {
  const buttons = branches.map(b => Markup.button.callback(b.name, `branch:${b.name}`))
  const keyboard = Markup.inlineKeyboard(buttons, {columns: 2})

  return ctx.reply(ctx.i18n.t("navigation.message"), keyboard)
})

navigationScene.action(/^branch:(.+)$/i, async ctx => {
  try {
    await ctx.answerCbQuery()
  } catch {}

  const data = ctx.callbackQuery && "data" in ctx.callbackQuery ? ctx.callbackQuery.data : undefined
  const name = data ? data.replace(/^branch:/i, "") : ""
  const branch = branches.find(b => b.name === name)
  if (!branch) {
    return ctx.reply(ctx.i18n.t("navigation.invalid"))
  }

  ctx.session.branch = branch
  try {
    await ctx.deleteMessage()
  } catch {}
  return ctx.scene.enter("branch-scene")
})
