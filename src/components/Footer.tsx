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
    </footer>
  )
}
