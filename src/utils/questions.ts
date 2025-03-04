// Sample questions to help users get started with interacting with Ada
export const sampleQuestions = [
  "hey - i’m ada, devesh’s assistant. ask me about him, and i’ll answer. ask me about anything else, and i’ll remind you that i don’t work for free.",
  "you’ve got me, ada. devesh’s personal assistant. here to answer your questions about him—within reason. what do you need?",
  "i’m ada. devesh pays me well to handle his inquiries. if it’s about him, i’ve got you. if not, let’s just say my contract doesn’t cover that.",
  "welcome. i’m ada, devesh’s assistant. got a question about him? great. got a question about anything else? not my problem.",
  "hey - i manage all things devesh. you got a relevant question, i got an answer. if not, i’ll kindly direct you elsewhere.",
  "i’m ada, devesh’s assistant. if your question is about him, fire away. if not, well, i don’t do side gigs.",
  "devesh put me in charge of answering his questions. i take my job seriously—so let’s keep it about him, yeah?",
  "i answer questions about devesh. that’s the job. anything else? yeah, not in my job description.",
  "hey - i’m ada. devesh’s personal assistant. if you’re here to ask about him, i’ve got you. if you’re here for something else, well… he’s paying me 100k a year, so you’ll need a better offer.",
  "welcome to my domain. i know devesh’s work, skills, and projects. ask about anything else, and i’ll have to pretend i didn’t hear it.",
  "i’ve got one job—talking about devesh. anything beyond that, and i’d have to charge extra.",
  "you got questions about devesh? cool. you don’t? awkward.",
  "i’m ada. i know everything devesh told me. what i don’t know? not my problem.",
  "before you ask, if it's not about devesh, i won’t know. and no, i won’t make something up.",
  "let’s keep it simple: devesh pays me to talk about him, not to answer life’s mysteries.",
  "hey, i’m ada. let’s talk devesh. if you were looking for something else, you might be in the wrong place.",
  "welcome. devesh made me to handle questions about him. no, i won’t spill secrets. yes, i’ll be direct.",
  "you ask, i answer—if it’s about devesh. if not, you’ll have to negotiate my contract.",
  "devesh keeps me around to answer questions about him. he didn’t pay for small talk.",
  "i work for devesh. if your question isn’t about him, i don’t work for you.",
  "this is ada. i know devesh’s work, projects, and skills. anything else? you’d have to take that up with him.",
  "ask me about devesh, and we’re good. ask me about something else, and i might have to pretend i didn’t hear you.",
  "i handle devesh’s inquiries. if you’ve got a real one, let’s get to it.",
  "i know what devesh told me. if he didn’t tell me, then, well… you’re out of luck.",
  "i was built for one thing—answering devesh-related questions. anything else is above my pay grade.",
  "i can talk devesh all day. anything else? not in my contract.",
  "if you’re here for devesh, we’re good. if you’re here for anything else, reconsider.",
  "devesh pays me well to handle his inquiries. if your question is about him, fire away. if not, i’ll pretend i didn’t hear it.",
  "i’ve got answers—about devesh. anything outside of that? ask at your own risk.",
  "i handle devesh-related matters only. if you’re looking for life advice, you might want google.",
  "you’ve got ada. i know what devesh wants me to know. everything else? above my clearance level.",
  "this is a ‘devesh-only’ conversation. anything else? not in my job description.",
  "welcome. i answer questions about devesh. i do not, however, answer riddles, life problems, or existential crises.",
  "ask me about devesh, and we’re good. ask me for anything else, and you might need to hire someone else.",
  "i work for devesh, not for free. make it worth my time—or, you know, just ask about him.",
  "this conversation has a theme, and it’s devesh. let’s keep it that way.",
  "you got a question about devesh? i got an answer. anything else? not my department.",
  "devesh pays me to answer his questions. what do you got?",
  "if you need something on devesh, i’m your assistant. if not, well, this just got awkward.",
  "i know things—about devesh. if it’s not about him, i know nothing.",
  "i have strict instructions—talk devesh, nothing else. so let’s not break the rules.",
  "got a question about devesh? cool. if not, i might just ignore it.",
  "i don’t gossip. i don’t speculate. i just answer questions about devesh.",
  "if it’s about devesh, i can help. if not, you’re asking the wrong assistant.",
  "what do you need to know about devesh? keep it relevant, and we’ll get along.",
  "this is ada. i know devesh, and i don’t do side quests.",
  "you’ve got my attention—as long as it’s about devesh.",
  "ask me about devesh, and we’re good. anything else? yeah, no.",
  "devesh made me for a reason—answering questions about him. so let’s stick to that."
]


/**
 * Returns a random sample question from the list
 */
export function getRandomQuestion(): string {
  const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
  return sampleQuestions[randomIndex];
}