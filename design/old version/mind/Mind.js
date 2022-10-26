let obj = {}
const querySelector = parameter => {
    const selected = document.querySelector(parameter)
    return {
        selected: selected,
        text: txt => txt == undefined ? selected.textContent : selected.textContent = txt,
        addClass: hasAdd => selected.classList.add(hasAdd),
        removeClass: hasRemove => selected.classList.remove(hasRemove),
        styles: (cssType, cssParameter) => selected.style.setProperty(cssType, cssParameter)
    }
}

const querySelectorAll = parameter => document.querySelectorAll(parameter)

obj.array = []
obj.strTemp = ""
obj.count = -1
obj.switchs = false
obj.stopTimeSet;

// 題目資料
obj.Qitems = [{
    qNum: 0,
    qT: 'Q1 . 我傾向從何處得到力量？',
    ansA: '別人',
    ansB: '我自己的想法',
}, {
    qNum: 1,
    qT: 'Q2 . 當我參加一個社交聚會時，我傾向從何處擁有更多的氣力？',
    ansA: '在夜色很深時，一旦我開始投入也許就是最晚離開的那一個',
    ansB: '在夜晚開始的時候，我就疲倦想回家了',
}, {
    qNum: 2,
    qT: 'Q3 . 下列哪種聽起來較吸引人？',
    ansA: '與我的情人到有很多人且社交活動頻繁的地方',
    ansB: '待在家中與我的情人做一些特別的事情，如觀賞一部有趣的影片並享用我最愛的外帶食物',
}, {
    qNum: 3,
    qT: 'Q4 . 在約會中我通常...',
    ansA: '整體來說蠻健談的',
    ansB: '較安靜且保留，直到我覺得舒服',
}, {
    qNum: 4,
    qT: 'Q5 . 在過去我大部分情人都在何處遇見？',
    ansA: '在宴會中、夜總會、工作上、休閒活動中、會議上、或當朋友介紹我給他們的朋友時',
    ansB: '透過私人的方式，如個人廣告、錄影約會、或由親密的朋友和家人介紹',
}, {
    qNum: 5,
    qT: 'Q6 . 我傾向擁有...',
    ansA: '很多認識的人和很親密的朋友',
    ansB: '一些很親密的朋友和一些認識的人',
}, {
    qNum: 6,
    qT: 'Q7 . 在過去我愛的人和情人傾向對我說...',
    ansA: '你難道不可以安靜一點嗎？',
    ansB: '可以請你從你的世界中出來一下嗎？',
}, {
    qNum: 7,
    qT: 'Q8 . 我傾向透過以下方式收集資訊...',
    ansA: '我對有可能發生的事情的想像和期望',
    ansB: '我對目前狀況的實際認知',
}, {
    qNum: 8,
    qT: 'Q9 . 我傾向相信...',
    ansA: '我的直覺',
    ansB: '我直接的觀察和現成的經驗',
}, {
    qNum: 9,
    qT: 'Q10 . 當在一段關係中時我傾向相信...',
    ansA: '永遠有進步的空間',
    ansB: '若它沒有被破壞別修補它',
}, {
    qNum: 10,
    qT: 'Q11 . 當我對一個約會覺得放心時我傾向談論...',
    ansA: '未來有關於改進或發明的事物和生活的種種可能性，如我也許會談論一個新的科學發明或一個更好的方法來表達我的感受',
    ansB: '實際具體的關於「此時此地」的事物，如我也許會談論品酒的好方法或我即將要參加的新奇旅程',
}, {
    qNum: 11,
    qT: 'Q12 . 我是這樣的人...',
    ansA: '喜歡先看整個大局面',
    ansB: '喜歡先拿捏細節',
}, {
    qNum: 12,
    qT: 'Q13 . 我的思考類型是...',
    ansA: '與其活在現實中，我選擇活在我的想像裡',
    ansB: '與其活在我的想像裡，我選擇活在現實中',
}, {
    qNum: 13,
    qT: 'Q14 . 我通常...',
    ansA: '偏向於去想像一大堆關於即將來臨的約會中的事情',
    ansB: '偏向於拘緊地想像即將來臨的約會，期待讓它自然地發生',
}, {
    qNum: 14,
    qT: 'Q15 . 我傾向如此做決定...',
    ansA: '先依我的心意，再依我的邏輯',
    ansB: '先依我的邏輯，再依我的心意',
}, {
    qNum: 15,
    qT: 'Q16 . 我傾向比較能夠察覺到...',
    ansA: '當人們需要情感上的支持時',
    ansB: '當人們不合邏輯時',
}, {
    qNum: 16,
    qT: 'Q17 . 當與某人分手時...',
    ansA: '我通常讓自己的情緒深陷其中很難抽身而出',
    ansB: '雖然我覺得受傷，但一旦下定決心會直截了當地將過去戀人的影子甩開',
}, {
    qNum: 17,
    qT: 'Q18 . 當與一個人交往時我傾向衡量...',
    ansA: '情感上的相容性：表達愛意和對另一半的需求很敏感',
    ansB: '智慧上的相容性：溝通重要的想法與客觀地討論辯論事情',
}, {
    qNum: 18,
    qT: 'Q19 . 當我不同意我情人的想法時...',
    ansA: '我盡可能地避免傷害對方的感受，若是會對對方造成傷害的話就不說',
    ansB: '我通常毫無保留地說話，並且對我的情人直言直語，因為對的就是對的',
}, {
    qNum: 19,
    qT: 'Q20 . 認識我的人傾向形容我為...',
    ansA: '熱情和敏感的',
    ansB: '邏輯和明確的',
}, {
    qNum: 20,
    qT: 'Q21 . 我把大部分和別人的相遇視為...',
    ansA: '友善及重要的',
    ansB: '另有目的',
}, {
    qNum: 21,
    qT: 'Q22 . 若我有時間和金錢朋友邀請我到國外度假，並且在一天前才通知，我會...',
    ansA: '需先檢查我的時間表',
    ansB: '立即收拾行囊',
}, {
    qNum: 22,
    qT: 'Q23 . 在第一次約會中我...',
    ansA: '若我所約的人來遲了會很不高興',
    ansB: '一點都不在乎，因為自己常常遲到',
}, {
    qNum: 23,
    qT: 'Q24 . 我偏好...',
    ansA: '事先知道約會的行程：要去哪裡、有誰參加、我會在哪裡多久、該如何打扮',
    ansB: '讓約會自然地發生，不做先前太多的計劃',
}, {
    qNum: 24,
    qT: 'Q25 . 我選擇的生活循環著...',
    ansA: '日程表和組織性',
    ansB: '自然發生和彈性',
}, {
    qNum: 25,
    qT: 'Q26 . 哪一項較為常見？',
    ansA: '我準時出席而其他人遲到',
    ansB: '其他人都準時出席而我遲到',
}, {
    qNum: 26,
    qT: 'Q27 . 我是喜歡這樣的人...',
    ansA: '下定決心並且做出最後肯定的結論',
    ansB: '不限定我的選擇並且持續收集資訊',
}, {
    qNum: 27,
    qT: 'Q28 . 我是這類型的人...',
    ansA: '喜歡在一個時間裡專心做一件事情直到完成',
    ansB: '享受同時進行好幾件事情'
}]

