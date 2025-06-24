
export async function setItemFigmaClientStorage(key:string, value:any) {
  try {
    await figma.clientStorage.setAsync(key, value);
  } catch (error) {
    console.error(`Error storing item [${key}]:`, error);
  }
}


export async function getItemFigmaClientStorage(key:string) {
  try {
    return await figma.clientStorage.getAsync(key);
  } catch (error) {
    console.error(`Error fetching item [${key}]:`, error);
    return null;
  }
}


export async function removeItemFigmaClientStorage(key:string) {
  try {
    await figma.clientStorage.setAsync(key, null);
  } catch (error) {
    console.error(`Error removing item [${key}]:`, error);
  }
}
