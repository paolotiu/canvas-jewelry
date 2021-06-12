import styled from '@emotion/styled';

const StyledTag = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};

  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  background-color: ${({ theme }) => theme.colors.blackAlpha[100]};
  padding: 0.2em;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;
interface Props {
  label: string;
}

const Tag = ({ label }: Props) => {
  return <StyledTag>{label}</StyledTag>;
};

export default Tag;
