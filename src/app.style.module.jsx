import { styled, css } from 'styled-components';

const flexColumnWrapper = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const fullContainerPadding = () => css`
    padding: var(--container-padding);
`;

const leftRightContainerPadding = () => css`
  padding: 46px var(--container-padding) 0;
`;

export const Main = styled.div`
  ${flexColumnWrapper}
  ${fullContainerPadding}
`;

export const Header = styled.header`
  ${flexColumnWrapper}
  ${leftRightContainerPadding}
  height: 90px;

  h1 {
    line-height: 40px;
    margin: 0;
  }
`;