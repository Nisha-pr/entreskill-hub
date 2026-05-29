import React, { useState, useRef, useEffect } from 'react'

const MentorChat = ({ mentor, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'mentor',
      text: `Hi! I'm ${mentor.name}, specialized in ${mentor.expertise}. How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulated mentor reply
    setTimeout(() => {
      const replies = [
        `Great question! Based on your interest in ${mentor.expertise}, I recommend starting small and validating your idea first.`,
        'I would suggest focusing on your local market before expanding. What is your current budget?',
        'That is a great approach! Many of my students started exactly like this.',
        `In ${mentor.expertise}, consistency is key. Let me know if you need a detailed plan.`,
        'Happy to schedule a one-on-one session to discuss this in detail!'
      ]
      const reply = {
        id: messages.length + 2,
        sender: 'mentor',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, reply])
    }, 1200)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col" style={{ height: '560px' }}>

        {/* Header */}
        <div className="bg-indigo-600 text-white px-5 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">
              {mentor.emoji}
            </div>
            <div>
              <p className="font-semibold">{mentor.name}</p>
              <p className="text-indigo-200 text-xs">{mentor.expertise}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-green-300">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              Online
            </span>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default MentorChat