figma.showUI(__html__, {
  width: 574,
  height: 767,
  themeColors:true
});

figma.ui.onmessage = async(msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
    figma.closePlugin();
  }

   if (msg.type === "get-storage") {
    const value = await figma.clientStorage.getAsync(msg.key);
    figma.ui.postMessage({
      type: "storage-response",
      key: msg.key,
      value,
    });
  }

  if (msg.type === "set-storage") {
    await figma.clientStorage.setAsync(msg.key, msg.value);
  }

  if (msg.type === "remove-storage") {
    await figma.clientStorage.setAsync(msg.key, null);
  }

   if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }

  // if (msg.type === "copy-to-clipboard") {
  //   console.log("Copy to clipboard called with content:", msg.content);
  //   await figma.clipboard.writeText(msg.content);
  //   // figma.notify("Component copied to clipboard!");
  //   figma.notify("###################################");
  // }
  // if (msg.type === "show-notification") {
  //   figma.notify(msg.content);
  // }

  // figma.closePlugin();
};
