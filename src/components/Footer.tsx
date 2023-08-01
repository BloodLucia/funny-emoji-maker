export const Footer: React.FC = () => {
  return (
    <footer className='py-8 op-80'>
      <p className='text-center text-sm text-neutral-400'>
        <span className='pr-1'>Assets are from</span>
        <a
          className='pr-1
          text-neutral-400 border-b border-neutral-400 border-dotted
          hover:text-violet-400'
          href='https://github.com/microsoft/fluentui-emoji'
          target='_blank'>
          Fluent Emoji
        </a>
        <span className='pr-1'>
          by Microsoft. Remixed and partially modified.
        </span>
      </p>
      <p className='mt-1 text-center text-sm text-neutral-400'>
        <span className='pr-1'>Made by</span>
        <a
          className='text-neutral-400 border-b border-neutral-400 border-dotted
          hover:text-violet-400'
          href='https://github.com/3lur'
          target='_blank'>
          3lur
        </a>
        <span className='px-1'>|</span>
        <a
          className='text-neutral-400 border-b border-neutral-400 border-dotted
          hover:text-violet-400'
          href='https://github.com/3lur/funny-emoji-maker'
          target='_blank'>
          Source Code
        </a>
      </p>
    </footer>
  )
}
