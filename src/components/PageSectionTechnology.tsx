import { ComponentProps, FC, useState } from 'react'
import styled from 'styled-components'

import { deviceBreakPoints } from '../styles/global-style'

import PageSectionContainer from './PageSectionContainer'
import SectionTextHeader from './SectionTextHeader'
import Columns from './Columns/Columns'
import Column from './Columns/Column'
import SectionTextTeaser from './SectionTextTeaser'
import ModalBlockFlow from './ModalBlockFlow'
import ModalPoLW from './ModalPoLW'
import ModalSmartContract from './ModalSmartContract'
import ModalVms from './ModalVms'
import { ArrowedLinkProps } from './ArrowedLink'

import BGGradientSrc from '../images/top-gradient.png'
import BlockflowFrontImageSrc from '../images/blockflow-front.svg'
import BlockflowBackImageSrc from '../images/blockflow-back.svg'
import PoLWFrontImageSrc from '../images/polw-front.svg'
import PoLWBackImageSrc from '../images/polw-back.svg'
import SmartContractImageSrc from '../images/smart-contract.svg'
import VmsImageSrc from '../images/vms.svg'
import StackImage from '../images/svgs/stack.svg'
import LeafImage from '../images/svgs/leaf.svg'
import VmDotsImage from '../images/svgs/vm-dots.svg'
import IllustrationColumn from './Columns/IllustrationColumn'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { useRefScrollProgress } from '../hooks/useRefScrollProfress'
import ParallaxWrapper from './ParallaxWrapper'

export interface PageSectionTechnologyContentType {
  title: string
  subtitle: string
  blockFlowSection: PageSectionTechnologySubsectionProps
  polwSection: PageSectionTechnologySubsectionProps
  smartContractSection: PageSectionTechnologySubsectionProps
  vmsSection: PageSectionTechnologySubsectionProps
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
  minimal?: boolean
}

