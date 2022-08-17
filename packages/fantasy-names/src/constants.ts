export const sexOptions = [
  { text: '随机', value: null },
  { text: '女', value: true },
  { text: '男', value: false },
] as const

export const numberOptions = [
  { text: 10, value: 10 },
  { text: 20, value: 20 },
  { text: 50, value: 50 },
  { text: 100, value: 100 },
]

export const lengthValues = ['随机', 1, 2, 3]

export const rarityColors = {
  common: '#CCCCCC',
  uncommon: '#222A35',
  rare: '#00A6A9',
  epic: '#804DC8',
  legendary: '#C5C660',
  mythic: '#F28234',
  exotic: '#C65043',
};

export const rarityLevels = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
  'mythic',
  'exotic',
];

export const rarityValues = {
  common: 1.0, // common 灰
  uncommon: 0.35, // uncommon 白
  rare: 0.15, // rare 蓝
  epic: 0.075, // epic 紫
  legendary: 0.03, // legendary 橙
  mythic: 0.012, // mythic 金
  exotic: 0.005, // exotic 虹
};

export const rarityNames = {
  common: '凡品',
  uncommon: '良品',
  rare: '上品',
  epic: '极品',
  legendary: '秘宝',
  mythic: '灵宝',
  exotic: '古宝',
};

interface Item {
  value: string | null; 
  text: string;
}
export const rarityOptions: Item[] = rarityLevels.map(item => ({
  value: item,
  text: rarityNames[item as keyof typeof rarityNames]
}))
rarityOptions.unshift({ value: null, text: "随机" })


export const creatureCategory = [
  'plant',
  'worm',
  'fish',
  'beast',
  'bird',
  'reptile',
  'insect',
];

export const creatureCategoryNames = {
  plant: '草木',
  worm: '赢虫',
  fish: '鱼',
  beast: '兽',
  bird: '鸟',
  reptile: '爬虫',
  insect: '甲虫',
};

export const zoneCategories = ['land', 'water', 'void'];


export const _kParenthesisLeft = '（';
export const _kParenthesisRight = '）';