// 解析資料
obj.typeItems = [{
    originsType: 'ESTJ',
    nameType: '大男人型',
    thinkType: '外向+感覺+理性+判斷',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '講實際、重現實、公事，由於有天生的商業或機械學頭腦，所以對抽象理論不感興趣希望學習以使可以直接和立即應用。喜歡組織和參與活動，通常能做優秀的領導人，果斷、迅速行動起來執行決定，考慮日常事務的各種細節。',
    explainObject: '公司執行長、軍官、預算分析師、藥劑師、房地產經紀人、保險經紀人、教師為貿易或工商類、物業管理',
    loveType: '監督者',
    explainLove: '你很注重約會中的細節，也有一點小小的控制欲，希望自己能作為主要的安排者。和你比較匹配的伴侶，通常可以在這方面比較隨性，並且具有彈性。你喜歡秩序，也渴望被理解。對方能夠在這方面配合你，會讓你感覺受到重視，並且願意付出更多。你的戀愛關鍵字是主導與穩定。',
    explainFallLove: '你追求穩定的自我，你的負責任個性，會讓你要求自己理性面對一段情感的結束。你經常選擇以忙碌的工作，或者其他可以轉移注意力的方式去度過分手後的日子，你會讓自己保持冷靜，在別人面前崩潰大哭對你而言是不太自在的，即使你內心正在撕裂或哭泣。想告訴你的是，你當然可以選擇讓你最舒服與安全的方式度過這段低潮期，然而，也要好好照顧自己內心的感受。無論是透過寫日記、冥想，或者找朋友聊聊天，試著去梳理自己心裡的感覺，可以幫助你更健康地前進。'
}, {
    originsType: 'ESTP',
    nameType: '挑戰型',
    thinkType: '外向+感覺+理性+理解',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '擅長於現場解決問題。喜歡行動，對任何的進展都感到高興。往往喜好機械的東西和運動，並願意朋友在旁邊。善應變、容忍、重實效，集中精力于取得成果，不喜多加解釋。最喜好能幹好、能掌握、能分析、能合一的交際事物。',
    explainObject: '企業家、股票經紀人、保險經紀人、土木工程師、旅遊管理、職業運動員、教練、電子遊戲開發員、房產開發商',
    loveType: '推銷員',
    explainLove: '你喜歡轟轟烈烈的感情，你總是精力充沛、自發性也很強，你尋找的是一個想要和你一起享受生活、感受各種美好事物的伴侶。和你約會，很少感覺到無聊，你總是可以知道哪裡有好玩的，你樂於將感官都打開，去感受對方身上迷人的特質。同時間，你的感染力也很強大。你的戀愛關鍵字是冒險、衝動。',
    explainFallLove: '在得知分手的訊息時，你首先會很理智，希望可以再次嘗試是否有挽救的可能。但你也不是盲目地追求補救，而是有經過現實考量，認為繼續下去是還有意義的。因此，一旦你清楚已經毫無機會，也能斷然離開。你可能可以表現的像是什麼也沒發生過一樣，繼續自己的生活，也希望過上好的單身生活。只是，你同時間很容易自願背負過去的創傷，並且感到自責或不安全感，也會把傷口帶到下一段感情當中。想給你的建議是，面對曾經留下的瘡疤，你不是只有包裹起來，而是應該去照顧它，透過朋友或諮商師療癒自己，都是很好的方法。'
}, {
    originsType: 'ESFJ',
    nameType: '主人型',
    thinkType: '外向+感覺+情感+判斷',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '熱心、健談、受歡迎，有責任心的天生的合作者，積極的委員會成員。要求和諧並可能長於創造和諧，經常為別人做好事，能得到鼓勵和讚揚時工作最出色。主要的興趣在於那些對人們的生活有直接和明顯的影響的事情。',
    explainObject: '房地產經紀人、零售商、護士、理貨員、採購、按摩師、運動教練、飲食業管理、旅遊管理',
    loveType: '供給者',
    explainLove: '你是一個熱愛付出的人，你會因他人的快樂而感到快樂。但你很注重雙向的互動，你的敏感個性，讓你可以很快感知到他的的需求，且通常也希望可以獲得別人的關注與認同。但同時間，你其實比較難察覺到對方的短處。因此在戀愛關係裡，你經常只和那些也能回饋於你的對象繼續來往，也渴望有安全感、穩定和諧的關係。你的戀愛關鍵字是觀察、回饋。',
    explainFallLove: '被忽視、被孤立對你而言是非常痛苦的，因此你通常不太是主動提出分手的那個人。你總是會努力讓彼此的關係更好，而非逃避。在面對分手的時候，你也尋求修復的可能，希望不必因此面對失去連結的恐懼。然而，你的「付出貢獻型」性格，也容易讓你受到盲目的傷害，或者很難預知關係的變卦。你是一個天生對他人需求很敏感的人，但你也經常通過改變自己來滿足別人的期望。因此，你最終必須明白，你的價值並非只有一個人可以給你；你也是一個很願意溝通的人，你會遇到真正愛你的人，他將不會讓你擔心或懷疑自己。'
}, {
    originsType: 'ESFP',
    nameType: '表演型',
    thinkType: '外向+感覺+情感+理解',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '開朗、隨和、友善、喜歡一切並使事物由於他們的喜好而讓別人感到更有興趣。喜歡行動並力促事情發生，他們了解正在發生的事情並積極參與。認為記住事實比掌握理論更為容易，在需要豐富的知識和實際能力的情況下表現最佳。',
    explainObject: '幼教老師、公關專員、職業策劃諮詢師、旅遊管理、導遊、促銷員、演員、海洋生物學家、銷售',
    loveType: '表演者',
    explainLove: '基本上，你很喜歡出門、喜歡約會，也熱愛與人接觸，而你走的路線通常是有點出奇不意、也可能臨時調動路線的。你喜歡跟著感覺走。你是個外向者，同時你的觀察很敏銳，你總是可以很快察覺到對方的情緒、知道怎麼樣可以讓他人開心。而你也渴望被欣賞。如果對方無法看到你最特別的地方，會讓你覺得很挫敗。屬於你的戀愛關鍵字是支持、享受。',
    explainFallLove: '在關係結束時，你會非常難過，但你也不會讓自己花太多時間沈溺在這樣悲傷的情緒裡。你認為那是毫無幫助的。接著，你會願意開始約會，積極地去尋找新的人，甚至也會快速地投入下一段關係，來讓自己走出情傷。你享受自己總是可以被愛包圍的感覺；或者說，你是依賴這種感覺。然而，你也容易在無可擺脫情感依賴的情況下，遍體鱗傷而毫無辦法。想給你的建議是，你可以試著重新看待單身這個身份。其實你很看重自我的需求，而依循著這個直覺，相信你會找到情感生活中的平衡點。'
}, {
    originsType: 'ENTJ',
    nameType: '將軍型',
    thinkType: '外向+直覺+理性+判斷',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '直率、果斷，各種活動的領導者，發展和完成完整的體系去解決機構的問題。長於需要論據和機智的談吐的任何事情，如公開演講之類。往往很有學識並喜好增加其知識。',
    explainObject: '公司執行長、管理諮詢顧問、政治家、房產開發商、教育諮詢顧問、投資顧問、法官',
    loveType: '陸軍元帥',
    explainLove: '你是一個對知識渴求的人，同時間，你希望另一半的智力可以與你匹配。你喜歡交談、交換想法，當他能夠也相同具有邏輯與智慧，可以在許多話題都和你搭上線，並且能有更進一步的討論，將會吸引你的眼光，讓你覺得他非常的性感。你的戀愛關鍵字是智慧與坦率。',
    explainFallLove: '你通常會選擇可以一起發展未來的對象。因此分手對你而言，不僅僅是失去了彼此的現在，也失去了未來。你會想確保這次的分手是正確的決定，是理智思考後最好的結果，譬如那是對你的未來最有幫助的。於此同時，你正追求在這次的分手當中成為贏家，你會有計劃地思考，接下來可以去做些什麼事、什麼能讓自己擁有更好的生活等。想給你的建議是，你其實很容易讓自己逞強，假裝一切都很好，這是你對於關係的好勝心。但適時尋求幫助，別讓自己默默地受苦，你也將能在這個人生低潮裡，感覺到更多的愛。你面對感情的方式、你最害怕的東西，會在這個分手的時刻跑出來找你，也需要你去面對。然而永遠要相信的是，從一段關係過度到另一段關係，正是一個能夠好好修復自己、讓自己成長的機會。下一次，你知道你將長出更強壯的自己。'
}, {
    originsType: 'ENTP',
    nameType: '發明家',
    thinkType: '外向+直覺+理性+理解',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '敏捷、有發明天才，長於許多事情，有鼓勵性的伙伴、機警、直言，可能出於逗趣而爭論問題的任何一個方面。在解決新的、挑戰性的問題方面富於機智，但可能忽視日常工作，易把興趣從一點轉移到另一點。能夠輕而易舉地為他們的要求找到合乎邏輯的理由。',
    explainObject: '企業家、投資銀行家、廣告創意總監、市場管理諮詢顧問、文案、廣播、電視主持人、演員、大學校長',
    loveType: '發明家',
    explainLove: '你往往有很多的興趣，也是一個願意嘗試新鮮事物的人。你的理想感情，是可以一起探索新的事物、實現自我，並且一起成長。你尋找的是這樣一個可以和你長期互助互愛的夥伴。你不喜歡有所停滯，因此，要跟得上你，對方也得要有兩把刷子。屬於你的戀愛關鍵字是新鮮、積極。',
    explainFallLove: '你是一個很積極生活的人，也不太願意只停留在原地。因此在結束一段關係後，你也偏向以積極的態度去面對。你會慶祝自己重獲自由，會讓自己享受單身的日子，你會願意出門社交，而非躲藏起來。而這也也是讓你充滿活力的方式。然而要注意的是，這也可能是你下意識逃避過去情感的方式，最終你會發現之前付出過的感情，正等著你去整理與放下。正向面對新生活並沒有什麼不好，但也別忘了照顧自己的負面情緒，讓它能有被抒發的機會。'
}, {
    originsType: 'ENFJ',
    nameType: '教育家',
    thinkType: '外向+直覺+情感+判斷',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '敏感、負責任，真正地關心他人的所想所願。處理事情時盡量適當考慮別人的感情，能提出建議或輕鬆而機智地領導小組討論。喜社交、受歡迎、有同情心。對表揚和批評敏感。喜歡給人以方便並使人們發揮其潛力。',
    explainObject: '房地產經紀人、零售商、護士、理貨員、採購、按摩師、運動教練、飲食業管理、旅遊管理',
    loveType: '教師',
    explainLove: '你是一個很容易讓人感覺到安全及溫暖的人。你獨特的能力就是能看到每個人的優點。因此你的伴侶和你在一起的時候，他們會感到自在，覺得可以做他自己。你是一個鼓舞者、付出者、傾聽者，也有穩定的情商，你是一個很受歡迎的對象。但同時間，也要隨時提醒自己本身的需求是什麼。你的戀愛關鍵字是傾聽與理解。',
    explainFallLove: '你對於感情是很認真的，也擅長對伴侶有深刻的理解。而你的感知能力，卻也會在面對分手時，感覺到更多的衝擊與不安。你會需要傾訴，向身邊的好友、家人等發洩自己的情緒，你尋求垃圾桶，需要陪伴，直到你解決腦袋裡爆炸般的焦慮。想給你的建議是，可以適時地透過一些行為，例如刪除對方的臉書好友、選擇性拒絕取得對方的消息等，來暫時幫助你走出情傷。你會很傷心，但當你對感情果斷時，你也會擁有巨大的修復力。'
}, {
    originsType: 'ENFP',
    nameType: '記者型',
    thinkType: '外向+直覺+情感+理解',
    thinkTypeA: '外向',
    thinkTypeAa: '喜歡外出、表情豐富與外露，喜歡交互作用、合群，喜行動、多樣性、不能長期堅持。不怕打擾，喜歡自由溝通、易衝動、易後悔、易受他人影響。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '極為熱心、極富朝氣、機敏、富於想像力。幾乎能夠做他們感興趣的任何事情，對任何困難都能迅速給出解決辦法並隨時準備去幫助任何一個遇到難題的人。常常依據他們自己的能力去即席成事，而不是事先準備。經常能對他們想做的任何事情找到令人信服的理由。',
    explainObject: '廣告客戶管理、管理諮詢顧問、演員、平面設計師、藝術指導、公司團隊培訓師、心理學家、人力資源管理',
    loveType: '優勝者',
    explainLove: '你是一個很懂得回饋的人，和你約會，你常常可以做出一些體貼的小舉動。和你約會、相處感覺通常很好。你也很願意付出，讓對方感覺到溫暖。同時間，你也是很需要被愛和認同包圍的人。你需要知道對方欣賞自己、支持自己。屬於你的戀愛關鍵字是溫暖、體恤。',
    explainFallLove: '在面對分手時，你會習慣將自己的悲傷情緒先置放在某處，一個你認為安全的地方。接下來，你會展開一段旅程，可能安排一趟旅行，或者不停地參加聚會，讓自己可以遠離曾經讓你受傷的過往。你努力切斷與過去的連結，並且相信這麼做可以幫助自己好起來。在這段時間，你也樂於結交新朋友，讓自己與外面的世界有更多的接觸與可能。你渴望活在當下，你覺得這樣比較舒服。但想告訴你的是，面對過去，並不會讓你失去重新擁有未來的機會。不要害怕處理自己的情感，擁抱心碎，那並不代表你是失敗的。'
}, {
    originsType: 'ISTJ',
    nameType: '公務型',
    thinkType: '內向+感覺+理性+判斷',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '嚴肅、少言、依靠精力集中和有始有終。注重實踐、有秩序、實事求是、有邏輯、現實、值得信賴、設法組織好每樣事情。負責任、他們自己決定該做什麼並不願反對和干擾、堅定不移地去完成它。',
    explainObject: '首席信息系統執行官、天文學家、資料庫管理、會計、房地產經紀人、偵探、行政管理、信用分析師',
    loveType: '調查員',
    explainLove: '你對於戀愛的要求，在於懂得珍惜彼此時間，並且能夠對愛情忠誠者。對於只想遊戲人間者，你不願多浪費一點時間，你通常可以直接了當地拒絕這些人的靠近。你嚮往井然有序的日常，內心裡也渴望有安全感、平靜的生活。責任、信守承諾，是你對於戀愛的關鍵字。',
    explainFallLove: '你會以務實的方式處理失敗的關係，你通常會很理智、不會大哭大鬧，或表現出驚慌失措的樣子。一旦清楚彼此已經沒有辦法繼續，你會知道不要再浪費時間；你主動整理好前任的物品，並且會儘快交給對方。而這也是你對這段感情最後的盡責。接下來，你會選擇往前走，也相信自己會因此而好起來；透過繼續好好地生活，讓你感覺自己正彌補過去長期關係裡付出的努力。想給你的建議是，要確保自己在遇到下一個人時，已經處理好失戀期間可能被壓抑的情緒，否則它也將會再次於新關係裡出現。'
}, {
    originsType: 'ISTP',
    nameType: '冒險家',
    thinkType: '內向+感覺+理性+理解',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '冷靜的旁觀者、少言、自制、以獨有的好奇心和出人意料的有創意的幽默觀察和分析生活。往往對起因和結果感興趣，也對機械的事物怎麼及為什麼奏效及用邏輯原理組織事實傾注興趣。擅長抓住實際問題的核心並尋求解決辦法。',
    explainObject: '信息服務業經理、電腦程式員、警官、軟體開發員、律師助理、消防員、私人偵探、藥劑師',
    loveType: '巧匠',
    explainLove: '雖然你基本上是比較內向、安靜者，但你在行動上有時也會有自己的隨性與浪漫。你不喜歡一開始就要求承諾的感情關係，但那不代表你不追求安穩。而是你喜歡長久觀察、累積信任感。對於有興趣的人，你願意每天都有一點接觸，看看會有什麼有趣的事情發生。屬於你的戀愛關鍵字是快樂與浪漫。',
    explainFallLove: '分手後，你很少會主動在與他人談論這段感情。你不會讓自己太專注在悲傷的情緒，也拒絕將這次結束的理由個人化。然而，面對這場分別，你的腦袋其實不停地轉動，想找到其中的理由、邏輯，或甚至對錯。你希望自己並不會因此而承擔過多的風險。你也會希望可以盡量在一段感情結束後，兩人都獲得公平，也會特別關照自己。想給你的提醒是，讓自己主動去承擔一些責任，也許會讓你更加的自由。'
}, {
    originsType: 'ISFJ',
    nameType: '照顧型',
    thinkType: '內向+感覺+情感+判斷',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '少言、友善、負責任又認真。盡心地工作以盡職責，可以使任何項目和群體更加穩定。周到、刻苦、準確，他們的興趣通常不是技術性的。能對必要的細節有耐心、忠貞、體諒人、有洞察力、關心別人的想法。',
    explainObject: '內科醫生、營養師、圖書管理員、檔案管理員、室內裝潢設計師、客戶服務專員、記帳員、特殊教育教師、酒店管理',
    loveType: '守衛者',
    explainLove: '你是一個喜歡服務他人的人，也有敏銳的觀察力，譬如會偷偷記住一些對方喜歡的小細節、去達成對方想要的小願望等，你也將從中感受到幸福。你追求和諧而忠實的關係，並能夠尊重他人的想法與感受，你不喜歡爭論。和你相處，雖然不會有太多的火花，但卻能夠很安穩。屬於你的戀愛關鍵字是體貼、穩定與誠實。',
    explainFallLove: '你的內心是很浪漫的，當你愛上一個人時，你會積極地參與對方的生命。因此，當失去一個人，你也將花比較長的時間回歸自我。你面對分手的態度是很成熟的，即使分開了，你也還會繼續愛著對方，也會擔心對方的情緒與心理狀態。你會希望彼此能維持友好的關係。一方面也是因為，你通常在關係中是付出者、照顧者的角色，因此你不太希望突然停止關心彼此。然而也想提醒你，這讓你容易美化過去的關係。建議可以和信任的朋友共同處理自己的失戀情緒，幫助你往前進。'
}, {
    originsType: 'ISFP',
    nameType: '藝術家',
    thinkType: '內向+感覺+情感+理解',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '感覺',
    thinkTypeBb: '通過五官感受世界、注重真實的存在、實際，用已經有的技能解決問題，喜歡具體明確。重細節但少了全面性但腳踏實地。做事有可能的結果、能忍耐、小心謹慎，可做重覆工作不喜歡新事物與展望。',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '羞怯、不事聲張的友善、敏感、和諧、謙虛看待自己的能力。回避爭論，不將自己的觀點和價值觀強加于人。一般說，無意于做領導工作，但常常是忠實的追隨者，因為他們享受眼前的樂趣，所以事情做完經常鬆懈而不願讓過度的緊迫和費事來破壞這種享受。',
    explainObject: '室內裝潢設計師、按摩師、客戶服務專員、服裝設計師、廚師、護士、牙醫、旅遊管理',
    loveType: '作詞人',
    explainLove: '你面對感情的態度是很成熟的。你不喜歡改變他人，也很懂得欣賞他人。同樣的，你希望保護自己對生活的理想。在感情中，你熱愛活在當下，而這也是你讓人感受到最有吸引力的地方。另外，你有敏銳的觀察力，也擅於理解身邊人的情緒。屬於你的戀愛關鍵字是自由、關懷。',
    explainFallLove: '你對於感情的成熟態度，讓你在分手場面時，會希望能避免一些衝突的、對情緒產生高負擔的可能。譬如你會想再努力嘗試，提議一起去找感情諮商，然而如果最終知道無效，你也會同意各走各的路。和平分手是你所追求的。但要注意的是，雖然你很懂得生活上的和諧，但這個特點卻容易在感情上失效。你很知道對方要的是什麼，但卻會願意讓他人指導自己的人生。你同意這次的分手，是為了對方，還是自己？也許，也讓你的體貼與成熟，為自己發揮一次。'
}, {
    originsType: 'INTJ',
    nameType: '專家型',
    thinkType: '內向+直覺+理性+判斷',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '具有創造性的思想並大力推動他們自己的主意和目標。目光遠大、對外部事件能迅速找到有意義的模式。在吸引他們的領域，他們有很好的能力去組織工作並將其進行到底。不輕信、具批判性、獨立性、有決心，對能力和行動有高的標準。',
    explainObject: '首席財政執行官、智慧財產權律師、設計工程師、精神分析師、心臟病專家、媒體策劃、網絡管理員、建築師',
    loveType: '原創者',
    explainLove: '你渴望尋找一個在性格與觀念都與你高度相符的對象，也就是說，你對於感情有著完美的要求。基本上你的個性非常獨立，因此如果對方沒有達到你的要求標準，你寧可獨自一人，也不願將時間浪費在錯誤的人身上。但一旦找到你要的人，你將是非常忠誠的伴侶。你的戀愛關鍵字是理性、獨立。',
    explainFallLove: '你的完美主義，讓你在面對分手時，也常常被自己卡住。你會努力地嘗試去尋找原因，直到你找到能說服自己的理由，你才會甘心然後繼續前進。期間你如果有發現什麼誤解，也會不害怕與前任坦承或討論。這有個好處，就是你很容易在每次失敗的戀情中吸取教訓，你的自省能力也很強。這背後是因為，你不喜歡失控的感覺，你希望可以為關係留下堅定的結論。然而要注意的是，你容易因為對完美主義的要求，而在投資一段關係後，就開始有理想化對方的傾向。有時候，讓自己偏離軌道一點點，別讓自己過度執著於任何事，你或許可以因此看到更多不同的可能，也比較能更快修復自我。'
}, {
    originsType: 'INTP',
    nameType: '學者型',
    thinkType: '內向+直覺+理性+理解',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '理性',
    thinkTypeCc: '分析，用邏輯客觀方式決策，堅信自己的觀點正確，不考慮他人意見。清晰、正義、不喜歡調和主義，批判和鑒別力、規則。工作中少表現出情感，也不喜歡他人感情用事。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '沈默寡言，特別喜歡理論上或科學方面的追求，喜愛用邏輯和分析解決問題。主要有興趣於出主意，不大喜歡聚會和閑聊天。傾向于有明確範圍的愛好，謀求他們的某些特別的愛好能得到運用和有用的那些職業。',
    explainObject: '軟體設計師、風險投資家、法律仲裁人、金融分析師、大學經濟學教師、音樂家、智慧財產權律師、網站設計師',
    loveType: '架構師',
    explainLove: '你天生有獨立自主的個性，可以和自己相處很長的時間。你雖然不太喜歡社交，但一旦遇到和你有相同興趣的人，你會非常愉快。因此，你不太會被超級外向者吸引。會讓你注目的人，通常是能夠將自己生活過得很精彩、並且可以做自己的對象。你知道跟他在一起，兩個人都可以過得既豐富又踏實。你的戀愛關鍵字是充實與深情。',
    explainFallLove: '你會在歷經分手後，經歷一段安靜沈默的癒合時光。你不需要與朋友或家人討論這件事。在這段獨處的時間內，你會努力思考這段情感開始變調的原因，並且找到其中能被解釋的理由。你希望自己不會再重複一樣的錯誤。然而，你同時間可能為了要讓自己更快走出傷痛，而選擇一種比較完美或簡潔的方式去解釋這一切。想給你的建議是，也許有些心碎是無法被分析的，試著讓自己只是接受那些情緒，雖然你會有點不自在，但也可能會有新的發現。'
}, {
    originsType: 'INFJ',
    nameType: '作家型',
    thinkType: '內向+直覺+情感+判斷',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '判斷',
    thinkTypeDd: '封閉定向、結構化和組織化、時間導向、決斷，事情都有正誤之分，喜歡命令、控制與反應迅速，喜歡完成任務、不善於適應。',
    explainType: '依靠堅毅不拔取得成功，富創造力，希望做需要做和想要做的事情。全力投入自己的工作、沈靜地堅強、責任心強、關心他人。因其堅定的原則而受尊重，由于他們在如何最好為公共利益服務等方面的明晰的洞察力，別人可能會尊重和追隨他們。',
    explainObject: '特殊教育教師、建築設計師、培訓經理培訓師、培訓師、職業策劃諮詢顧問、心理諮詢師、網站編輯、作家、仲裁人',
    loveType: '諮詢師',
    explainLove: '在感情裡，你會比較小心翼翼，不輕易付出，也有一點害怕受傷。你有安靜內斂、敏感而獨立的個性。對他人來說，你通常帶有一點神秘感。但同時間，你很關注他人的感受、能夠同理及傾聽，以及處理複雜的情感思緒。一但你決定投入一段關係，你就會盡力地讓它維持與長久。屬於你的戀愛關鍵字是內斂、傾聽。',
    explainFallLove: '分手後，你通常不會立刻想找朋友傾訴，那將讓你更加的混亂。你會先讓自己冷靜一段時間，在這段時期，你努力想讓安撫自我、弄清楚自己的感受，你會去想也許彼此間哪個地方是可以被修復的，也許結果就將不同；你會希望能想明白這一切為何發生，以及此刻自己正在什麼位置，還可以怎麼做。你是一個在感情中很投入的人，因此在失戀後，你會感覺到自己心裡對感情還有很多渴望，你必須去面對與處理它。有時你可能也會因此逃避，譬如明知道關係已經出現異樣，但你會不願意承認該分手的事實。想給你的建議是，想念前任是可以的，但也別忘記給自己一些能夠展開新生活的機會。你很懂得疼惜自己的感情，你將會因此而獲得更多的幸福。'
}, {
    originsType: 'INFP',
    nameType: '哲學家',
    thinkType: '內向+直覺+情感+理解',
    thinkTypeA: '內向',
    thinkTypeAa: '從時間中獲得能量，喜靜、多思、冥想、離開群體，容易與外界相互誤解。謹慎、不露表情、較為內向容易造成失去機會。獨立、負責、細緻、周到、不蠻幹，不怕長時間做事、勤奮但怕被打擾，講話前會先想然後講。',
    thinkTypeB: '直覺',
    thinkTypeBb: '通過第六感洞察世界、注重應該如何，比較籠統。喜學新技能、不重準確、喜抽象和理論，重可能性，討厭細節並好高騖遠，喜歡新問題。憑愛好做事，對事情的態度易變，提新見解、匆促結論',
    thinkTypeC: '情感',
    thinkTypeCc: '主觀和綜合，用個人化的、價值導向的方式決策、考慮決策對他人的影響。和諧、寬容、喜歡調解，不按照邏輯思考。容易考慮環境、喜歡工作場景中的情感，從讚美中得到享受，也希望他人的讚美。',
    thinkTypeD: '理解',
    thinkTypeDd: '開放定向、彈性與自發化、探索和開放結局。好奇，喜歡收集新信息而不是做結論。喜歡觀望與開始許多新的項目，但不完成，容易優柔寡斷、易分散注意',
    explainType: '沈穩的觀察者、理想主意、忠實、看重外在的生活和內在的價值的一致。有求知欲，能迅速發出各種可能性，常常起到促進實行一些主張的作用。只要某種價值觀不受到威脅，他們都善應變、靈活和接受。願意諒解別人和了解充分發揮人的潛力的方法，對財富和周圍的事物不太關心。',
    explainObject: '心理學家、人力資源管理、翻譯、大學人文學科教師、社會工作者、圖書管理員、服裝設計師、編輯設計師、網站設計師',
    loveType: '治療者',
    explainLove: '你是一個喜愛嘗試、對世界維持好奇心的人。因此，你熱愛和不同性格的人約會。你保持各種開放的可能性，也很能展現自己的社交魅力，也總是讓人感覺到自在、毫無壓力。而你等待著那個可以真正走入你內心的人。屬於你的戀愛關鍵字是隨和與溫柔。',
    explainFallLove: '你的內心是溫柔的，面對分手時，你會選擇承擔失敗裡大部分的責任，並且也會有懊悔情緒，自責自己當初應該可以做到更多等。你的同情心、感性，會讓你時常處於懷舊的狀態。你很珍惜自己擁有過的情感關係。然而，你也有可能因此對感情堅持著一種不可能被實踐的標準。想對你說，你其實是一個很願意包容不同可能的人，你總是將前任，以及你對他的情感小心收藏，而你已經做得很好了；當包容著過去，同時間，也別忘了提醒自己騰出空間去接納未來。'
}]

