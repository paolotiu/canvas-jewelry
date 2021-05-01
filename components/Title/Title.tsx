import styled from '@emotion/styled';

export const Title = styled.h2`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.headerText};
  text-transform: uppercase;
  position: relative;
  padding: 0.8rem;
  text-align: center;
  ::after {
    display: block;
    position: absolute;
    width: 50px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.mainText};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    content: '';
  }
`;
