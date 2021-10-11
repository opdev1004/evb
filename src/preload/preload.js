const { ipcRenderer } = require('electron');

process.once('loaded', () => {
    window.addEventListener('message', event => {
        let message = event.data;

        if(message.type === 'example')
        {
          ipcRenderer.send('example', message.data);
        }
        event.preventDefault();
    });
});

ipcRenderer.on("example-done", (event, arg) => {
    window.postMessage({
      type: 'example-done',
      data: arg
    });
  });