// 設定點擊內容所加入的文字
function choose() {
    obj.switchs = true
    if (obj.switchs !== true) return;
    obj.switchs = false
    if (this.dataset.choose == "A") {
        querySelector(".text-first").addClass('texts-trans')
        querySelector(".text-second").removeClass('texts-trans')
        isChooseA()
    } else {
        querySelector(".text-second").addClass('texts-trans')
        querySelector(".text-first").removeClass('texts-trans')
        isChooseB()
    }
}

function isChooseA() {
    if (obj.count >= 0 && obj.count <= 6) {
        obj.strTemp = "E"
    } else if (obj.count >= 7 && obj.count <= 13) {
        obj.strTemp = "N"
    } else if (obj.count >= 14 && obj.count <= 20) {
        obj.strTemp = "F"
    } else if (obj.count >= 21 && obj.count <= 27) {
        obj.strTemp = "J"
    }
}

function isChooseB() {
    if (obj.count >= 0 && obj.count <= 6) {
        obj.strTemp = "I"
    } else if (obj.count >= 7 && obj.count <= 13) {
        obj.strTemp = "S"
    } else if (obj.count >= 14 && obj.count <= 20) {
        obj.strTemp = "T"
    } else if (obj.count >= 21 && obj.count <= 27) {
        obj.strTemp = "P"
    }
}

