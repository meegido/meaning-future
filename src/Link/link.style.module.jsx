import { styled, css } from 'styled-components';

const iconSize = () => css`
  width: 24px;
  height: 24px;
`;

const columnCenter = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const wrapperPadding = () => css`
  padding: 16px 0 24px;
`;

const noPadding = () => css`
  padding: 0;
`;

export const Article = styled.article`
  display: flex;
  width: 508px;

  @media(min-width: 1440px) {
    width: 612px;
  }

  @media(min-width: 1520px) {
    width: 700px;
  }
`;

export const Icon = styled.img`
  ${iconSize}
`;

export const Image = styled.img`
  display: none;
`

export const Container = styled.div`
  ${columnCenter}
  ${wrapperPadding}
  gap: 16px;
  flex-wrap: nowrap;
`;

export const Title = styled.div`
  ${columnCenter}
  gap: 8px;
`;

export const Description = styled.div`
  ${columnCenter}
  ${noPadding}
  gap: 12px;
`;

