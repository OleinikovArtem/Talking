import Link from 'next/link'
import { Channel } from '@prisma/client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { LetterText, Volume2 } from 'lucide-react'

export const Channels = ({ channels }: { channels: Channel[] }) => {

  const { voice, text } = channels.reduce((acc, channel) => {
    if (channel.type === 'TEXT') return { ...acc, text: [...acc.text, channel] }
    if (channel.type === 'VOICE') return { ...acc, voice: [...acc.voice, channel] }
    return acc
  }, { text: [] as Channel[], voice: [] as Channel[] })

  return (
    <>
      <ScrollArea className="channels__list">
        <ul>
          <h2>Text channels:</h2>
          {text.map((channel) => (
            <li key={channel.id}>
              <Link href={`/channels/${channel.serverId}/${channel.id}`} className="channels__item">
                <LetterText className="mr-2"/>{channel.name}
              </Link>
            </li>
          ))}

          <hr className="divider p-2"/>

          <h2>Voice channels:</h2>

          {voice.map((channel) => (
            <li key={channel.id}>
              <Link href={`/channels/${channel.serverId}/${channel.id}`} className="channels__item">
                <Volume2 className="mr-2"/>{channel.name}
              </Link>
            </li>
          ))}

          {channels.length === 0 ? <li className="text-gray-400 p-2">No channels found</li> : null}

        </ul>
      </ScrollArea>
    </>
  )
}
