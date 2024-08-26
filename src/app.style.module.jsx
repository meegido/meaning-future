import { styled, css } from 'styled-components';

const flexColumnWrapper = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const fullContainerPadding = () => css`
    padding: var(--container-padding);

    @media (min-width: 1440px) {
      padding: 64px var(--container-padding)
    }
`;

const leftRightContainerPadding = () => css`
  padding: 46px var(--container-padding) 0;
`;

export const Main = styled.div`
  ${flexColumnWrapper}
  ${fullContainerPadding}
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 1200px) {
    flex-direction: row;
    flex-grow: 1; 
    flex-wrap: wrap; 
    gap: 24px;
    gap: 54px;
  }

  @media(min-width: 1440px) {
    gap: 54px;
  }

  @media(min-width: 1520px) {
    gap: 72px;
  }
`;

export const Header = styled.header`
  ${flexColumnWrapper}
  ${leftRightContainerPadding}
  height: 90px;
`;