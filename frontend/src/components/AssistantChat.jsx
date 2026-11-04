import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, X } from 'lucide-react'
import api, { getErrorMessage } from '../lib/api'

// Quick-start questions shown as chips. One list per portal.
const suggestionsByPortal = {
  'Patient Portal': [
    'When is my next appointment?',
    'Which bills are unpaid?',
    'What medicines am I taking?',
  ],
  'Doctor Portal': [
    'Who are my patients today?',
    'Show my most recent completed visits',
    'How many prescriptions are still pending?',
  ],
  'Admin Portal': [
    'How many appointments are today?',
    'Show unpaid invoices',
    'Which doctor has the most patients?',
  ],
}

// The AI chatbot panel. It slides in from the right on desktop
// and fills the whole screen on phones.
// Questions go to POST /ai/chat. The backend reads this user's own records from the
// database, hands them to the AI model, and returns the answer.
function AssistantChat({ open, onClose, portal }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'ai',
      text: 'Hi! I\'m the BLASTCARE assistant. Ask me a question about your records, appointments or bills.',
    },
  ])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  // Focus the input when the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Press Escape to close
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Always scroll down to the newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  async function send(text) {
    const question = text.trim()
    if (!question || thinking) return

    // The last few messages (without the greeting) give the AI some memory
    const history = messages
      .filter((message) => message.id !== 1)
      .slice(-6)
      .map(({ from, text }) => ({ from, text }))

    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: question }])
    setDraft('')
    setThinking(true)

    try {
      const { data } = await api.post('/ai/chat', { message: question, history })
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'ai', text: data.reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'ai', text: getErrorMessage(error) },
      ])
    } finally {
      setThinking(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    send(draft)
  }

  // Must come AFTER all the hooks above
  if (!open) return null

  const suggestions = suggestionsByPortal[portal] ?? []

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark backdrop. Click it to close. */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <section
        className="card page-enter relative flex h-full w-full flex-col sm:max-w-md sm:rounded-r-none"
        role="dialog"
        aria-label="AI assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
              <Sparkles size={20} />
            </div>
            <div className="leading-tight">
              <h2 className="font-bold">BLASTCARE AI</h2>
              <p className="text-xs text-gray-500">Ask about your data</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close assistant"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <p
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                  message.from === 'user'
                    ? 'rounded-br-md bg-blue-900 text-white'
                    : 'rounded-bl-md bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}

          {thinking && (
            <div className="flex justify-start">
              <p className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2.5 text-sm text-gray-500">
                Thinking...
              </p>
            </div>
          )}

          {/* Suggestion chips: only shown before the first question */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestions.map((text) => (
                <button
                  key={text}
                  onClick={() => send(text)}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:border-blue-700 hover:text-blue-700"
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={500}
              placeholder="Type your question..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              disabled={!draft.trim() || thinking}
              className="rounded-xl bg-blue-900 p-2.5 text-white hover:bg-blue-800 disabled:opacity-50"
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-gray-400">
            AI can make mistakes. It is not a substitute for medical advice.
          </p>
        </form>
      </section>
    </div>
  )
}

export default AssistantChat
