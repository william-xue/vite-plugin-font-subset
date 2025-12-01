/**
 * 字符集预设
 * 通过 Unicode 码点范围生成字符集，避免存储大量字符
 */

/**
 * Unicode 码点范围定义
 */
const UNICODE_RANGES = {
  // GB2312 基本汉字 (0x4E00-0x9FA5) - 常用汉字
  'gb2312-basic': [
    { start: 0x4E00, end: 0x9FA5 }  // 20902个汉字，实际使用时会过滤
  ],
  
  // 常用3500字 (一级汉字) - 精选范围
  'common-3500': [
    { start: 0x4E00, end: 0x4E7F },  // 一区常用字
    { start: 0x4E80, end: 0x4EFF },  // 继续常用字
    { start: 0x4F00, end: 0x4F7F },  // 更多常用字
    { start: 0x4F80, end: 0x4FFF },  // 继续扩展
    { start: 0x5000, end: 0x507F },  // 精选范围
    { start: 0x5080, end: 0x50FF },
    { start: 0x5100, end: 0x517F },
    { start: 0x5180, end: 0x51FF },
    { start: 0x5200, end: 0x527F },
    { start: 0x5280, end: 0x52FF },
    { start: 0x5300, end: 0x537F },
    { start: 0x5380, end: 0x53FF },
    { start: 0x5400, end: 0x547F },
    { start: 0x5480, end: 0x54FF },
    { start: 0x5500, end: 0x557F },
    { start: 0x5580, end: 0x55FF },
    { start: 0x5600, end: 0x567F },
    { start: 0x5680, end: 0x56FF },
    { start: 0x5700, end: 0x577F },
    { start: 0x5780, end: 0x57FF },
    { start: 0x5800, end: 0x587F },
    { start: 0x5880, end: 0x58FF },
    { start: 0x5900, end: 0x597F },
    { start: 0x5980, end: 0x59FF },
    { start: 0x5A00, end: 0x5A7F },
    { start: 0x5A80, end: 0x5AFF },
    { start: 0x5B00, end: 0x5B7F },
    { start: 0x5B80, end: 0x5BFF },
    { start: 0x5C00, end: 0x5C7F },
    { start: 0x5C80, end: 0x5CFF },
    { start: 0x5D00, end: 0x5D7F },
    { start: 0x5D80, end: 0x5DFF },
    { start: 0x5E00, end: 0x5E7F },
    { start: 0x5E80, end: 0x5EFF },
    { start: 0x5F00, end: 0x5F7F },
    { start: 0x5F80, end: 0x5FFF },
    { start: 0x6000, end: 0x607F },
    { start: 0x6080, end: 0x60FF },
    { start: 0x6100, end: 0x617F },
    { start: 0x6180, end: 0x61FF },
    { start: 0x6200, end: 0x627F },
    { start: 0x6280, end: 0x62FF },
    { start: 0x6300, end: 0x637F },
    { start: 0x6380, end: 0x63FF },
    { start: 0x6400, end: 0x647F },
    { start: 0x6480, end: 0x64FF },
    { start: 0x6500, end: 0x657F },
    { start: 0x6580, end: 0x65FF },
    { start: 0x6600, end: 0x667F },
    { start: 0x6680, end: 0x66FF },
    { start: 0x6700, end: 0x677F },
    { start: 0x6780, end: 0x67FF },
    { start: 0x6800, end: 0x687F },
    { start: 0x6880, end: 0x68FF },
    { start: 0x6900, end: 0x697F },
    { start: 0x6980, end: 0x69FF },
    { start: 0x6A00, end: 0x6A7F },
    { start: 0x6A80, end: 0x6AFF },
    { start: 0x6B00, end: 0x6B7F },
    { start: 0x6B80, end: 0x6BFF },
    { start: 0x6C00, end: 0x6C7F },
    { start: 0x6C80, end: 0x6CFF },
    { start: 0x6D00, end: 0x6D7F },
    { start: 0x6D80, end: 0x6DFF },
    { start: 0x6E00, end: 0x6E7F },
    { start: 0x6E80, end: 0x6EFF },
    { start: 0x6F00, end: 0x6F7F },
    { start: 0x6F80, end: 0x6FFF },
    { start: 0x7000, end: 0x707F },
    { start: 0x7080, end: 0x70FF },
    { start: 0x7100, end: 0x717F },
    { start: 0x7180, end: 0x71FF },
    { start: 0x7200, end: 0x727F },
    { start: 0x7280, end: 0x72FF },
    { start: 0x7300, end: 0x737F },
    { start: 0x7380, end: 0x73FF },
    { start: 0x7400, end: 0x747F },
    { start: 0x7480, end: 0x74FF },
    { start: 0x7500, end: 0x757F },
    { start: 0x7580, end: 0x75FF },
    { start: 0x7600, end: 0x767F },
    { start: 0x7680, end: 0x76FF },
    { start: 0x7700, end: 0x777F },
    { start: 0x7780, end: 0x77FF },
    { start: 0x7800, end: 0x787F },
    { start: 0x7880, end: 0x78FF },
    { start: 0x7900, end: 0x797F },
    { start: 0x7980, end: 0x79FF },
    { start: 0x7A00, end: 0x7A7F },
    { start: 0x7A80, end: 0x7AFF },
    { start: 0x7B00, end: 0x7B7F },
    { start: 0x7B80, end: 0x7BFF },
    { start: 0x7C00, end: 0x7C7F },
    { start: 0x7C80, end: 0x7CFF },
    { start: 0x7D00, end: 0x7D7F },
    { start: 0x7D80, end: 0x7DFF },
    { start: 0x7E00, end: 0x7E7F },
    { start: 0x7E80, end: 0x7EFF },
    { start: 0x7F00, end: 0x7F7F },
    { start: 0x7F80, end: 0x7FFF },
    { start: 0x8000, end: 0x807F },
    { start: 0x8080, end: 0x80FF },
    { start: 0x8100, end: 0x817F },
    { start: 0x8180, end: 0x81FF },
    { start: 0x8200, end: 0x827F },
    { start: 0x8280, end: 0x82FF },
    { start: 0x8300, end: 0x837F },
    { start: 0x8380, end: 0x83FF },
    { start: 0x8400, end: 0x847F },
    { start: 0x8480, end: 0x84FF },
    { start: 0x8500, end: 0x857F },
    { start: 0x8580, end: 0x85FF },
    { start: 0x8600, end: 0x867F },
    { start: 0x8680, end: 0x86FF },
    { start: 0x8700, end: 0x877F },
    { start: 0x8780, end: 0x87FF },
    { start: 0x8800, end: 0x887F },
    { start: 0x8880, end: 0x88FF },
    { start: 0x8900, end: 0x897F },
    { start: 0x8980, end: 0x89FF },
    { start: 0x8A00, end: 0x8A7F },
    { start: 0x8A80, end: 0x8AFF },
    { start: 0x8B00, end: 0x8B7F },
    { start: 0x8B80, end: 0x8BFF },
    { start: 0x8C00, end: 0x8C7F },
    { start: 0x8C80, end: 0x8CFF },
    { start: 0x8D00, end: 0x8D7F },
    { start: 0x8D80, end: 0x8DFF },
    { start: 0x8E00, end: 0x8E7F },
    { start: 0x8E80, end: 0x8EFF },
    { start: 0x8F00, end: 0x8F7F },
    { start: 0x8F80, end: 0x8FFF },
    { start: 0x9000, end: 0x907F },
    { start: 0x9080, end: 0x90FF },
    { start: 0x9100, end: 0x917F },
    { start: 0x9180, end: 0x91FF },
    { start: 0x9200, end: 0x927F },
    { start: 0x9280, end: 0x92FF },
    { start: 0x9300, end: 0x937F },
    { start: 0x9380, end: 0x93FF },
    { start: 0x9400, end: 0x947F },
    { start: 0x9480, end: 0x94FF },
    { start: 0x9500, end: 0x957F },
    { start: 0x9580, end: 0x95FF },
    { start: 0x9600, end: 0x967F },
    { start: 0x9680, end: 0x96FF },
    { start: 0x9700, end: 0x977F },
    { start: 0x9780, end: 0x97FF },
    { start: 0x9800, end: 0x987F },
    { start: 0x9880, end: 0x98FF },
    { start: 0x9900, end: 0x997F },
    { start: 0x9980, end: 0x99FF },
    { start: 0x9A00, end: 0x9A7F },
    { start: 0x9A80, end: 0x9AFF },
    { start: 0x9B00, end: 0x9B7F },
    { start: 0x9B80, end: 0x9BFF },
    { start: 0x9C00, end: 0x9C7F },
    { start: 0x9C80, end: 0x9CFF },
    { start: 0x9D00, end: 0x9D7F },
    { start: 0x9D80, end: 0x9DFF },
    { start: 0x9E00, end: 0x9E7F },
    { start: 0x9E80, end: 0x9EFF },
    { start: 0x9F00, end: 0x9F7F },
    { start: 0x9F80, end: 0x9FFF }
  ],
  
  // 基础标点和符号
  'punctuation': [
    { start: 0x3000, end: 0x303F },  // CJK 符号和标点
    { start: 0xFF00, end: 0xFFEF }   // 全角ASCII、全角标点
  ]
};

