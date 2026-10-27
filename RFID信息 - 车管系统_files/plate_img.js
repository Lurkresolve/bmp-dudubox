/**
 * @param {string} plateText 车牌文本
 * @param {number} width
 * @param {number} height
 * @returns {Promise<string>} base64
 */
async function renderPlate(plateText, width = 600, height = 100) {
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
  ctx.font = "68px PlateFont";
  // 文字水平居中、垂直居中基线设置
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 横向渐变：深酒红 #580814 → 鲜血红 #ff2222
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "#580814");
  gradient.addColorStop(1, "#ff2222");
  ctx.fillStyle = gradient;

  // 画布正中心绘制文字
  ctx.fillText(plateText, width / 2, height / 2);

  // 顶层：波.png
  ctx.drawImage(topImg, 0, 0, 600, 98);

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
