import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const MessageInput = () => {
  return (
    <>
      <Input className="flex-1 placeholder:text-slate-200" placeholder="Type a message"/>
      <Button variant="outline" className="bg-interit" size="sm">
        Send
      </Button>
    </>
  )
}
