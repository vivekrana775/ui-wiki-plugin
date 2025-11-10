figma.showUI(__html__, {
  // width: 570,
  width: 480,
  // height: 760,
  height: 640,
  themeColors: true,
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'get-storage') {
    const value = await figma.clientStorage.getAsync(msg.key);
    figma.ui.postMessage({
      type: 'storage-response',
      key: msg.key,
      value,
    });
  }

  if (msg.type === 'set-storage') {
    await figma.clientStorage.setAsync(msg.key, msg.value);
  }

  if (msg.type === 'remove-storage') {
    await figma.clientStorage.setAsync(msg.key, null);
  }

  if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};
