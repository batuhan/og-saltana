import { chakra, HTMLChakraProps, useColorModeValue, useToken } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = (props: HTMLChakraProps<'svg'>) => {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 512 512"
      h="10"
      flexShrink={0}
      {...props}
    >
      <circle cx="256" cy="256" r="256" fill="#00223D"/>
      <path d="M411.177 206.62L110.55 100.757C101.975 97.7374 93 104.128 93 113.253V169.818C93 175.47 96.5733 180.5 101.896 182.339L402.523 286.216C411.085 289.174 420 282.787 420 273.695V219.116C420 213.492 416.462 208.481 411.177 206.62Z" fill="#01BDE2"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M302.323 279.967C302.323 270.875 293.408 264.487 284.846 267.445L101.896 330.661C96.5733 332.5 93 337.53 93 343.183V399.747C93 408.872 101.975 415.263 110.55 412.243L293.5 347.819C298.785 345.958 302.323 340.947 302.323 335.323V279.967Z" fill="#01BDE2"/>
    </chakra.svg>
  )
}