function modalHide() {
    querySelector('.confirm').selected.classList.add('confirm-active')
    setTimeout(() => querySelector('.confirm').removeClass('confirm-active'), 540);
    setTimeout(() => {
        querySelector('.modalC').removeClass('modal-toggle')
        querySelector('.modal-bodyC').removeClass('modal-body-toggle')
        setTimeout(() => querySelector('.modalC').styles("display", ""), 750);
    }, 890)
    querySelector('.confirm').selected.removeEventListener('click', modalHide)
}
// 設定點擊下一題時的函式內容
function nextStep() {
    obj.count < 0 ? obj.switchs = false : null
    if (obj.switchs !== false) {
        let params = window.innerWidth <= 414 ? '350px' : '400px'
        querySelector('.modalC').styles("display", "block")
        querySelector('.modalC').styles("transition", "1s ease")
        querySelector(".modal-bodyC").styles("width", params)
        setTimeout(() => {
            querySelector('.modalC').addClass('modal-toggle')
            querySelector(".modal-bodyC").addClass('modal-body-toggle')
        }, 100)
        querySelector('.confirm').selected.addEventListener('click', modalHide)
        return
    } else if (querySelector(".Q-outer").selected.classList.length >= 3) {
        querySelector(".Q-outer").removeClass('Qadd-in')
        querySelector(".Q-outer").addClass('Qadd-out')
        setTimeout(() => {
            querySelector(".text-first").removeClass('texts-trans')
            querySelector(".text-second").removeClass('texts-trans')
        }, 900)
        obj.stopTimeSet = setTimeout(() => {
            querySelector(".Q-outer").removeClass('Qadd-out')
            querySelector(".Q-outer").addClass('Qadd-in')
        }, 1000)
    } else {
        setTimeout(() => querySelector(".Q-outer").addClass('Qadd-in'), 1000)
        querySelector(".Q-outer").removeClass('Qadd-out')
    }

    if (obj.count <= 0) {
        this.classList.add('next-trans')
        setTimeout(() => this.classList.remove('next-trans'), 490)
    } else {
        this.classList.add('next-trans-pos')
        this.classList.remove('next-trans')
        setTimeout(() => this.classList.remove('next-trans-pos'), 490)
    }

    if (obj.count == -1) {
        this.classList.add('next-trans')
        this.style.cssText = 'opacity: 0;'
        querySelector(".explain").removeClass('explain-show')
        window.removeEventListener('scroll', scrolls)
        scrollTop()
        setTimeout(() => {
            this.classList.remove('next-trans')
            this.style.cssText = 'opacity: 1;'
        }, 1000)
        setTimeout(() => querySelector(".explain").styles("display", "none"), 1001);
        setTimeout(() => querySelector(".Q-outer").styles("display", "block"), 1003);
    } else if (obj.count == -2) {
        obj.strTemp = ''
        this.classList.add('next-move-out')
        querySelector(".type-text-content").addClass('type-text-content-hide')
        window.addEventListener('scroll', scrolls)
        scrollTop()
        setTimeout(() => {
            querySelector(".explain").styles("display", "block")
            querySelector(".type-text-content").styles("display", "")
            querySelector(".type-text-content").text("")
            this.classList.add('next-small')
        }, 990);
        setTimeout(() => {
            querySelector(".explain").addClass('explain-show')
            querySelector(".type-text-content").removeClass('type-text-content-hide')
            querySelector(".type-text-content").removeClass('type-text-content-in')
            this.classList.remove('next-move-out')
            this.classList.remove('next-move')
        }, 1110);
        setTimeout(() => {
            this.classList.remove('next-small')
            querySelector(".next").text('開始')
            this.style.cssText = 'opacity: 1;'
        }, 1310);
    }
    obj.switchs = true
    obj.count++
        if (obj.count >= 1) obj.array.push(obj.strTemp)
    setTimeout(() => {
        obj.Qitems.forEach(key => {
            if (key.qNum == obj.count) {
                querySelector(".quest").text(key.qT)
                querySelector(".text-first").text(key.ansA)
                querySelector(".text-second").text(key.ansB)
            }
            if (key.qNum == 0 && obj.count == 0) {
                this.textContent = '下一題'
                this.classList.add('btn-start')
                querySelector(".text-first").removeClass('texts-hide')
                querySelector(".text-second").removeClass('texts-hide')
            } else if (key.qNum == 1 && obj.count == 1) {
                this.classList.add('next-active')
                querySelector(".prev").addClass('prev-active')
                querySelector(".prev").addClass('btn-start')
                querySelector(".prev").text('上一題')
            } else if (key.qNum == 27 && obj.count == 27) {
                this.textContent = '查詢結果'
            }
        })
        if (obj.count == 28) {
            obj.count = -2
            clearTimeout(obj.stopTimeSet)
            setTimeout(() => finalSum(), 500)

            this.classList.remove('next-active')
            this.classList.remove('btn-start')
            this.style.cssText = "opacity:0;"
            querySelector(".prev").removeClass('prev-active')
            querySelector(".prev").removeClass('btn-start')
            this.classList.add('next-trans-hide')
        }
    }, 900)
    setTimeout(() => {
        let getObj = textLength()
        querySelector(".quest").styles("text-align", getObj.quest)
        querySelector(".text-first").styles("text-align", getObj.chooseFt)
        querySelector(".text-second").styles("text-align", getObj.chooseSd)
    }, 910)
}

