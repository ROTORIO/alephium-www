import React, { FC } from 'react'
import styled from 'styled-components'

import TextSnippet from './TextSnippet'
import ArrowedLink, { ArrowedLinkProps } from './ArrowedLink'

interface CardTextTeaserProps {
  title: string
  subtitle?: string
  link: ArrowedLinkProps
  className?: string
}

let CardTextTeaser: FC<CardTextTeaserProps> = ({ title, subtitle, children, link, className }) => (
  <article className={className}>
    <TextSnippetStyled className="text-content" title={title} titleHierarchy="h3" subtitle={subtitle} smallSubtitle>
      {children}
    </TextSnippetStyled>
    <ArrowedLink to={link.to} newTab={link.newTab}>
      {link.text}
    </ArrowedLink>
  </article>
)

CardTextTeaser = styled(CardTextTeaser)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`

const TextSnippetStyled = styled(TextSnippet)`
  margin-bottom: var(--spacing-4);

  h3 {
    margin-bottom: ${(props) => (props.subtitle ? 'var(--spacing-2)' : 'var(--spacing-6)')};
  }

  div {
    color: var(--color-text-grey-light-3);
    margin-bottom: var(--spacing-3);
  }

  p {
    color: var(--color-text-grey-light-1);
  }
`

export default CardTextTeaser
