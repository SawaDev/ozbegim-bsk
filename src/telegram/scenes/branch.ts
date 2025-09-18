import {Markup, Scenes} from "telegraf"
import {AppContext} from "telegram/types/session/AppContext"

export const branchScene = new Scenes.BaseScene<AppContext>("branch-scene")

branchScene.enter(async ctx => {
  const contacts = ctx.session.branch?.contacts || []
  const serviceButtons = contacts.map(c => Markup.button.callback(c.title, `service:${c.title}`))
  const backButton = Markup.button.callback(ctx.i18n.t("other.back"), "branch:back")
  const keyboard = Markup.inlineKeyboard([...serviceButtons, backButton], {columns: 2})

  return ctx.reply(ctx.i18n.t("branch.message"), keyboard)
})

branchScene.action(/^service:(.+)$/i, async ctx => {
  try {
    await ctx.answerCbQuery()
  } catch {}
  const data = ctx.callbackQuery && "data" in ctx.callbackQuery ? ctx.callbackQuery.data : undefined
  const title = data ? data.replace(/^service:/i, "") : ""
  const contact = ctx.session.branch?.contacts.find(c => c.title === title)
  if (!contact) return
  const message = `${contact.title}\n${contact.employees
    .map(
      e =>
        `${e.name} ${e.work_time ? `\nIsh vaqti: ${e.work_time}` : ""} ${
          e.phone ? `\nTelefon: ${e.phone}` : ""
        }`
    )
    .join("\n\n")}`
  await ctx.reply(message)
})

branchScene.action("branch:back", async ctx => {
  try {
    await ctx.answerCbQuery()
  } catch {}
  try {
    await ctx.deleteMessage()
  } catch {}
  return ctx.scene.enter("navigation-scene")
})
