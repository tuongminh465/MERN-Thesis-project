import React, { useEffect, useState } from 'react'
import { 
    MainContainer, 
    ChatContainer, 
    Message, 
    MessageList, 
    MessageInput, 
    TypingIndicator 
} from '@chatscope/chat-ui-kit-react'
import axios from 'axios';
import { publicRequest } from '../../requestMethods';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import './Chatbot.css'
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const openFull = { position: 'fixed', bottom: '0%', right: '10%', height: "45%", zIndex: 3 }
const minimize = { position: 'fixed', bottom: '0%', right: '10%', height: 50, zIndex: 3 }

function Chatbot() {
    const chatGPTApiKey = process.env.REACT_APP_CHATGPT_API_KEY

    const [open, setOpen] = useState(true)
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello and welcome to FStore! Feel free to talk to me If you need recommendations.",
            sender: "HelpBot",
        }
    ])
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        async function getInventory() {
            const res = await publicRequest.get(`/products`);
            setInventory(res.data);
        }

        getInventory();
    }, []);

    const generateProductLinks = () => {
        return inventory.map(product => (
            `<a href="/product/${product._id} priceInUSD=${product.price} type=${product.type}">${product.name}</a>`
        )).join(', ');
    };

    let systemMessage = {
        role: "system",
        content: `Speak like a friendly and understanding shopkeeper. Be concise with your dialogue. Use short sentences with easy to understand words. 
        This is the store's inventory: ${generateProductLinks()}. Therefore, if you recommend a product, make sure it's from the store's inventory based on the user's inquiries.
        Ask the user questions about their needs, budget, and other requirements before recommending products.
        Make sure to recommend products with price that is within the user's budget (in USD) and fit the user's requirements.
        When recommending a product, provide the user with the link to the product's details in the form of an HTML <a> tag with the href attribute's value being the route to that product.
        The format should be: <a href="/product/:id">here</a> (:id is the product's _id, which can be found in the inventory collection).
        Do not recommend products that are not in the given inventory. Do not provide a link with a different format.`
    };

    function processMessage(messages) {
        const apiMessages = messages.map(message => {
            let role = ''

            if (message.sender === 'HelpBot') {
                role = 'assistant'
            } 
            else {
                role = 'user'
            }

            return { role, content: message.message }
        })

        return apiMessages
    }

    function renderMessagesFromChatGPT(currentMessages, messageFromChatGPT) {
        const newMessages = [
            ...currentMessages,
            {
                message: messageFromChatGPT,
                sender: 'Helpbot'
            }
        ]

        setMessages(newMessages)
        setTyping(false)
    }

    async function sendMessagesToChatGPT(apiRequestBody) {
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

        return res
    }

    async function processMessagesToChatGPT(newMessages) {
        let apiMessages = processMessage(newMessages)

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        const res = await sendMessagesToChatGPT(apiRequestBody)

        renderMessagesFromChatGPT(newMessages, res.data.choices[0].message.content)
    }

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

    return (
        <div style={open ? openFull : minimize}>
            { 
                open ? 
                <div className='chatbot-ctn'>
                    <header>
                        <div className="left">
                            <img src="/assets/img/chatbot.png" alt="" />
                            <div className='status-ctn'>
                                <h3>FBot</h3>
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
                    <MainContainer>
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
                </div>
                :
                <div className='chatbot-ctn'>
                    <header>
                        <div className="left">
                            <img src="/assets/img/chatbot.png" alt="" />
                            <div className='status-ctn'>
                                <h3>FBot</h3>
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
                    <MainContainer />
                </div>
            }
        </div>
    )
}

export default Chatbot
