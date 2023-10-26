import React, { useState } from 'react'
import { 
    MainContainer, 
    ChatContainer, 
    Message, 
    MessageList, 
    MessageInput, 
    TypingIndicator 
} from '@chatscope/chat-ui-kit-react'
import axios from 'axios';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import './Chatbot.css'
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const openFull = { position: 'fixed', bottom: '0%', right: '10%', height: "35%", zIndex: 3 }
const minimize = { position: 'fixed', bottom: '0%', right: '10%', height: 50, zIndex: 3 }

function Chatbot() {
    const chatGPTApiKey = process.env.REACT_APP_CHATGPT_API_KEY

    const [open, setOpen] = useState(false)
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello and welcome to FStore!",
            sender: "HelpBot",
        }
    ])

    async function handleSendMessage(message) {
        const newMessage = {
            message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage]

        setMessages(newMessages)
        setTyping(true)

        await processMessagesToChatGPT(newMessages)
    }

    async function processMessagesToChatGPT(messages) {
        let apiMessages = messages.map(message => {
            let role = ''

            if (message.sender === 'HelpBot')
            {
                role = 'assistant'
            } 
            else 
            {
                role = 'user'
            }

            return { role, content: message.message }
        })

        const systemMessage = {
            role: "system",
            content: "speak like a friendly and understanding shopkeeper"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        const res = await axios.create({
            baseURL: `https://api.openai.com/v1/`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + chatGPTApiKey
            }
        })
        .post(
            `chat/completions`, 
            JSON.stringify(apiRequestBody)
        )

        console.log(res.data)
    }

    return (
        <div style={open ? openFull : minimize}>
            { 
                open ? 
                <MainContainer>
                    <header>
                        <div className="left">
                            <img src="/assets/img/chatbot.png" alt="" />
                            <div className='status-ctn'>
                                <h3>HelpBot</h3>
                                <span><div className='status-online'/>Online</span>
                            </div>
                        </div>
                        <div className="right">
                            <MinimizeIcon 
                                onClick={() => setOpen(false)} 
                                className='icon'
                            />
                        </div>
                    </header>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={
                                typing ?
                                <TypingIndicator content="Helpbot is generating a response" /> :
                                null
                            }
                        >
                            {messages.map((message, index) => (
                                <Message key={index} model={message} />
                            ))}
                        </MessageList>
                        <MessageInput 
                            placeholder='Type your message here...'
                            onSend={handleSendMessage}
                        />
                    </ChatContainer>
                </MainContainer> 
                :
                <MainContainer>
                    <header>
                        <div className="left">
                            <img src="/assets/img/chatbot.png" alt="" />
                            <div className='status-ctn'>
                                <h3>HelpBot</h3>
                                <span><div className='status-online'/>Online</span>
                            </div>
                        </div>
                        <div className="right">
                            <OpenInFullIcon 
                                style={{fontSize: 18, marginRight: 5, marginTop: 5}}
                                className='icon'
                                onClick={() => setOpen(true)} 
                            />
                        </div>
                    </header>
                </MainContainer>
            }
        </div>
    )
}

export default Chatbot