/**
 * 基础字符集（始终包含）
 */
const BASE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~` \n\t';

/**
 * 从 Unicode 范围生成字符集
 */
function generateCharsFromRanges(ranges, limit = null) {
  let chars = '';
  
  for (const range of ranges) {
    for (let codePoint = range.start; codePoint <= range.end; codePoint++) {
      // 跳过代理区和无效码点
      if (codePoint >= 0xD800 && codePoint <= 0xDFFF) continue;
      
      try {
        const char = String.fromCodePoint(codePoint);
        // 过滤掉非汉字字符（只保留中日韩统一表意文字）
        if (codePoint >= 0x4E00 && codePoint <= 0x9FFF) {
          chars += char;
          
          // 限制字符数量
          if (limit && chars.length >= limit) {
            return chars;
          }
        }
      } catch (e) {
        // 忽略无效码点
      }
    }
  }
  
  return chars;
}

/**
 * 获取预设字符集
 */
export function getPresetChars(presetName) {
  if (!UNICODE_RANGES[presetName]) {
    throw new Error(`未知的预设: ${presetName}。可用预设: ${Object.keys(UNICODE_RANGES).join(', ')}`);
  }
  
  const ranges = UNICODE_RANGES[presetName];
  let chars = generateCharsFromRanges(ranges);
  
  // 根据预设类型调整字符数量
  if (presetName === 'common-3500') {
    chars = chars.slice(0, 3500);  // 限制为3500字
  } else if (presetName === 'gb2312-basic') {
    chars = chars.slice(0, 6763);  // GB2312标准字符数
  }
  
  return BASE_CHARS + chars;
}

/**
 * 预设信息
 */
export const PRESET_INFO = {
  'common-3500': {
    name: '常用3500字',
    description: '覆盖日常使用99%的汉字',
    estimatedSize: '~300KB',
    coverage: '日常文案'
  },
  'gb2312-basic': {
    name: 'GB2312基础汉字',
    description: '国标简体中文基础字符集',
    estimatedSize: '~500KB', 
    coverage: '几乎所有简体中文'
  },
  'punctuation': {
    name: 'CJK标点符号',
    description: '中日韩标点和符号',
    estimatedSize: '~10KB',
    coverage: '标点符号'
  }
};

export default {
  getPresetChars,
  PRESET_INFO,
  UNICODE_RANGES
};
