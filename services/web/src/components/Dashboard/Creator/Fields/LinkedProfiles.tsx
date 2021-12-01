import React from 'react'

const services = [
  {
    name: 'Twitter',
    icon: 'twitter',
    base: 'https://twitter.com/',
    supports: ['live', 'followers', 'verification'],
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/',
    supports: ['live', 'followers', 'verification'],
    description:
      'Instagram is a social networking website and social networking service that is owned by Instagram, Inc. and its affiliates.',
  },
  {
    name: 'Linkedin',
    icon: 'linkedin',
    supports: [],
    url: 'https://www.linkedin.com/',
    description:
      'Linkedin is a social networking website and social networking service that is owned by LinkedIn, Inc. and its affiliates.',
  },
  {
    name: 'TikTok',
    icon: 'tiktok',
    supports: ['live', 'followers', 'verification'],
    url: 'https://www.tiktok.com/',
    description:
      'TikTok is a social networking website and social networking service that is owned by TikTok, Inc. and its affiliates.',
  },
  {
    name: 'Github',
    icon: 'github',
    supports: ['followers', 'verification'],
    url: 'https://www.github.com/',
    description:
      'Github is a social networking website and social networking service that is owned by Github, Inc. and its affiliates.',
  },
  {
    name: 'Youtube',
    icon: 'youtube',
    supports: ['live', 'followers', 'verification'],
    url: 'https://www.youtube.com/',
    description:
      'Youtube is a social networking website and social networking service that is owned by Youtube, Inc. and its affiliates.',
  },
  {
    name: 'Medium',
    icon: 'medium',
    supports: ['verification'],
    url: 'https://www.medium.com/',
    description:
      'Medium is a social networking website and social networking service that is owned by Medium, Inc. and its affiliates.',
  },
  {
    name: 'Twitch',
    icon: 'twitch',
    supports: ['live', 'followers', 'verification'],
    url: 'https://www.twitch.tv/',
    description:
      'Twitch is a social networking website and social networking service that is owned by Twitch, Inc. and its affiliates.',
  },
]

export default function LinkedProfiles() {
  const serviceList = services.map((service) => {
    return (
      <li key={service.name}>
        <a href={service.url}>
          <img
            src={`/assets/img/services/${service.icon}.svg`}
            alt={service.name}
          />
          <span>{service.name}</span>
        </a>

        {service.supports.includes('live') && "live"}
      </li>
    )
  })


  return <>{serviceList}</>
}
