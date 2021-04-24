import styled from '@emotion/styled';

const StyledTextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 0.5em;
`;

const TextArea = (props: React.ComponentProps<typeof StyledTextArea>) => (
  <StyledTextArea rows={10} {...props} />
);

export default TextArea;
