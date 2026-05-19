export const sportsData = {
  football: {
    name: '足球',
    icon: '⚽',
    color: '#27ae60',
    description: '足球比赛裁判手势图解',
    signs: [
      {
        id: 1,
        name: '直接任意球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20direct%20free%20kick%20hand%20signal%20illustration&image_size=square',
        action: '单臂平举，指向犯规方球门方向',
        meaning: '判罚直接任意球，可直接射门得分',
        scene: '防守方队员在本方禁区外犯规，如踢人、拉人、手球等'
      },
      {
        id: 2,
        name: '间接任意球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20indirect%20free%20kick%20hand%20signal%20illustration&image_size=square',
        action: '单臂上举，掌心向前，直到球被踢出后放下',
        meaning: '判罚间接任意球，需经第二名队员触及后才能射门得分',
        scene: '越位、危险动作、阻挡守门员发球等非直接犯规'
      },
      {
        id: 3,
        name: '点球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20penalty%20kick%20hand%20signal%20illustration&image_size=square',
        action: '单臂前平举，指向罚球点',
        meaning: '判罚球点球，由进攻方在点球点主罚',
        scene: '防守方在本方禁区内故意犯规'
      },
      {
        id: 4,
        name: '角球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20corner%20kick%20hand%20signal%20illustration&image_size=square',
        action: '单臂斜上举，指向角球区',
        meaning: '判罚角球，由进攻方在角球区开球',
        scene: '防守方队员触球后，球的整体越过本方球门线（非进球）'
      },
      {
        id: 5,
        name: '球门球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20goal%20kick%20hand%20signal%20illustration&image_size=square',
        action: '单臂前平举，指向球门区',
        meaning: '判罚球门球，由防守方在球门区内开球',
        scene: '进攻方队员触球后，球的整体越过对方球门线（非进球）'
      },
      {
        id: 6,
        name: '界外球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20throw%20in%20hand%20signal%20illustration&image_size=square',
        action: '单臂斜上举，指向掷球方向',
        meaning: '判罚掷界外球',
        scene: '球的整体越过边线时'
      },
      {
        id: 7,
        name: '越位',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20offside%20hand%20signal%20illustration&image_size=square',
        action: '双臂上举，掌心向前，然后单臂指向越位位置',
        meaning: '判罚越位犯规，由对方在越位地点踢间接任意球',
        scene: '进攻队员在传球瞬间处于越位位置并参与比赛'
      },
      {
        id: 8,
        name: '黄牌警告',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20yellow%20card%20warning%20illustration&image_size=square',
        action: '单臂上举，手持黄牌展示',
        meaning: '警告犯规队员',
        scene: '非体育道德行为、连续犯规、延误比赛时间等'
      },
      {
        id: 9,
        name: '红牌罚令出场',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=football%20referee%20red%20card%20send%20off%20illustration&image_size=square',
        action: '单臂上举，手持红牌展示',
        meaning: '罚令犯规队员出场',
        scene: '严重犯规、暴力行为、第二次黄牌、故意手球破坏进球等'
      }
    ]
  },
  basketball: {
    name: '篮球',
    icon: '🏀',
    color: '#e74c3c',
    description: '篮球比赛裁判手势图解',
    signs: [
      {
        id: 1,
        name: '三分试投',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20three%20point%20attempt%20hand%20signal%20illustration&image_size=square',
        action: '单臂上举，伸出拇指、食指、中指',
        meaning: '表示三分投篮尝试',
        scene: '队员在三分线外投篮时'
      },
      {
        id: 2,
        name: '三分命中',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20three%20point%20made%20hand%20signal%20illustration&image_size=square',
        action: '双臂上举，各伸出拇指、食指、中指',
        meaning: '表示三分投篮命中',
        scene: '三分球投中篮筐时'
      },
      {
        id: 3,
        name: '犯规',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20foul%20hand%20signal%20illustration&image_size=square',
        action: '单臂握拳上举，另一手握住犯规队员手腕',
        meaning: '宣判犯规',
        scene: '队员发生侵人犯规或技术犯规时'
      },
      {
        id: 4,
        name: '走步',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20traveling%20hand%20signal%20illustration&image_size=square',
        action: '双手握拳，在胸前做交替转动动作',
        meaning: '宣判带球走违例',
        scene: '持球队员非法移动中枢脚时'
      },
      {
        id: 5,
        name: '两次运球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20double%20dribble%20hand%20signal%20illustration&image_size=square',
        action: '双手在胸前做上下拍球动作',
        meaning: '宣判两次运球违例',
        scene: '队员运球结束后再次运球时'
      },
      {
        id: 6,
        name: '带球撞人',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20charging%20hand%20signal%20illustration&image_size=square',
        action: '握拳，手臂向前猛推',
        meaning: '宣判进攻方带球撞人犯规',
        scene: '进攻队员冲撞已建立合法防守位置的防守队员时'
      },
      {
        id: 7,
        name: '阻挡',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20blocking%20hand%20signal%20illustration&image_size=square',
        action: '双手叉腰，肘部外展',
        meaning: '宣判防守方阻挡犯规',
        scene: '防守队员阻挡进攻队员的合法进攻路线时'
      },
      {
        id: 8,
        name: '技术犯规',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20technical%20foul%20hand%20signal%20illustration&image_size=square',
        action: '双手掌心相对，呈"T"字形',
        meaning: '宣判技术犯规',
        scene: '非身体接触的犯规，如言语不端、延误比赛等'
      },
      {
        id: 9,
        name: '争球/跳球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20referee%20jump%20ball%20hand%20signal%20illustration&image_size=square',
        action: '双手拇指上举，其余手指握拳',
        meaning: '宣判争球或执行跳球',
        scene: '双方队员同时紧握球无法争夺时，或比赛开始时'
      }
    ]
  },
  volleyball: {
    name: '排球',
    icon: '🏐',
    color: '#3498db',
    description: '排球比赛裁判手势图解',
    signs: [
      {
        id: 1,
        name: '发球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20service%20hand%20signal%20illustration&image_size=square',
        action: '单臂伸直上举，掌心向前',
        meaning: '指示发球方发球',
        scene: '比赛开始或得分后发球时'
      },
      {
        id: 2,
        name: '界内球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20in%20hand%20signal%20illustration&image_size=square',
        action: '手臂伸直，指向场地内地面',
        meaning: '球落在界内',
        scene: '球的落地有争议且落在界内时'
      },
      {
        id: 3,
        name: '界外球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20out%20hand%20signal%20illustration&image_size=square',
        action: '双臂上举，掌心向外',
        meaning: '球落在界外',
        scene: '球的落地有争议且落在界外时'
      },
      {
        id: 4,
        name: '触网',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20net%20touch%20hand%20signal%20illustration&image_size=square',
        action: '用手触网或模仿触网动作',
        meaning: '宣判触网犯规',
        scene: '队员在比赛进行中触及球网时'
      },
      {
        id: 5,
        name: '过网击球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20over%20net%20hand%20signal%20illustration&image_size=square',
        action: '手臂置于球网上方，掌心向下，做击球动作',
        meaning: '宣判过网击球犯规',
        scene: '队员在对方场区上空击球时'
      },
      {
        id: 6,
        name: '位置错误',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20position%20fault%20hand%20signal%20illustration&image_size=square',
        action: '双手食指在胸前做环形转动',
        meaning: '宣判位置错误或轮转错误',
        scene: '发球队员击球瞬间，场上队员位置不符合规则时'
      },
      {
        id: 7,
        name: '连击',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20double%20hit%20hand%20signal%20illustration&image_size=square',
        action: '伸出两个手指，手臂向下挥动',
        meaning: '宣判连击犯规',
        scene: '一名队员连续两次触球（拦网除外）时'
      },
      {
        id: 8,
        name: '四次击球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20four%20hits%20hand%20signal%20illustration&image_size=square',
        action: '伸出四个手指，手臂向下挥动',
        meaning: '宣判四次击球犯规',
        scene: '一个队在进攻中连续四次触球时'
      },
      {
        id: 9,
        name: '持球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=volleyball%20referee%20held%20ball%20hand%20signal%20illustration&image_size=square',
        action: '手臂缓慢向上抬起，掌心向上',
        meaning: '宣判持球犯规',
        scene: '队员没有将球清晰地击出，而是接住或抛出时'
      }
    ]
  },
  tennis: {
    name: '网球',
    icon: '🎾',
    color: '#f39c12',
    description: '网球比赛裁判手势图解',
    signs: [
      {
        id: 1,
        name: '发球失误',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20fault%20hand%20signal%20illustration&image_size=square',
        action: '手臂侧平举，掌心向下，指向发球失误一侧',
        meaning: '宣判发球失误',
        scene: '发球未落在规定区域内时'
      },
      {
        id: 2,
        name: '重发球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20let%20hand%20signal%20illustration&image_size=square',
        action: '单臂上举，手指自然张开',
        meaning: '宣判重发球（擦网、干扰等）',
        scene: '发球擦网落入有效区域或比赛受到干扰时'
      },
      {
        id: 3,
        name: '出界',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20out%20hand%20signal%20illustration&image_size=square',
        action: '手臂侧平举，掌心向外伸出',
        meaning: '球落在界外',
        scene: '回球落在界线外时'
      },
      {
        id: 4,
        name: '得分',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20point%20hand%20signal%20illustration&image_size=square',
        action: '手臂向上抬起，指向得分一方',
        meaning: '宣告得分',
        scene: '一方赢得一分时'
      },
      {
        id: 5,
        name: '脚误',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20foot%20fault%20hand%20signal%20illustration&image_size=square',
        action: '手指指向地面，轻触脚部位置',
        meaning: '宣判脚误',
        scene: '发球员发球时脚触及底线或进入场内时'
      },
      {
        id: 6,
        name: '挑战鹰眼',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20hawkeye%20challenge%20hand%20signal%20illustration&image_size=square',
        action: '手指在空中画圈，然后指向场地',
        meaning: '允许鹰眼挑战',
        scene: '运动员对判罚提出挑战时'
      },
      {
        id: 7,
        name: '比赛结束',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20game%20set%20match%20hand%20signal%20illustration&image_size=square',
        action: '双臂在胸前交叉，然后展开',
        meaning: '宣告比赛结束',
        scene: '一盘或整场比赛结束时'
      },
      {
        id: 8,
        name: '警告',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20warning%20hand%20signal%20illustration&image_size=square',
        action: '单臂上举，手指指向运动员',
        meaning: '对运动员进行警告',
        scene: '运动员违反行为准则时'
      },
      {
        id: 9,
        name: '换边',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tennis%20referee%20change%20sides%20hand%20signal%20illustration&image_size=square',
        action: '双臂在身体两侧做交替摆动',
        meaning: '指示双方运动员换边',
        scene: '每盘单数局结束后或比赛需要时'
      }
    ]
  },
  badminton: {
    name: '羽毛球',
    icon: '🏸',
    color: '#1abc9c',
    description: '羽毛球比赛裁判手势图解',
    signs: [
      {
        id: 1,
        name: '发球过腰',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20above%20waist%20hand%20signal%20illustration&image_size=square',
        action: '手掌置于腰部高度，然后向上抬起',
        meaning: '宣判发球过腰犯规',
        scene: '发球瞬间球的整体高于发球员腰部时'
      },
      {
        id: 2,
        name: '发球过手',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20above%20hand%20hand%20signal%20illustration&image_size=square',
        action: '手掌置于头部一侧，手指向上',
        meaning: '宣判发球过手犯规',
        scene: '发球瞬间拍头未明显低于发球员握拍手部时'
      },
      {
        id: 3,
        name: '发球延误',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20service%20delay%20hand%20signal%20illustration&image_size=square',
        action: '手按计时器位置，手指做快速运动',
        meaning: '警告或判罚发球延误',
        scene: '发球员准备发球后无故拖延时'
      },
      {
        id: 4,
        name: '界内',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20in%20hand%20signal%20illustration&image_size=square',
        action: '手臂向下伸直，手指指向地面',
        meaning: '球落在界内',
        scene: '球落在场地界线内时'
      },
      {
        id: 5,
        name: '界外',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20out%20hand%20signal%20illustration&image_size=square',
        action: '双臂侧平举，掌心向外',
        meaning: '球落在界外',
        scene: '球落在场地界线外时'
      },
      {
        id: 6,
        name: '过网击球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20over%20net%20hand%20signal%20illustration&image_size=square',
        action: '手臂越过网的高度，做击球动作',
        meaning: '宣判过网击球犯规',
        scene: '击球点在对方场区上空时'
      },
      {
        id: 7,
        name: '触网',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20net%20touch%20hand%20signal%20illustration&image_size=square',
        action: '用手触摸球网顶部',
        meaning: '宣判触网犯规',
        scene: '队员在比赛进行中触及球网或网柱时'
      },
      {
        id: 8,
        name: '重发球',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20let%20hand%20signal%20illustration&image_size=square',
        action: '单臂上举，手掌自然张开',
        meaning: '宣判重发球',
        scene: '发球擦网、球停在网顶或遇到意外干扰时'
      },
      {
        id: 9,
        name: '违例警告',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=badminton%20referee%20warning%20hand%20signal%20illustration&image_size=square',
        action: '单臂上举，手指指向运动员',
        meaning: '对运动员进行警告',
        scene: '运动员故意拖延比赛、行为不端等情况'
      }
    ]
  }
}

export const sportsList = Object.keys(sportsData).map(key => ({
  type: key,
  ...sportsData[key]
}))
