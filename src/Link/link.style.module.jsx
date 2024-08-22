import { styled, css } from 'styled-components';

const iconSize = () => css`
  width: 24px;
  height: 24px;
`;

const imageSize = () => css`
  width: 312px;
  height: 258px;
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

const leftPlacingRow = () => css`
  display: flex;
  justify-content: flex-end;
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

export const LinkIcon = styled.a`
  ${leftPlacingRow}
`

