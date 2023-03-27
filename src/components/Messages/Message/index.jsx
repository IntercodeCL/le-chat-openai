import * as Icon from 'react-bootstrap-icons';
import 'bootstrap/js/dist/tooltip';

const Message = ({ message }) => {
  const messageArray = message.split('```');
  if (messageArray.length > 1) {
    const contentPre = messageArray[0];
    const language = messageArray[1].split('\n')[0];
    let code = messageArray[1];

    // sometimes come an extra \n in the beggining
    if (code.substring(0, 2) === '\n') {
      code = code.substring(2);
    }
    code = code.split('\n').slice(1).join('\n');

    const contentPost = messageArray[2];

    return (
      <>
        <pre>{contentPre}</pre>
        <div
          className="float-end rounded bg-none me-3 btn-copy"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Copy to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(code);
          }}
        >
          <Icon.Clipboard className="" />
        </div>
        <pre className="code-lang mb-0 bg-black text-white p-2 rounded">
          {language}
        </pre>
        <pre className="code shadow bg-black text-white">
          <code>{code}</code>
        </pre>
        <pre>{contentPost}</pre>
      </>
    );
  } else {
    return <pre>{message}</pre>;
  }
};

export default Message;
