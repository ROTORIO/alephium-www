import React, { FC } from 'react'
import styled from 'styled-components'

import { deviceBreakPoints } from '../styles/global-style'

import HookImage from '../images/hook.svg'
import WalletImage from '../images/wallet.svg'
import MiningImage from '../images/mining.svg'

import PageSectionContainer from './PageSectionContainer'
import CardEngagement from './CardEngagement'
import Feed from './Feed'
import Column from './Column'
import Columns from './Columns'
import SectionTitle from './SectionTitle'

interface PageSectionIntroProps {
  className?: string
}

const IntroColumns = styled(Columns)`
  gap: var(--spacing-80);

  /* TODO: Extract breakpoint */
  @media (max-width: 1352px) {
    gap: var(--spacing-40);
  }

  /* TODO: Extract breakpoint */
  @media (max-width: 1096px) {
    gap: var(--spacing-20);
  }

  @media ${deviceBreakPoints.mobile} {
    flex-direction: column;
  }
`

const IntroColumnContent = styled.div`
  margin-top: var(--spacing-12);
`

let PageSectionIntro: FC<PageSectionIntroProps> = ({ className }) => (
  <section className={className}>
    <PageSectionContainer>
      <IntroColumns>
        <Column>
          <SectionTitle title="Start" subtitle="Engage with us." />
          <IntroColumnContent>
            <CardEngagement title="Start mining" link="Documentation" ImageComponent={MiningImage} imageWidth="160px">
              Get your node ready, and contribute to the network security. It doesn't take more that a few minutes to
              start getting rewarded in ALPH tokens.
            </CardEngagement>
            <CardEngagement title="Get the wallet" link="Download" ImageComponent={WalletImage}>
              Safe and super easy to use, start to store / send / receive your precious ALPH tokens right away.
            </CardEngagement>
            <CardEngagement title="Build on Alephium" link="Documentation" ImageComponent={HookImage}>
              The mainnet is not far away. You can already start leveraging the power of Alephium and start building
              your own tools and apps!
            </CardEngagement>
          </IntroColumnContent>
        </Column>
        <Column>
          <SectionTitle title="Start" subtitle="Engage with us." />
          <IntroColumnContent>
            <Feed />
          </IntroColumnContent>
        </Column>
      </IntroColumns>
    </PageSectionContainer>
  </section>
)

PageSectionIntro = styled(PageSectionIntro)`
  padding: var(--spacing-32) 0 var(--spacing-56);
`

export default PageSectionIntro
