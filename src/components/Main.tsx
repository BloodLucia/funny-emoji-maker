import { useEffect, useRef, useState } from 'react'
import { FaRedoAlt, FaCloudDownloadAlt } from 'react-icons/fa'
import { useMount, useUpdateEffect } from 'ahooks'
import { pathToImage, resolveImportGlobModule } from '../utils'

const tabs: EmojiSlice[] = ['head', 'eyes', 'eyebrows', 'mouth', 'detail']

export const Main: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<EmojiSlice>('head')
  const canvas = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<Record<EmojiSlice, string[]>>({
    head: [],
    eyes: [],
    eyebrows: [],
    mouth: [],
    detail: [],
  })
  const [selectedIndex, setSelectedIndex] = useState({
    head: 0,
    eyes: 0,
    eyebrows: 0,
    mouth: 0,
    detail: 0,
  })

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const getRandom = () => {
    const randomIndexes = {
      head: randomInt(0, images.head.length - 1),
      eyes: randomInt(0, images.eyes.length - 1),
      eyebrows: randomInt(0, images.eyebrows.length - 1),
      mouth: randomInt(0, images.mouth.length - 1),
      detail: randomInt(0, images.detail.length - 1),
    }
    setSelectedIndex(randomIndexes)
  }

  const selectedImage = () => {
    return {
      head: images.head[selectedIndex.head],
      eyes: images.eyes[selectedIndex.eyes],
      eyebrows: images.eyebrows[selectedIndex.eyebrows],
      mouth: images.mouth[selectedIndex.mouth],
      detail: images.detail[selectedIndex.detail],
    }
  }

  const loadImage = async () => {
    // head
    const headModules = import.meta.glob<SvgImageModule>('..//assets/svgs/head/*.svg')
    const fullHeadImages = await resolveImportGlobModule(headModules)
    // eyes
    const eyesModules = import.meta.glob<SvgImageModule>('../assets/svgs/eyes/*.svg')
    const fullEyesImages = await resolveImportGlobModule(eyesModules)
    // eyebrows
    const eyebrowsModules = import.meta.glob<SvgImageModule>('../assets/svgs/eyebrows/*.svg')
    const fullEyebrowsImages = await resolveImportGlobModule(eyebrowsModules)
    // mouth
    const mouthModules = import.meta.glob<SvgImageModule>('../assets/svgs/mouth/*.svg')
    const fullMouthImages = await resolveImportGlobModule(mouthModules)
    // detail
    const detailModules = import.meta.glob<SvgImageModule>('../assets/svgs/details/*.svg')
    const fullDetailImages = await resolveImportGlobModule(detailModules)

    setImages({
      head: fullHeadImages,
      eyes: fullEyesImages,
      eyebrows: fullEyebrowsImages,
      mouth: fullMouthImages,
      detail: fullDetailImages,
    })
  }

  const handleSelectItem = ({ tab, index }: { tab: string; index: number }) => {
    setSelectedIndex({ ...selectedIndex, [tab]: index })
  }

  useEffect(() => {
    const headPath = selectedImage().head
    const eyesPath = selectedImage().eyes
    const eyebrowsPath = selectedImage().eyebrows
    const mouthPath = selectedImage().mouth
    const detailPath = selectedImage().detail
    Promise.all([
      pathToImage(headPath),
      pathToImage(eyesPath),
      pathToImage(eyebrowsPath),
      pathToImage(mouthPath),
      pathToImage(detailPath),
    ]).then((imgs) => {
      const ctx = canvas.current?.getContext('2d')
      if (!canvas.current) return
      ctx?.clearRect(0, 0, canvas.current.width, canvas.current?.height)
      imgs.forEach((img) => {
        img && ctx!.drawImage(img, 0, 0, 640, 640)
      })
      canvas.current.classList.add('animation')
      setTimeout(() => {
        canvas.current?.classList.remove('animation')
      }, 500)
    })
  }, [selectedIndex])

  const exportImage: BlobCallback = (blob) => {
    const url = URL.createObjectURL(blob as Blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emoji_${Date.now()}`
    a.click()
  }

  useMount(() => {
    loadImage()
  })

  useUpdateEffect(() => {
    getRandom()
  }, [images])

  return (
    <main className='flex flex-col items-center justify-center gap-4 max-w-[65ch] px-6 py-12 mx-auto bg-white rounded-lg bg-op-80 shadow-2xl shadow-black/10 dark:bg-dark md:px-24'>
      <div className='flex items-center justify-center w[200px] h[200px] b-2 b-neutral-400 b-solid b-op-20 rd-xl'>
        <canvas
          width='640'
          height='640'
          ref={canvas}
          className='w[160px] h[160px] animation'
        />
      </div>

      <div className='flex h-12 gap-2'>
        <div
          className='flex items-center justify-center w-12 rd-full bg-neutral-100 dark:bg-neutral-600 text-black dark:text-white cursor-pointer transition-colors hover:bg-violet-200 dark:hover:bg-violet-400'
          onClick={getRandom}>
          <FaRedoAlt className='text-xl' />
        </div>
        <div
          className='flex items-center justify-center rd-full px-3 gap-2 bg-neutral-100 dark:bg-neutral-600 text-black dark:text-white cursor-pointer transition-colors hover:bg-violet-200 dark:hover:bg-violet-400'
          onClick={() => canvas.current!!.toBlob(exportImage)}>
          <FaCloudDownloadAlt className='text-2xl' />
          <span className='font-bold'>Export PNG</span>
        </div>
      </div>

      <div className='w-full mt-4'>
        <header className='flex flex-wrap items-center justify-center gap-3 p-4 border-b border-neutral-400 b-op-20 b-solid'>
          {tabs.map((item, index) => {
            return (
              <div
                className={`${selectedTab === item
                  ? 'bg-violet-200 dark:bg-violet-200'
                  : 'bg-neutral-100 dark:bg-neutral-600'
                  } flex items-center justify-center h-16 w-16 rd-lg cursor-pointer transition-colors hover:bg-violet-200 dark:hover:bg-violet-200`}
                key={item}
                onClick={() => setSelectedTab(item)}>
                <img
                  src={selectedImage()[item]}
                  alt={selectedTab + index}
                  className='w-12 h-12'
                />
              </div>
            )
          })}
        </header>

        <section className='p-4'>
          <div className='flex flex-wrap gap-2 justify-center'>
            {images[selectedTab].map((item, index) => {
              return (
                <div
                  className={`${index === selectedIndex[selectedTab]
                    ? 'bg-violet-100 box-border b-2 b-solid b-violet-400'
                    : 'bg-neutral-100 dark:bg-neutral-600 b-transparent'
                    } flex items-center justify-center h-14 w-14 rd-md cursor-pointer transition-colors hover:bg-violet-200 dark:hover:bg-violet-200`}
                  key={item}
                  onClick={() => handleSelectItem({ tab: selectedTab, index })}>
                  <img
                    src={item}
                    alt={selectedTab + index}
                    className='w-10 h-10'
                  />
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
