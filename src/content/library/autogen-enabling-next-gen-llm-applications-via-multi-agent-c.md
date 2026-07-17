---
title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
authors:
  - "Wu et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/autogen-multi-agent.png"
synopsis: "AutoGen, developed at Microsoft Research, is an open-source framework for building LLM applications through multi-agent conversation. It introduces conversable agents that can be backed by LLMs, human inputs, tools, or combinations thereof, and a conversation programming paradigm that unifies multi-agent workflows through a shared messaging interface, enabling developers to compose complex, flexible agent systems for a broad range of tasks."
takeaways:
  - "AutoGen defines conversable agents as entities with unified send, receive, and generate-reply interfaces that can hold multi-turn conversations autonomously or solicit human input at configurable points, supporting both static and dynamic conversation flows across heterogeneous agent types."
  - "Conversation programming in AutoGen combines two concepts, conversation-centric computation where agents take actions relevant to the current conversation state, and conversation-driven control flow where the sequence of agent interactions is determined by the ongoing dialogue rather than a hardcoded script."
  - "On the MATH benchmark with GPT-4, AutoGen achieves a 69.48% success rate on 120 level-5 problems, outperforming ChatGPT with Code Interpreter, ChatGPT with Plugin, vanilla GPT-4, and LangChain ReAct, demonstrating that built-in multi-agent coordination improves mathematical problem solving."
  - "For a retrieval-augmented question answering task on the Natural Questions dataset with GPT-3.5, AutoGen with interactive retrieval achieves an F1 of 66.65% and recall of 62.59%, compared to 25.88% F1 and 15.12% recall for DPR without interactive retrieval, highlighting the value of iterative context updates."
  - "In a multi-agent coding application built on OptiGuide, a three-agent system with a Commander, Writer, and Safeguard improves F1 score for identifying unsafe code by 8% with GPT-4 and 35% with GPT-3.5-turbo compared to a single-agent ablation, and reduces workflow code from over 430 lines to 100 lines."
  - "AutoGen supports flexible conversation patterns including two-agent chat, hierarchical chat, and dynamic group chat via a GroupChatManager that selects speakers dynamically, enabling applications ranging from math tutoring with expert escalation to conversational chess with grounding agents."
notionId: "3a0176cc-7864-81bf-8c4c-c190edb45ceb"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