let PageSectionTechnology: FC<PageSectionTechnologyProps> = ({ className, content, minimal }) => {
  const [isBlockFlowModalOpen, setIsBlockFlowModalOpen] = useState(false)
  const [isPoLWModalOpen, setIsPoLWModalOpen] = useState(false)
  const [isSmartContractModalOpen, setIsSmartContractModalOpen] = useState(false)
  const [isVmsModalOpen, setIsVmsModalOpen] = useState(false)

  const blockFlowSectionContent = content.blockFlowSection
  const smartContractSectionContent = content.smartContractSection
  const polwSectionContent = content.polwSection
  const vmsSectionContent = content.vmsSection

  const { scrollYProgress } = useViewportScroll()

  const [gradientRef, start, end] = useRefScrollProgress()

  const gradientXScale = useTransform(scrollYProgress, [start + start * 0.5, end - end * 0.3], [0, 1.2])
  const gradientYScale = useTransform(scrollYProgress, [start + start * 0.5, end - end * 0.1], [0, 4])

  if (!minimal) {
    blockFlowSectionContent.links[0] = { ...blockFlowSectionContent.links[0], openModal: setIsBlockFlowModalOpen }
    polwSectionContent.links[0] = { ...polwSectionContent.links[0], openModal: setIsPoLWModalOpen }
    smartContractSectionContent.links[0] = {
      ...smartContractSectionContent.links[0],
      openModal: setIsSmartContractModalOpen
    }
    vmsSectionContent.links[0] = { ...vmsSectionContent.links[0], openModal: setIsVmsModalOpen }
  }

  const columnsProps: Omit<ComponentProps<typeof Columns>, 'children'> = {
    gap: '4.5rem',
    animateEntry: true
  }

  return (
    <SectionContainer className={className} ref={gradientRef}>
      <TopGradient style={{ scaleX: gradientXScale, scaleY: gradientYScale, transformOrigin: 'top' }} />
      <SectionTextHeaderStyled title={content.title} subtitle={content.subtitle} centered bigSubtitle sticky />
      <TechSection>
        <PageSectionContainer>
          <Columns {...columnsProps}>
            <IllustrationColumn>
              <ParallaxImage src={BlockflowBackImageSrc} speed={5} />
              <ParallaxImage src={BlockflowFrontImageSrc} speed={3} />
            </IllustrationColumn>
            <Column vertialCenter>
              <SectionTextTeaser
                {...blockFlowSectionContent}
                IconComponent={StackImage}
                trackingName="technology-section:blockflow"
                link={!minimal}
                tipbox={!minimal}
              />
            </Column>
          </Columns>
        </PageSectionContainer>
      </TechSection>
      <TechSection>
        <PageSectionContainer>
          <Columns {...columnsProps} reverse>
            <Column vertialCenter>
              <SectionTextTeaser
                {...polwSectionContent}
                IconComponent={LeafImage}
                trackingName="technology-section:polw"
                link={!minimal}
                tipbox={!minimal}
              />
            </Column>
            <IllustrationColumn>
              <ParallaxImage src={PoLWBackImageSrc} speed={0} />
              <ParallaxImage
                src={PoLWFrontImageSrc}
                speed={5}
                shouldZoom
                targetedScale={2}
                shouldChangeOpacity
                targetedOpacity={-0.2}
              />
              <ParallaxImage
                src={PoLWFrontImageSrc}
                speed={-5}
                shouldZoom
                targetedScale={2}
                shouldChangeOpacity
                targetedOpacity={-0.2}
              />
            </IllustrationColumn>
          </Columns>
        </PageSectionContainer>
      </TechSection>
      <TechSection>
        <PageSectionContainer>
          <Columns {...columnsProps}>
            <IllustrationColumn>
              <SmartContractImage src={SmartContractImageSrc} alt="Smart contract" />
            </IllustrationColumn>
            <Column vertialCenter>
              <SectionTextTeaser
                {...smartContractSectionContent}
                IconComponent={StackImage}
                trackingName="technology-section:smart-contract"
                link={!minimal}
                tipbox={!minimal}
              />
            </Column>
          </Columns>
        </PageSectionContainer>
      </TechSection>
      <TechSection>
        <PageSectionContainer>
          <Columns {...columnsProps} reverse>
            <Column vertialCenter>
              <SectionTextTeaser
                {...vmsSectionContent}
                IconComponent={VmDotsImage}
                trackingName="technology-section:vm"
                link={!minimal}
                tipbox={!minimal}
              />
            </Column>
            <IllustrationColumn>
              <VmsImage src={VmsImageSrc} alt="VMs" />
            </IllustrationColumn>
          </Columns>
        </PageSectionContainer>
      </TechSection>
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

const TopGradient = styled(motion.div)`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 200px;
  background-image: url(${BGGradientSrc});
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: top;
  z-index: 3000;
  pointer-events: none;
  opacity: 0.6;
`

const ParallaxImage = styled(ParallaxWrapper)<{ src: string }>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media ${deviceBreakPoints.mobile} {
    width: 50%;
  }
`

const SectionTextHeaderStyled = styled(SectionTextHeader)`
  margin-bottom: var(--spacing-20);
  overflow-x: hidden;

  @media ${deviceBreakPoints.mobile} {
    max-width: var(--page-width);
    margin: 0 auto var(--spacing-10);
    padding: 0 var(--spacing-4);
  }
`

const PolwImage = styled.img`
  width: 70%;

  @media ${deviceBreakPoints.mobile} {
    width: 50%;
  }
`

const SmartContractImage = styled.img`
  width: 70%;

  @media ${deviceBreakPoints.mobile} {
    width: 50%;
  }
`

const VmsImage = styled.img`
  width: 70%;

  @media ${deviceBreakPoints.mobile} {
    width: 50%;
  }
`

const TechSection = styled.div`
  background-color: ${({ theme }) => theme.bgSecondary};
  padding: var(--spacing-8) 0;
  position: relative;
  overflow: hidden;

  @media ${deviceBreakPoints.mobile} {
    padding: var(--spacing-5) 0 var(--spacing-14);
  }
`

PageSectionTechnology = styled(PageSectionTechnology)`
  background-color: ${({ theme }) => theme.bgSecondary};
  padding-top: var(--spacing-16);
`

export default PageSectionTechnology
