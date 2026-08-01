import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { sendConversationalChat } from '../services/llmEngine';

export default function ConversationalChat({ analysis, currentAnalysis, onClose, userApiKey }) {
  const activeAnalysis = analysis || currentAnalysis || {};

  const [messages, setMessages] = useState([
    {
      sender: "agent",
      reply: `Hello! I am your **TieBreaker AI Counselor**. 
I have analyzed your dilemma: **"${activeAnalysis?.question || 'Your Comparison Dilemma'}"** and recommended **${activeAnalysis?.winner || 'the top option'}**.

Feel free to ask me follow-up questions, run "What-If" scenarios (e.g. *"Do we have automatic watches in all categories?"* or *"What if my budget is cut by 20%?"*), or request domain counseling!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || isSending) return;

    const userText = inputMsg.trim();
    setInputMsg("");

    const newHistory = [
      ...messages,
      { sender: "user", reply: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setMessages(newHistory);
    setIsSending(true);

    try {
      const response = await sendConversationalChat({
        message: userText,
        conversationHistory: newHistory,
        currentAnalysis: activeAnalysis,
        apiKey: userApiKey
      });
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          sender: "agent",
          reply: `Regarding "${userText}": Based on your comparison between ${activeAnalysis?.scoredOptions?.map(o => o.name).join(', ') || 'your options'}, **${activeAnalysis?.winner || 'the winner'}** remains the top recommended choice for durability and value.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center space-x-1.5">
                <span>TieBreaker Conversational Counselor</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">
                Topic: {activeAnalysis?.question || "TieBreaker Decision"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.map((msg, idx) => {
            const isAgent = msg.sender === "agent";
            return (
              <div
                key={idx}
                className={`flex space-x-3 ${isAgent ? 'justify-start' : 'justify-end'}`}
              >
                {isAgent && (
                  <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 self-start shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    isAgent
                      ? 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
                      : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-medium">{msg.reply}</div>
                  <div
                    className={`text-[9px] text-right font-mono ${
                      isAgent ? 'text-slate-500' : 'text-indigo-200'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
                {!isAgent && (
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 self-start shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
          {isSending && (
            <div className="flex items-center space-x-2 text-xs text-indigo-400 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-500/20 w-fit">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Counselor Agent is analyzing your query...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask follow-up, test 'What-if' scenarios, or request advice..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!inputMsg.trim() || isSending}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl transition-all shadow-md shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