// 設定點擊上一題的函式內容
function backStep() {
    obj.count--
        if (obj.count == 0) {
            querySelector(".next").removeClass('next-active')
            querySelector(".prev").removeClass('prev-active')
        } else
    if (obj.count >= 0) {
        this.classList.add('prev-trans-pos')
        setTimeout(() => this.classList.remove('prev-trans-pos'), 490)
    }
    if (querySelector(".Q-outer").selected.classList.length >= 3) {
        querySelector(".Q-outer").addClass('Qremove-in')
        querySelector(".Q-outer").removeClass('Qadd-in')
        setTimeout(() => {
            querySelector(".text-first").removeClass('texts-trans')
            querySelector(".text-second").removeClass('texts-trans')
        }, 900)
        setTimeout(() => {
            querySelector(".Q-outer").removeClass('Qremove-in')
            querySelector(".Q-outer").addClass('Qadd-in')
        }, 1000)
    }
    obj.array.splice(obj.array.length - 1, 1)
    setTimeout(() => {
        obj.Qitems.forEach(key => {
            if (key.qNum == obj.count) {
                querySelector(".quest").text(key.qT)
                querySelector(".text-first").text(key.ansA)
                querySelector(".text-second").text(key.ansB)
            } else if (key.qNum == 27) {
                querySelector(".next").text('下一題')
            }


        })
    }, 900)
    setTimeout(() => {
        let getObj = textLength()
        querySelector(".quest").styles("text-align", getObj.quest)
        querySelector(".text-first").styles("text-align", getObj.chooseFt)
        querySelector(".text-second").styles("text-align", getObj.chooseSd)
    }, 910)
}

