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

