# SkillrHub Facebook Messenger setup — 5 November 2026

## Website integration
- The homepage has a fixed, accessible Messenger button using the existing Page destination `https://m.me/61591597270383?ref=skillrhub_web`.
- Header/footer/custom resource links use the same referral URL.
- The floating button emits the existing `homepage_conversion_click` analytics event with `action=messenger_click`.
- It uses the approved SkillrHub CSS tokens and never embeds a Meta SDK, iframe or tracking cookie.

## Required Meta Business Suite action (not configured by a GitHub website change)
Open the SkillrHub Facebook Page in Meta Business Suite, then:
1. Go to **Inbox → Automations**.
2. Set up a **Messenger welcome greeting** (if offered) and/or **Instant reply**.
3. Select the **Messenger** channel and save the following text:

👋 Welcome to SkillrHub!

Looking for teaching slides, worksheets or free student practice?

Tell us your year level, topic or curriculum code. We're happy to help you find the right resources!

You can also request a resource we haven't created yet.

4. Test with a Facebook account that has never messaged the Page, then with an existing conversation.

**Platform caveat:** Clicking an `m.me` link opens the conversation. The SkillrHub website cannot force a Facebook Page to send a message on click; Meta determines when the configured greeting is shown or an instant response is sent. Never claim this has been enabled until verified inside Meta Business Suite.

## QA
- Check the homepage button appears in the bottom-right on desktop and mobile without covering the primary search.
- Check click-through opens the correct Facebook Page Messenger thread.
- Check the existing resource request text can still be copied and pasted.
- Verify the analytics event and new user greeting separately.