function textLength() {
    let lenghtObj = {}
    if (window.innerWidth <= 768) {
        lenghtObj.quest = querySelector(".quest").text().length > 16 ? 'justify' : 'center'
        lenghtObj.chooseFt = querySelector(".text-first").text().length > 17 ? 'justify' : 'center'
        lenghtObj.chooseSd = querySelector(".text-second").text().length.length > 17 ? 'justify' : 'center'
    } else {
        lenghtObj.quest = querySelector(".quest").text().length > 27 ? 'justify' : 'center'
        lenghtObj.chooseFt = querySelector(".text-first").text().length > 27 ? 'justify' : 'center'
        lenghtObj.chooseSd = querySelector(".text-second").text().length > 27 ? 'justify' : 'center'
    }
    return lenghtObj
}

// 設定統計字數函式
function finalSum() {
    let testText = ""
    let countAll = [{
        num: 0,
        type: "E",
        typeName: "外向",
        count: 0
    }, {
        num: 1,
        type: "I",
        typeName: "內向",
        count: 0
    }, {
        num: 2,
        type: "N",
        typeName: "直覺",
        count: 0
    }, {
        num: 3,
        type: "S",
        typeName: "感覺",
        count: 0
    }, {
        num: 4,
        type: "T",
        typeName: "理性",
        count: 0
    }, {
        num: 5,
        type: "F",
        typeName: "情感",
        count: 0
    }, {
        num: 6,
        type: "J",
        typeName: "判斷",
        count: 0
    }, {
        num: 7,
        type: "P",
        typeName: "理解",
        count: 0
    }]

    countAll.forEach((key, index) => {
        if (key.num == index) {
            let filterArray = obj.array.filter(keyF => keyF == key.type)
            key.count = filterArray.length
        }
    })
    setTimeout(() => {
        countAll.forEach((key, index) => {
            if (key.num == index) {
                if (key.count >= 4) testText += key.type
            }
        })
    }, 1000)
    setTimeout(() => typeDetails(countAll, testText), 1001)
}

