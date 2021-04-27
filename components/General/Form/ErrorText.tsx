import styled from '@emotion/styled';

const StyledErrorText = styled.span`
  padding: 0.3rem 0;
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  max-width: 40ch;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface Props {
  text?: string | null;
  willShow?: boolean;
}

const ErrorText = ({ text, willShow = true }: Props) => (
  <StyledErrorText style={{ display: !text || !willShow ? 'none' : 'block' }}>
    {text}
  </StyledErrorText>
);

export default ErrorText;
