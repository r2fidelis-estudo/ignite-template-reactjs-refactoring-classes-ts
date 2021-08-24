import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes
} from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'
import { IconType } from 'react-icons'

interface Props {
  name: string
  type?:
    | 'text'
    | 'number'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'password'
    | 'time'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
  label?: string
  value?: string
  icon?: IconType
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

const Input = ({ name, icon: Icon, ...rest }: InputProps) => {
  const inputRef = useRef<any | null>(null)

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean | null>(false)

  const { fieldName, defaultValue, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  )
}

export default Input