function isType(text) {
    let typesText = ""
    const types = [{
        a: "E",
        aName: "外向",
        b: "I",
        bName: "內向"
    }, {
        a: "N",
        aName: "直覺",
        b: "S",
        bName: "感覺"
    }, {
        a: "T",
        aName: "理性",
        b: "F",
        bName: "情感"
    }, {
        a: "J",
        aName: "判斷",
        b: "P",
        bName: "理解"
    }]
    types.forEach(key => {
        if (text == key.a) {
            typesText = `${key.b} ( ${key.bName} )`
        } else if (text == key.b) {
            typesText = `${key.a} ( ${key.aName} )`
        }
    })
    return typesText
}

function transType(array) {
    let transText = ""
    array.forEach((key, index) => {
        transText += `
    <div class="col-md-6">
        <div class="percent">
        ${key.maxType} 
            <div class="progress-outer">
                <div class="progress-bar-custom">
                    <span>0 %<span>
                </div>
            </div>
        ${key.minType}
        </div>
    </div>`
        setTimeout(() => percentCount(key.percent, index), 5000)
    })
    return transText
}

function percentCount(num, index) {
    let countNum = 0
    let counter = setInterval(() => {
        if (countNum == num) {
            clearInterval(counter)
        } else {
            countNum++
            querySelectorAll(".progress-bar-custom")[index].style.width = `${countNum}%`
            querySelectorAll(".progress-bar-custom span")[index].textContent = `${countNum} %`
        }
    }, 16)
}

