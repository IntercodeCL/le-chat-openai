import Message from './Message';

const Messages = ({ messages, allMessagesSection }) => {
  return (
    <div
      className="messages border m-2 shadow rounded bg-white"
      id="allMessages"
      ref={allMessagesSection}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.role === 'user'
              ? 'badge-me rounded px-3 py-2 m-2'
              : 'badge-ia rounded px-3 py-2 m-2'
          }
        >
          {message.role}
          <br />
          <pre className="my-0">
            <Message message={message.content} />
          </pre>
        </div>
      ))}
    </div>
  );
};

export default Messages;
