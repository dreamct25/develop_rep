import { useState, useEffect, useRef } from 'react';
import { type ConverterOptions, Converter } from 'opencc-js';
import { Copy, Check, Trash2, Languages, Columns2, Rows2 } from 'lucide-react';

const App: FC = (): TSX => {

  const [{
    inputText,
    outputText,
    mode,
    isCopying,
    viewMod
  }, setInitState] = useState<{
    inputText: string
    outputText: string
    mode: keyof typeof modeConfig
    isCopying: boolean
    viewMod: boolean
  }>({
    inputText: '',
    outputText: '',
    mode: 's2t',
    isCopying: false,
    viewMod: false
  })

  const [translateAreaScroll, setTranslateAreaScroll] = useState<number>(0)
  const [translateAreaIsScrolling, setTranslateAreaIsScrolling] = useState<boolean>(false)

  const timer = useRef<number | undefined>(undefined)

  const modeConfig: {
    [key: string]: {
      label: string,
      display: { from: string, to: string },
      rule: ConverterOptions
    }
  } = {
    s2t: {
      label: '簡體中文 ➔ 香港繁體', 
      display: { from: '簡體中文', to: '香港繁體' },
      rule: { from: 'cn', to: 'hk' }
    },
    t2s: {
      label: '香港繁體 ➔ 簡體中文', 
      display: { from: '香港繁體', to: '簡體中文' },
      rule: { from: 'hk', to: 'cn' }
    },
    tw2t: {
      label: '正體中文 ➔ 香港繁體', 
      display: { from: '簡體中文', to: '香港繁體' },
      rule: { from: 'tw', to: 'hk' }
    },
    t2tw: {
      label: '香港繁體 ➔ 正體中文', 
      display: { from: '香港繁體', to: '正體中文' },
      rule: { from: 'hk', to: 'twp' }
    },
    s2twp: {
      label: '簡體中文 ➔ 正體中文', 
      display: { from: '簡體中文', to: '正體中文' },
      rule: { from: 'cn', to: 'twp' }
    },
    tw2s: {
      label: '正體中文 ➔ 簡體中文', 
      display: { from: '正體中文', to: '簡體中文' },
      rule: { from: 'tw', to: 'cn' }
    },
    jp2twp: {
      label: '日本新字體 ➔ 正體中文', 
      display: { from: '日本新字體', to: '正體中文' },
      rule: { from: 'jp', to: 'twp' }
    },
    tw2jp: {
      label: '正體中文 ➔ 日本新字體', 
      display: { from: '正體中文', to: '日本新字體' },
      rule: { from: 'tw', to: 'jp' }
    },
    jp2s: {
      label: '日本新字體 ➔ 簡體中文', 
      display: { from: '日本新字體', to: '簡體中文' },
      rule: { from: 'jp', to: 'cn' }
    },
    s2jp: {
      label: '簡體中文 ➔ 日本新字體', 
      display: { from: '簡體中文', to: '日本新字體' },
      rule: { from: 'cn', to: 'jp' }
    }
  }

  const useSleep:(time: number) => Promise<void> = time => 
    new Promise(resolve => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => resolve(), time)
    })

  const convertSelectMode:() => void = () => {

    if (!inputText) {
      setInitState(prevState => ({
        ...prevState,
        outputText: ''
      }));

      return;
    }
    
    try {
      const config = modeConfig[mode];
      const converter = Converter(config.rule);
      
      setInitState(prevState => ({
        ...prevState,
        outputText: converter(inputText)
      }))

    } catch (error) {
      console.error('轉換過程中發生錯誤:', error);
    }
  }

  const copyToClipboard:() => Promise<void> = async () => {
   
    try {
      // 優先使用 Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(outputText);
      } else {
        throw new Error('Clipboard API 不可用');
      }

      setInitState(prevState => ({
        ...prevState,
        isCopying: true
      }))

      await useSleep(2000)

      setInitState(prevState => ({
        ...prevState,
        isCopying: false
      }))

    } catch (err) {
      // 備用方案：使用 execCommand('copy')
      const textArea = document.createElement("textarea");
      textArea.value = outputText;
      textArea.readOnly = true
      document.body.appendChild(textArea);
      textArea.select();
      
      try {

        document.execCommand("copy");

        setInitState(prevState => ({
          ...prevState,
          isCopying: true
        }))

        await useSleep(2000)

        setInitState(prevState => ({
          ...prevState,
          isCopying: false
        }))

      } catch (copyErr) {
        console.error('無法複製文字:', copyErr);
      }

      document.body.removeChild(textArea);
    }
  };

  useEffect(() => {
   convertSelectMode()
  }, [inputText, mode]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-san flex flex-col items-center justify-center">
      <div className="max-w-[1280px] w-full">
        {/* 標題區塊 */}
        <header className="flex items-center justify-center mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg mr-4">
            <Languages className="text-white" size={25} />
          </div>
          <div>
            <h1 className="text-3xl max-sm:text-[18px] font-bold text-slate-800">簡易語系轉換工具</h1>
          </div>
        </header>

        {/* 控制列 */}
        <div className="sticky top-[5px] bg-white p-2 rounded-xl shadow-sm mb-6 flex items-center justify-between border border-slate-200">
          <div className="flex gap-2 overflow-x-auto rounded-lg hidden-scroll-bar"
            ref={element => {

              if(!element) return

              element!.onwheel = event => {

                event.preventDefault()

                const element = event.target as HTMLDivElement

                if(element.classList.length <= 5){
                  element.scrollLeft += event.deltaY
                } else {
                  element.parentElement!.scrollLeft += event.deltaY
                }
              }
            }}
          >
            {Object.entries(modeConfig).map(([keyName, value], index) => (
              <button
                key={index}
                onClick={setInitState.bind(undefined, prevState => ({ ...prevState, mode: keyName }))}
                className={[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap',
                  mode === keyName
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                ].join(' ')}
              >
                {value.label}
              </button>
            ))}
          </div>
          <button
            onClick={setInitState.bind(undefined, prevState => ({ ...prevState, viewMod: !viewMod }))}
            className="flex items-center gap-1 ml-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer max-md:hidden"
          >
            {viewMod ? <Rows2 size={16} /> : <Columns2 size={16} />}
            {viewMod ? '上下檢視' : '左右檢視'}
          </button>
        </div>

        {/* 編輯區域 */}
        <div className={`grid ${viewMod ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
          {/* 輸入端 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                原文 ({modeConfig[mode].display.from})
              </label>
              {inputText && (
                <button
                  onClick={setInitState.bind(undefined, prevState => ({ ...prevState, inputText: '' }))}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer bg-red-50 text-red-500 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  清空
                </button>
              )}
            </div>
            <div className='rounded-xl h-[400px] '>
              <textarea
                ref={element => {
                  if(!element) return
                  element.scrollTop = translateAreaScroll
                }}
                onScroll={event => {

                  if(!event.target) return

                  if(!translateAreaIsScrolling) {
                    setTranslateAreaIsScrolling(true)
                  }

                  setTranslateAreaScroll((event.target as HTMLTextAreaElement).scrollTop)
                }}
                onScrollEnd={setTranslateAreaIsScrolling.bind(undefined, false)}
                className="w-full h-full p-[13px_16px] rounded-xl shadow-inner bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-slate-800 scroll-bar-white"
                placeholder="請輸入或貼上欲轉換的文字..."
                value={inputText}
                onChange={({ target: { value: inputText } }) => setInitState(prevState => ({ ...prevState, inputText }))}
              />
            </div>
          </div>

          {/* 輸出端 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-semibold text-slate-700">
                譯文 ({modeConfig[mode].display.to})
              </label>
              {outputText && (
                <button
                  onClick={copyToClipboard}
                  className={[
                    'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer',
                    isCopying ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  ].join(' ')}
                >
                  {isCopying ? <Check size={14} /> : <Copy size={14} />}
                  {isCopying ? '已複製' : '複製'}
                </button>
              )}
            </div>
            <div className='rounded-xl overflow-hidden h-[400px] border border-slate-200'>
              <textarea
                ref={element => {
                  if(!element) return
                  element.scrollTop = translateAreaScroll
                }}
                onScroll={event => {

                  if(!event.target) return

                  if(translateAreaIsScrolling) {
                    return
                  }

                  setTranslateAreaScroll((event.target as HTMLTextAreaElement).scrollTop)
                }}
                onScrollEnd={setTranslateAreaIsScrolling.bind(undefined, false)}
                className="w-full h-full p-[13px_16px] bg-slate-100 shadow-inner text-slate-800 outline-none resize-none whitespace-pre-line scroll-bar-slate"
                placeholder="轉換後將顯示在此..."
                value={outputText}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* 頁尾資訊 */}
        <footer className="mt-8 text-center text-slate-400 text-xs">
          <p>支援：簡體中文、繁體（港/台標準）、日本新字體、大量文本轉譯</p>
          <p className="my-3">由 OpenCC-js 提供核心技術支援</p>
          <p className="mt-6">CopyRight &copy; 2025-02 Alex Chen .</p>
        </footer>
      </div>
    </div>
  );
};

export default App;