export const Avatar = ({ src, alt, className }: { src?: string; alt?: string; className?: string }) => (
  <img
    src={src || '/default-avatar.png'}
    alt={alt}
    className={cn('rounded-full object-cover', className)}
    width={32}
    height={32}
  />
)
