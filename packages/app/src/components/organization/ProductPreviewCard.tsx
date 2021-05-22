import React from 'react'
import {
  Box,
  chakra,
  Flex,
  Image,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  useCart
} from 'react-use-cart'

export default function App() {
  const {
    addItem
  } = useCart()

  const product = {
    id: 1,
    name: 'An awesome e-book',
    price: 300,
    quantity: 1,
  }
  return ( <
    Box mx = "2"
    shadow = "md"
    bg = {
      useColorModeValue('white', 'gray.800')
    } >
    <
    Image roundedTop = "lg"
    w = "full"
    h = {
      64
    }
    fit = "cover"
    src = "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    alt = "Article" /
    >

    <
    Box p = {
      6
    } >
    <
    Box >
    <
    Link display = "block"
    color = {
      useColorModeValue('gray.800', 'white')
    }
    fontWeight = "bold"
    fontSize = "2xl"
    mt = {
      2
    }
    _hover = {
      {
        color: 'gray.600',
        textDecor: 'underline'
      }
    } >
    {
      product.name
    } <
    /Link> <
    chakra.p mt = {
      2
    }
    fontSize = "sm"
    color = {
      useColorModeValue('gray.600', 'gray.400')
    } >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Molestie parturient et sem ipsum volutpat vel.Natoque sem et aliquam mauris egestas quam volutpat viverra.In pretium nec senectus erat.Et malesuada lobortis. <
    /chakra.p> <
    /Box>

    <
    Box mt = {
      4
    } >
    <
    Flex mt = {
      3
    }
    alignItems = "center"
    justifyContent = "space-between" >
    <
    chakra.h1 fontWeight = "bold"
    fontSize = "lg" >
    $ {
      product.price
    } <
    /chakra.h1> <
    chakra.button px = {
      2
    }
    py = {
      1
    }
    fontSize = "xs"
    fontWeight = "bold"
    rounded = "lg"
    textTransform = "uppercase"
    onClick = {
      () => addItem(product)
    }
    _hover = {
      {
        bg: 'gray.200',
      }
    }
    _focus = {
      {
        bg: 'gray.400',
      }
    } >
    GET NOW <
    /chakra.button> <
    /Flex> <
    /Box> <
    /Box> <
    /Box>
  )
}
