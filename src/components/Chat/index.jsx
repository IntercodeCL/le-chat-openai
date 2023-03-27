import React, { useState, useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Messages from '../Messages';
import Buttons from './Buttons';
import imgLoading from './img/loading.gif';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputMessage = useRef(null);
  const allMessagesSection = useRef(null);

  const configuration = new Configuration({
    organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputMessage.current.value === '') return;
    const message = inputMessage.current.value;

    askToChatBot(message);
  };

  const downloadContent = (event) => {
    event.preventDefault();
    let contentRaw = '';
    messages.forEach((message) => {
      contentRaw += message.role + ':\n' + message.content + '\n\n';
    });

    const blob = new Blob([contentRaw], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download =
      new Date()
        .toISOString()
        .replace(/-/g, '')
        .replace(/:/g, '')
        .split('.')[0] + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const askToChatBot = async (message) => {
    setLoading(true);
    messages.push({ role: 'user', content: message });

    try {
      await openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7,
        })
        .then((response) => {
          setMessages((prevState) => [
            ...prevState,
            {
              role: 'system',
              content: response.data.choices[0].message.content,
            },
          ]);
        });
      setLoading(false);
      inputMessage.current.value = '';
    } catch (error) {
      console.log(error);
      setLoading(false);
      inputMessage.current.value = '';
    }
  };

  useEffect(() => {
    allMessagesSection.current.scrollTop =
      allMessagesSection.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <Messages messages={messages} allMessagesSection={allMessagesSection} />
      <Buttons downloadContent={downloadContent} />
      <form onSubmit={handleSubmit} className="mx-2">
        {loading ? (
          <>
            <img src={imgLoading} alt="Loading..." className="loading" />{' '}
            OBTENIENDO RESPUESTA DESDE <b>OPENAI</b>...
          </>
        ) : (
          <>
            <div className="input-group shadow">
              <input
                type="text"
                className="form-control"
                aria-label="Text input with segmented dropdown button"
                ref={inputMessage}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn text-white bg-black rounded-0 rounded-end"
                >
                  ENVIAR
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default Chat;
