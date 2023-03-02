export const generateSku=(prefix)=>{
    return prefix+Math.floor(Math.random() * 1000000000000000);
}

export function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }