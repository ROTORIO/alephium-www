import { FC, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { deviceBreakPoints } from '../styles/global-style'
import { lightTheme } from '../styles/themes'

import PageSectionContainer from './PageSectionContainer'
import SectionTextHeader from './SectionTextHeader'
import Columns from './Columns'
import Column from './Column'
import SectionTextTeaser from './SectionTextTeaser'
import SubsectionTextHeader from './SubsectionTextHeader'
import NumbersInfo from './NumbersInfo'
import ModalBlockFlow from './ModalBlockFlow'
import ModalPoLW from './ModalPoLW'
import ModalSmartContract from './ModalSmartContract'
import ModalVms from './ModalVms'
import { ArrowedLinkProps } from './ArrowedLink'

import BlockflowImageSrc from '../images/blockflow.svg'
import PoLWImageSrc from '../images/polw-background.svg'
import SmartContractImageSrc from '../images/smart-contract.svg'
import VmsImageSrc from '../images/vms.svg'
import StackImage from '../images/svgs/stack.svg'
import LeafImage from '../images/svgs/leaf.svg'
import VmDotsImage from '../images/svgs/vm-dots.svg'

export interface PageSectionTechnologyContentType {
  title: string
  subtitle: string
  blockFlowSection: PageSectionTechnologySubsectionProps
  polwSection: PageSectionTechnologySubsectionProps
  smartContractSection: PageSectionTechnologySubsectionProps
  vmsSection: PageSectionTechnologySubsectionProps
  numbersSection: {
    title: string
    subtitle: string
    columns: {
      number: string
      description: string
    }[]
  }
}

interface PageSectionTechnologySubsectionProps {
  title: string
  description: string
  cardText: string
  links: ArrowedLinkProps[]
}

interface PageSectionTechnologyProps {
  className?: string
  content: PageSectionTechnologyContentType
}

let PageSectionTechnology: FC<PageSectionTechnologyProps> = ({ className, content }) => {
  const [isBlockFlowModalOpen, setIsBlockFlowModalOpen] = useState(false)
  const [isPoLWModalOpen, setIsPoLWModalOpen] = useState(false)
  const [isSmartContractModalOpen, setIsSmartContractModalOpen] = useState(false)
  const [isVmsModalOpen, setIsVmsModalOpen] = useState(false)

  const blockFlowSectionContent = content.blockFlowSection
  const smartContractSectionContent = content.smartContractSection
  const polwSectionContent = content.polwSection
  const vmsSectionContent = content.vmsSection
  const numbersSectionContent = content.numbersSection
  blockFlowSectionContent.links[0] = { ...blockFlowSectionContent.links[0], openModal: setIsBlockFlowModalOpen }
  polwSectionContent.links[0] = { ...polwSectionContent.links[0], openModal: setIsPoLWModalOpen }
  smartContractSectionContent.links[0] = {
    ...smartContractSectionContent.links[0],
    openModal: setIsSmartContractModalOpen
  }
  vmsSectionContent.links[0] = { ...vmsSectionContent.links[0], openModal: setIsVmsModalOpen }

  const columnsProps = {
    gap: '4.5rem'
  }

  return (
    <SectionContainer className={className}>
      <TopGradient />
      <SectionTextHeaderStyled title={content.title} subtitle={content.subtitle} centered bigSubtitle />
      <section>
        <PageSectionContainerStyled>
          <Columns {...columnsProps}>
            <CenteredColumn>
              <BlockflowImage src={BlockflowImageSrc} alt="Blockflow" />
            </CenteredColumn>
            <Column>
              <SectionTextTeaser {...blockFlowSectionContent} IconComponent={StackImage} />
            </Column>
          </Columns>
        </PageSectionContainerStyled>
      </section>
      <ProofOfLessWorkSubsection>
        <PolwBackgroundImage src={PoLWImageSrc} alt="Proof of Less Work" />
        <PageSectionContainer>
          <Columns {...columnsProps}>
            <Column>
              <SectionTextTeaser {...polwSectionContent} IconComponent={LeafImage} />
            </Column>
            <CenteredColumn></CenteredColumn>
          </Columns>
        </PageSectionContainer>
      </ProofOfLessWorkSubsection>
      <SmartContractSubsection>
        <PageSectionContainer>
          <Columns {...columnsProps}>
            <CenteredColumn>
              <SmartContractImage src={SmartContractImageSrc} alt="Smart contract" />
            </CenteredColumn>
            <Column>
              <SectionTextTeaser {...smartContractSectionContent} IconComponent={StackImage} />
            </Column>
          </Columns>
        </PageSectionContainer>
      </SmartContractSubsection>
      <VmsSubsection>
        <PageSectionContainer>
          <Columns {...columnsProps}>
            <CenteredColumn>
              <VmsImage src={VmsImageSrc} alt="VMs" />
            </CenteredColumn>
            <Column>
              <SectionTextTeaser {...vmsSectionContent} IconComponent={VmDotsImage} />
            </Column>
          </Columns>
        </PageSectionContainer>
      </VmsSubsection>
      <ThemeProvider theme={lightTheme}>
        <NumbersSection>
          <NumbersPageSectionContainer>
            <SubsectionTextHeaderStyled
              title={numbersSectionContent.title}
              subtitle={numbersSectionContent.subtitle}
              condensed
            />
            <Columns>
              {numbersSectionContent.columns.map((columnContent) => (
                <NumbersColumn key={columnContent.number}>
                  <NumbersInfo {...columnContent} />
                </NumbersColumn>
              ))}
            </Columns>
          </NumbersPageSectionContainer>
        </NumbersSection>
      </ThemeProvider>
      <ModalBlockFlow isOpen={isBlockFlowModalOpen} setIsOpen={setIsBlockFlowModalOpen} />
      <ModalPoLW isOpen={isPoLWModalOpen} setIsOpen={setIsPoLWModalOpen} />
      <ModalSmartContract isOpen={isSmartContractModalOpen} setIsOpen={setIsSmartContractModalOpen} />
      <ModalVms isOpen={isVmsModalOpen} setIsOpen={setIsVmsModalOpen} />
    </SectionContainer>
  )
}

const SectionContainer = styled.section`
  position: relative;
`

const NumbersPageSectionContainer = styled(PageSectionContainer)`
  max-width: var(--page-width-shrinked);
`

const NumbersColumn = styled(Column)`
  display: flex;
  align-items: center;

  > div {
    align-self: flex-start;
  }

  &:not(:first-child) {
    > div {
      padding-left: var(--spacing-9);

      @media ${deviceBreakPoints.mobile} {
        padding-left: 0;
        padding-top: var(--spacing-9);
      }
    }

    &:before {
      content: '';
      display: block;
      width: 2px;
      height: var(--spacing-9);
      background-color: ${({ theme }) => theme.separator};
      flex-shrink: 0;

      @media ${deviceBreakPoints.mobile} {
        display: none;
      }
    }
  }

  &:not(:last-child) {
    > div {
      padding-right: var(--spacing-9);

      @media ${deviceBreakPoints.mobile} {
        padding-right: 0;
      }
    }
  }
`

const TopGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3%;
  background: transparent;
  background: linear-gradient(180deg, rgba(123, 22, 255, 0.15) 0%, rgba(134, 59, 255, 0) 100%);
`

const SubsectionTextHeaderStyled = styled(SubsectionTextHeader)`
  margin-bottom: var(--spacing-10);
`

const BlockflowImage = styled.img`
  width: 100%;
  max-width: var(--width-368);
  height: 310px;

  @media ${deviceBreakPoints.mobile} {
    height: 250px;
  }
`

const SectionTextHeaderStyled = styled(SectionTextHeader)`
  margin-bottom: var(--spacing-20);

  @media ${deviceBreakPoints.mobile} {
    text-align: left;
    max-width: var(--page-width);
    margin: 0 auto var(--spacing-10);
    padding: 0 var(--spacing-4);
  }
`

const CenteredColumn = styled(Column)`
  display: flex;
  justify-content: center;
`

const PageSectionContainerStyled = styled(PageSectionContainer)`
  padding-bottom: var(--spacing-28);

  @media ${deviceBreakPoints.mobile} {
    padding-bottom: var(--spacing-10);
  }
`

const PolwBackgroundImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  top: var(--spacing-8);
  max-width: var(--width-584);
  height: auto;

  @media ${deviceBreakPoints.mobile} {
    filter: blur(3px);
  }
`

const SmartContractImage = styled.img`
  position: absolute;
  top: calc(-1 * var(--spacing-20));
  left: 0;
  max-width: var(--width-368);
  width: 100%;

  @media ${deviceBreakPoints.mobile} {
    height: 300px;
    position: relative;
    top: 0;
  }
`

const VmsImage = styled.img`
  max-width: var(--width-368);
  width: 100%;

  @media ${deviceBreakPoints.mobile} {
    height: 240px;
  }
`

const ProofOfLessWorkSubsection = styled.section`
  background-color: ${({ theme }) => theme.bgTertiary};
  padding: var(--spacing-35) 0 var(--spacing-28);
  position: relative;
  overflow: hidden;

  @media ${deviceBreakPoints.mobile} {
    padding: var(--spacing-10) 0 var(--spacing-5);
  }
`

const VmsSubsection = styled.section`
  background-color: ${({ theme }) => theme.bgTertiary};
  padding: var(--spacing-30) 0;
  position: relative;

  @media ${deviceBreakPoints.mobile} {
    padding: var(--spacing-10) 0 var(--spacing-12);
  }
`

const SmartContractSubsection = styled.section`
  background-color: ${({ theme }) => theme.bgSecondary};
  padding: var(--spacing-28) 0 var(--spacing-30);
  position: relative;

  @media ${deviceBreakPoints.mobile} {
    padding: var(--spacing-5) 0 var(--spacing-14);
  }
`

const NumbersSection = styled.section`
  background-color: ${({ theme }) => theme.bgTertiary};
  padding: var(--spacing-11) 0;
`

PageSectionTechnology = styled(PageSectionTechnology)`
  background-color: ${({ theme }) => theme.bgSecondary};
  padding-top: var(--spacing-16);
`

export default PageSectionTechnology
