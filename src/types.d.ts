type EmojiSlice = 'head' | 'eyes' | 'eyebrows' | 'mouth' | 'detail'
type SvgImageModule = typeof import('*.svg')
type ImportModuleFunction = () => Promise<SvgImageModule>