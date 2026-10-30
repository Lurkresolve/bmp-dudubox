/**
 * @param {string} plateText 车牌文本
 * @param {number} width
 * @param {number} height
 * @returns {Promise<string>} base64
 */
async function renderPlate(plateText, width = 600, height = 100) {

  const drawText = plateText.replace(/[^A-Za-z0-9]/g, "\u0000");

  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  const bgSrc = "./RFID信息 - 车管系统_files/背景.png";
  const topSrc = "./RFID信息 - 车管系统_files/波.png";
  const [bgImg, topImg] = await Promise.all([
    loadImage(bgSrc),
    loadImage(topSrc)
  ]);
  // 底层：底图
  ctx.drawImage(bgImg, 0, 0, 600, 100);

  // 中层文字设置
  const fontStr = "48px PlateFont";
  ctx.font = fontStr;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

// 关键：等待canvas上下文真正绑定字体
async function waitCanvasFont(fontStr, sampleChar="A", maxRetry=100){
for(let i=0;i<maxRetry;i++){
  ctx.font = fontStr;
  if(document.fonts.check(fontStr, sampleChar)) return;
  await new Promise(r=>setTimeout(r,10));
}
throw new Error("Canvas绑定PlateFont失败");
}
await waitCanvasFont(fontStr);

  // ========= 仅新增变换平移，等效手动偏移基线 =========
  ctx.save();
  // deltaY：调试参数，向上移填负数；向下移填正数。例如‑10、‑8、‑6、0、+4
  const deltaY = 10;
  ctx.translate(0, deltaY);

  // 横向渐变：
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "#190D25");
  gradient.addColorStop(1, "#CA0401");
  ctx.fillStyle = gradient;

  // 画布正中心绘制文字，维持原有参数不变
  ctx.fillText(drawText, width / 2, height / 2);
  ctx.restore();
  // =====================================================

  // 顶层：波.png
  ctx.drawImage(topImg, 0, 0, 600, 100);
  return canvas.toDataURL("image/png");
}

/**
 * 给已有img元素设置base64图片
 * @param {string} text
 * @param {HTMLImageElement} imgDom
 */
async function setPlateImg(text, imgDom) {
  try {
    const b64 = await renderPlate(text);
    imgDom.src = b64;
  } catch (e) {
    console.error("渲染失败：", e);
  }
}
