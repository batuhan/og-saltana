(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{363:function(t,a,s){"use strict";s.r(a);var e=s(45),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"workflows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#workflows"}},[t._v("#")]),t._v(" Workflows "),s("Badge",{attrs:{text:"Beta",type:"tip"}})],1),t._v(" "),s("p",[t._v("Stelace Workflows are the fastest way to run automated logic empowering "),s("RouterLink",{attrs:{to:"/command/events.html"}},[t._v("Events")]),t._v(", in a serverless fashion.")],1),t._v(" "),s("p",[t._v("Events trigger your appropriate Workflows, meaning JavaScript logic is executed on our servers, as it would be with a service like Zapier or AWS Lambda, but natively leveraging "),s("em",[t._v("all Stelace API endpoints")]),t._v(" and external systems as well.")]),t._v(" "),s("p",[t._v("Here is a working example taken from "),s("a",{attrs:{href:"https://github.com/stelace/heroes-platform-demo",target:"_blank",rel:"noopener"}},[t._v("Heroes starter kit"),s("OutboundLink")],1),t._v(".\nStelace team gets notified via Slack in real-time when a visitor flags any hero:")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://stelace-instant-files.s3.amazonaws.com/p/238380/live/dev/cd/images/06b526d096a8f4ac93f54a1951dd7f15-hero-flag-slack.png",alt:"Heroes Demo Hero flag notification on Slack"}})]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Sample Workflow object")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"flagVisitorHero"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  description"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Flags hero using custom Event"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  event"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"flag_hero"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// custom Event name triggering this Workflow")]),t._v("\n  context"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"slackVariables"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  computed"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Using simple JavaScript expressions and lodash")]),t._v("\n    shouldFlag"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"!asset.platformData.createdByStelace && _.get(asset, 'metadata.flags', 0) > 0\"")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  run"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"flag"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      description"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Deactivates Hero Asset if already flagged before."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      endpointMethod"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PATCH"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      endpointUri"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/assets/${asset.id}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      endpointPayload"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        active"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"computed.shouldFlag ? false : undefined"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        metadata"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          flags"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"_.get(asset, 'metadata.flags', 0) + 1\"")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"flagSlackNotif"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      description"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Notify Team on Slack when some hero is flagged."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      endpointMethod"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      skip"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"!env.SLACK_WEBHOOK_URL"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// secured environment variables set in Stelace Dashboard")]),t._v("\n      endpointUri"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"${env.SLACK_WEBHOOK_URL}"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      endpointPayload"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"`${asset.name} [${asset.id}] flagged on <heroes.demo.stelace.com|live demo>.`"')]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("For more details about Workflows, you can have a look at our "),s("a",{attrs:{href:"https://docs.api.stelace.com/?version=latest#1e9c7421-7af5-4b1f-b16a-8c62a07125e7",target:"_blank",rel:"noopener"}},[t._v("API reference "),s("Badge",{attrs:{text:"API",type:"tip"}}),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("h2",{attrs:{id:"environment-variables"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#environment-variables"}},[t._v("#")]),t._v(" Environment variables")]),t._v(" "),s("p",[t._v("Workflows can have environment variables organized in "),s("em",[t._v("contexts")]),t._v(" to safely inject secrets and other values during execution without hard-coding them in Workflow "),s("code",[t._v("run")]),t._v(" object.")]),t._v(" "),s("p",[t._v("In the example above, we use a context named "),s("code",[t._v("slackVariables")]),t._v(" holding "),s("code",[t._v("SLACK_WEBHOOK_URL")]),t._v(" variable. Environment variables loaded from "),s("code",[t._v("context")]),t._v(" can be accessed using "),s("code",[t._v("env.")]),t._v(" prefix in Workflows.")]),t._v(" "),s("p",[t._v("To set a context to be used in Workflows, "),s("a",{attrs:{href:"https://docs.api.stelace.com/?version=latest#5cb56bef-60f9-4842-874b-f8c05c63f2d4",target:"_blank",rel:"noopener"}},[t._v("private Configuration API "),s("Badge",{attrs:{text:"API",type:"tip"}}),s("OutboundLink")],1),t._v(" is the way to go. This requires a secret API key.")])])}),[],!1,null,null,null);a.default=n.exports}}]);