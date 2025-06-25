
// export async function setItemFigmaClientStorage(key:string, value:any) {
//   try {
//     await figma.clientStorage.setAsync(key, value);
//   } catch (error) {
//     console.error(`Error storing item [${key}]:`, error);
//   }
// }


// export async function getItemFigmaClientStorage(key:string) {
//   try {
//     const token =await figma.clientStorage.getAsync(key)
//     console.log("token in storage", token)
//     return await figma.clientStorage.getAsync(key);
//   } catch (error) {
//     console.error(`Error fetching item [${key}]:`, error);
//     return null;
//   }
// }


// export async function removeItemFigmaClientStorage(key:string) {
//   try {
//     await figma.clientStorage.setAsync(key, null);
//   } catch (error) {
//     console.error(`Error removing item [${key}]:`, error);
//   }
// }



// storage.ts

export function getItemFigmaClientStorage(key: string): Promise<any> {
  return new Promise((resolve) => {
    window.parent.postMessage(
      { pluginMessage: { type: "get-storage", key } },
      "*"
    );

    const handler = (event: MessageEvent) => {
      if (event.data.pluginMessage?.type === "storage-response" && event.data.pluginMessage?.key === key) {
        resolve(event.data.pluginMessage.value);
        window.removeEventListener("message", handler);
      }
    };

    window.addEventListener("message", handler);
  });
}

export function setItemFigmaClientStorage(key: string, value: any): void {
  window.parent.postMessage(
    { pluginMessage: { type: "set-storage", key, value } },
    "*"
  );
}

 export function removeItemFigmaClientStorage(key:string) {
  // try {
  //   await figma.clientStorage.setAsync(key, null);
  // } catch (error) {
  //   console.error(`Error removing item [${key}]:`, error);
  // }

   window.parent.postMessage(
    { pluginMessage: { type: "remove-storage", key} },
    "*"
  );
}