// 設定載入解析內容前與後
function typeDetails(countAll, testText) {
    querySelector(".Q-outer").styles("display", "")
    querySelector('.type-text-content').styles("display", "flex")
    let loadingCount = 0
    let filterArray = []
    let totalCount
    setTimeout(() => {
        setTimeout(() => {
            const loading = setInterval(() => {
                if (loadingCount >= 5) {
                    querySelector('.loading-font').text('計算完成')
                    clearInterval(loading)
                } else {
                    loadingCount++
                }
            }, 1000);
        }, 10)
        querySelector('.type-text-content').selected.innerHTML = `
            <div class="loading-outer">
                <div class="loading"></div>
                <span class="loading-font">計算中</span>
            </div>`
    }, 1000);

    setTimeout(() => {
        querySelector('.loading-outer').addClass('loading-outer-out')
    }, 8000);

    testText.split("").forEach(keyT => {
        countAll.forEach(key => {
            if (key.type == keyT) {
                totalCount = Math.floor((7 / key.count) * 100) / 100
                filterArray.push({
                    percent: Math.floor(100 / totalCount),
                    maxType: `${key.type} ( ${key.typeName} )`,
                    minType: isType(key.type)
                })
            }
        })
    })

    obj.typeItems.forEach(key => {
        key.originsType == testText ? setTimeout(() => {
            scrollTop()
            querySelector(".type-text-content").addClass('type-text-content-in')
            querySelector('.type-text-content').selected.innerHTML = `
                <div class="row">
                    <div class="col-md-12">
                        <span class="type-title">您的類型</span>
                        <span class="type-origins">${key.originsType}</span>
                        <span class="type-name">${key.nameType}</span>
                        <span class="type-think">( ${key.thinkType} )</span>
                        <div class="percent-outer">
                            <div class="row">
                                ${transType(filterArray)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="type-think-details-group">
                                    <span class="type-think-detailsA">${key.thinkTypeA}</span>
                                    <span class="type-think-detailsA">${key.thinkTypeAa}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="type-think-details-group">
                                    <span class="type-think-detailsB">${key.thinkTypeB}</span>
                                    <span class="type-think-detailsB">${key.thinkTypeBb}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="type-think-details-group">
                                    <span class="type-think-detailsC">${key.thinkTypeC}</span>
                                    <span class="type-think-detailsC">${key.thinkTypeCc}</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="type-think-details-group">
                                    <span class="type-think-detailsD">${key.thinkTypeD}</span>
                                    <span class="type-think-detailsD">${key.thinkTypeDd}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <ul class="type-content">
                            <li>性格總體描述</li>
                            <li>${key.explainType}</li>
                            <li>適合的職業類型</li>
                            <li>${key.explainObject}</li>
                        </ul>
                        <ul class="type-love">
                            <li>戀愛時</li>
                            <li>角色類型 - ${key.loveType}</li>
                            <li>${key.explainLove}</li>
                        </ul>
                        <ul class="type-fall-love">
                            <li>失戀時</li>
                            <li>${key.explainFallLove}</li>
                        </ul>
                    </div>
                </div>`
        }, 9500) : null
        setTimeout(() => {
            setTimeout(() => {
                querySelector(".prev").removeClass('next-trans-hide')
                querySelector(".next").addClass('next-move')
            }, 200);
            querySelector(".next").text('重新測驗')
        }, 26500);
    })
}

// 設定滾動到底部時顯示按鈕函式
function scrolls() {
    const nextOuter = querySelector('.next-outer').selected
    const windowTop = window.scrollY
    const windowBottom = window.innerHeight + windowTop
    const nextY = nextOuter.offsetTop + nextOuter.offsetHeight / 2
    nextY < windowBottom ? querySelector(".next").addClass('next-in') : querySelector(".prev").removeClass('next-in')
}

// 設定返回頂部函式
function scrollTop() {
    let scrollToTop
    cancelAnimationFrame(scrollToTop)
    scrollToTop = requestAnimationFrame(function animation() {
        let goTop = document.body.scrollTop || document.documentElement.scrollTop
        if (goTop > 0) {
            scrollTo(0, goTop - 8)
            scrollToTop = requestAnimationFrame(animation)
        } else {
            cancelAnimationFrame(scrollToTop)
        }
    });
}

// 設定畫面載入時函式
function loadIn() {
    const titleString = 'MBTI16種性格測驗'
    let strCountF = -1
    let strCountB = 0
    let strCountTemp = ""
    querySelector('.title').addClass('title-in')
    querySelector(".next").text('開始')
    const strIn = setInterval(() => {
        if (strCountF == 10 && strCountB == 11) {
            clearInterval(strIn)
            strCountTemp = ""
        } else {
            strCountTemp += `${titleString.slice(strCountF+=1,strCountB+=1)}`
            querySelector('.title').text(strCountTemp)
        }
    }, 300)
    querySelector(".explain").addClass('explain-show')
    window.innerWidth <= 414 ? querySelector('.type-font-group').selected.innerHTML = `
        <ul class="listA">
            <li>
                I . 心理能力的走向<br>
                你是「外向 E」( Extrovert )？
                <br>
                還是「內向 I」( Introvert )？
            </li>
            <li>
                II . 認識外在世界的方法
                <br>
                你是「感覺 S」( Sensing )？
                <br>
                還是「直覺 N」( Intuition )？
            </li>
            <li>
                III . 倚賴甚麼方式做決定
                <br>
                你是「理性 T」( Thinking )？
                <br>
                還是「情感 F」( Feeling )？
            </li>
            <li>
                IV . 生活方式和處事態度
                <br>
                你是「判斷 J」( Judging )？
                <br>
                還是「理解 P」( Perceiving )？
            </li>
        </ul>
        <ul class="listB mt-5">
            <li>
                請輕鬆作答便可
                <br>
                測驗結果可依個人官感參考
                <br>
                也可當成玩樂性質
            </li>
            <li>
                題目總共 28 題，請依直覺判斷喔~
                <br>
                感謝您的使用
            </li>
        </ul>` : null
}

loadIn()

// 監聽選項內按鈕
querySelectorAll(".texts").forEach(key => key.addEventListener('click', choose))

// 監聽上一題按鈕
querySelector(".prev").selected.addEventListener('click', backStep)

// 監聽下一題按鈕
querySelector(".next").selected.addEventListener('click', nextStep)

// 監聽畫面滾動時
window.addEventListener('scroll', scrolls)